import { useAccount } from "wagmi";

import { ReactElement, useContext } from "react";

import { ContractsContext } from "../contexts/ContractsContext";
import useBlockhainTransaction from "./useBlockchainTransaction";

type SubmitParams = {
  delegatingAddress: string;
  successElement: ReactElement;
  errorElement: ReactElement;
};

export default function useDelegate() {
  const { votingContract } = useContext(ContractsContext);
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ delegatingAddress, successElement, errorElement }: SubmitParams) => {
      return executeTx({
        contractMethod: votingContract?.delegate,
        params: [delegatingAddress],
        onSuccessMessage: successElement,
        onErrorMessage: errorElement,
      });
    },
  };
}
