import { ResolutionManager } from "@contracts/typechain";

import { useContext } from "react";

import { ContractsContext } from "../contexts/ContractsContext";
import useBlockhainTransaction from "./useBlockchainTransaction";

type SubmitParams = {
  resolutionId: string;
};

export default function useExecute() {
  const { resolutionManagerContract } = useContext(ContractsContext);
  const { executeTx, isLoading } = useBlockhainTransaction();

  return {
    onSubmit: async ({ resolutionId }: SubmitParams) => {
      return executeTx<ResolutionManager["executeResolution"], Parameters<ResolutionManager["executeResolution"]>>({
        contractMethod: resolutionManagerContract?.executeResolution,
        params: [resolutionId],
        onSuccessMessage: `Resolution ${resolutionId} correctly executed`,
        onErrorMessage: `Error executing resolution ${resolutionId}`,
      });
    },
    isLoading,
  };
}
