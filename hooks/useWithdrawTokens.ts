import { NeokingdomToken } from "@contracts/typechain";
import { parseEther } from "ethers/lib/utils.js";

import useBlockhainTransaction from "./useBlockchainTransaction";
import { useContracts } from "./useContracts";

type SubmitParams = {
  amount: number;
  toAddress: string;
};

export default function useWithdrawTokens() {
  const { neokingdomTokenContract } = useContracts();
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ amount, toAddress }: SubmitParams) => {
      return executeTx<NeokingdomToken["transfer"], Parameters<NeokingdomToken["transfer"]>>({
        contractMethod: neokingdomTokenContract?.transfer,
        params: [toAddress, parseEther(String(amount))],
        onSuccessMessage: "Tokens correctly withdrew",
        onErrorMessage: "Error withdrawing tokens",
      });
    },
  };
}
