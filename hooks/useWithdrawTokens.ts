import { TelediskoToken } from "@contracts/typechain";
import { parseEther } from "ethers/lib/utils.js";

import { useContext } from "react";

import { ContractsContext } from "../contexts/ContractsContext";
import useBlockhainTransaction from "./useBlockchainTransaction";

type SubmitParams = {
  amount: number;
  toAddress: string;
};

export default function useWithdrawTokens() {
  const { tokenContract } = useContext(ContractsContext);
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ amount, toAddress }: SubmitParams) => {
      return executeTx<TelediskoToken["transfer"], Parameters<TelediskoToken["transfer"]>>({
        contractMethod: tokenContract?.transfer,
        params: [toAddress, parseEther(String(amount))],
        onSuccessMessage: "Tokens correctly withdrew",
        onErrorMessage: "Error withdrawing tokens",
      });
    },
  };
}
