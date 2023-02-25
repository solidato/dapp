import { useContext } from "react";

import { ContractsContext } from "../contexts/ContractsContext";
import useBlockhainTransaction from "./useBlockchainTransaction";

type SubmitParams = {
  delegatingAddress: string;
};

export default function useDelegate() {
  const { votingContract } = useContext(ContractsContext);
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ delegatingAddress }: SubmitParams) =>
      executeTx({
        contractMethod: votingContract?.delegate,
        params: [delegatingAddress],
        onSuccessMessage: `Correctly delegated user ${delegatingAddress}`,
        onErrorMessage: `Error delegating user ${delegatingAddress}`,
      }),
  };
}
