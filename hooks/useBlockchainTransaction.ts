import { SnackbarKey } from "notistack";
import { useAccount, useChainId, useDisconnect } from "wagmi";

import { ReactElement, useCallback } from "react";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import { useSnackbar } from "@hooks/useSnackbar";

const NOTIFY_CONTRACT_ERROR_TIMEOUT = 30000;
const NOTIFY_TX_STUCK_TIMEOUT = 40000;

const REQUIRED_NETWORK: any = {
  10: "Please connect to optimism mainnet",
};

type ExecuteTxParams<TC, TP> = {
  contractMethod: TC | undefined;
  params: TP;
  onSuccessMessage: string | ReactElement;
  onErrorMessage: string | ReactElement;
  stateKey?: string;
};

export default function useBlockchainTransaction() {
  const { set, reset, isLoading } = useBlockchainTransactionStore();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const notifyContractError = useCallback(() => {
    enqueueSnackbar(
      "There seems to be a network issue. Please try reloading the page or disconnecting and reconnecting your wallet.",
      { variant: "error" },
    );
    reset();
  }, []);

  const notifyTxStuckError = useCallback((snackbar: SnackbarKey) => {
    closeSnackbar(snackbar);
    enqueueSnackbar(
      "Your transaction has been successfully submitted, however, its inclusion in a block is taking a bit longer than usual. For further details, please check your wallet.",
      {
        variant: "warning",
      },
    );
    reset();
  }, []);

  async function executeTx<TC = never, TP = never, TIC extends TC = TC, TIP extends TP = TP>({
    contractMethod,
    params,
    onSuccessMessage,
    onErrorMessage,
    stateKey,
  }: ExecuteTxParams<TIC, TIP>): Promise<boolean> {
    if (!address || !contractMethod || typeof contractMethod !== "function") {
      enqueueSnackbar("Please connect your wallet", { variant: "error" });
      return false;
    }
    set(true, false, stateKey);
    let txAlert: any;
    let timeoutTx: any;
    let timeoutTxStuck: any;
    try {
      timeoutTx = setTimeout(notifyContractError, NOTIFY_CONTRACT_ERROR_TIMEOUT);
      const tx = await contractMethod.apply(null, params);
      clearTimeout(timeoutTx);
      txAlert = enqueueSnackbar("Transaction submitted, please wait.", {
        variant: "info",
        autoHideDuration: NOTIFY_TX_STUCK_TIMEOUT,
      });
      timeoutTxStuck = setTimeout(() => notifyTxStuckError(txAlert), NOTIFY_TX_STUCK_TIMEOUT);
      set(true, true);
      await tx?.wait();
      clearTimeout(timeoutTxStuck);
      set(true, false);
      closeSnackbar(txAlert);
      enqueueSnackbar(onSuccessMessage, { variant: "success" });
      reset();
      return true;
    } catch (err: any) {
      // @ts-ignore
      const networkError = REQUIRED_NETWORK[err?.network?.chainId];
      if (timeoutTx) clearTimeout(timeoutTx);
      if (timeoutTxStuck) clearTimeout(timeoutTxStuck);
      closeSnackbar(txAlert);

      if (networkError) {
        enqueueSnackbar(`You're connected to the wrong network. ${networkError}`, {
          variant: "error",
          onClose: () => {
            if (networkError) {
              disconnect();
            }
          },
        });
      } else {
        enqueueSnackbar(`${onErrorMessage}. ${err.reason || err.message}`, {
          variant: "error",
        });
      }
      console.error(err);
      reset();
      return false;
    }
  }

  return {
    set,
    reset,
    isLoading,
    executeTx,
  };
}
