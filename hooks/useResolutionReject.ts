import { useSnackbar } from "notistack";
import { useAccount } from "wagmi";

import { useContext } from "react";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import { ContractsContext } from "../contexts/ContractsContext";

type SubmitParams = {
  resolutionId: string;
};

export default function useResolutionReject() {
  const { address } = useAccount();
  const { set: setBlockchainTransactionState, reset } = useBlockchainTransactionStore();
  const { resolutionContract } = useContext(ContractsContext);
  const { enqueueSnackbar } = useSnackbar();

  if (!address) {
    enqueueSnackbar("Please connect your wallet", { variant: "error" });
    return {
      onSubmit: () => {},
    };
  }

  return {
    onSubmit: async ({ resolutionId }: SubmitParams) => {
      setBlockchainTransactionState(true, false);

      try {
        const tx = await resolutionContract?.rejectResolution(resolutionId);
        setBlockchainTransactionState(true, true);
        enqueueSnackbar("Transaction is being executed, hold tight", { variant: "info" });
        await tx?.wait();
        setBlockchainTransactionState(true, false);
        enqueueSnackbar("Pre draft resolution correctly rejected", { variant: "success" });
        reset();
        return true;
      } catch (err) {
        enqueueSnackbar("Error rejecting pre draft resolution", { variant: "error" });
        console.error(err);
        reset();
        return false;
      }
    },
  };
}
