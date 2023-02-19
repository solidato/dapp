import { useContext } from "react";

import { ContractsContext } from "../contexts/ContractsContext";
import useBlockhainTransaction from "./useBlockchainTransaction";

type SubmitParams = {
  votedYes: boolean;
  resolutionId: string;
};

export default function useResolutionVote() {
  const { resolutionContract } = useContext(ContractsContext);
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ resolutionId, votedYes }: SubmitParams) => {
      return executeTx({
        contractMethod: resolutionContract?.vote,
        params: [resolutionId, votedYes],
        onSuccessMessage: `Correctly voted ${votedYes ? "Yes" : "No"}`,
        onErrorMessage: "Error voting resolution",
      });
    },
  };
}
