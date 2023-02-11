import { useSnackbar } from "notistack";
import { useAccount } from "wagmi";

import { addToIpfs } from "@lib/ipfs";

import useBlockchainTransactionStore from "@store/blockchainTransactionStore";

import { useContractsContext } from "../contexts/ContractsContext";
import { ResolutionFormBase } from "../store/resolutionFormStore";

type SubmitParams = {
  vetoTypeId: string | null;
  currentResolution: ResolutionFormBase;
  executionTo?: string[];
  executionData?: string[];
};

export default function useResolutionCreate() {
  const { address } = useAccount();
  const { set: setBlockchainTransactionState, reset } = useBlockchainTransactionStore();
  const { resolutionContract } = useContractsContext();
  const { enqueueSnackbar } = useSnackbar();

  if (!address) {
    enqueueSnackbar("Please connect your wallet", { variant: "error" });
    return {
      onSubmit: () => {},
    };
  }

  return {
    onSubmit: async ({ vetoTypeId, currentResolution, executionTo = [], executionData = [] }: SubmitParams) => {
      setBlockchainTransactionState(true, false);

      try {
        const ipfsId = await addToIpfs(currentResolution);
        const resolutionTypeId = Number(vetoTypeId || currentResolution.typeId);
        const tx = await resolutionContract?.createResolution(
          ipfsId,
          resolutionTypeId,
          !!vetoTypeId,
          executionTo,
          executionData,
        );
        setBlockchainTransactionState(true, true);
        enqueueSnackbar("Transaction is being executed, hold tight", { variant: "info" });
        await tx?.wait();
        setBlockchainTransactionState(true, false);
        enqueueSnackbar("Pre draft resolution correctly created", { variant: "success" });
        reset();
        return true;
      } catch (err) {
        enqueueSnackbar("Error creating pre draft resolution", { variant: "error" });
        console.error(err);
        reset();
        return false;
      }
    },
  };
}
