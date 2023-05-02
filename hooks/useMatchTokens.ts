import { InternalMarket } from "@contracts/typechain";
import { parseEther } from "ethers/lib/utils.js";

import { BLOCKCHAIN_TRANSACTION_KEYS } from "@lib/constants";

import useBlockhainTransaction from "./useBlockchainTransaction";
import { useContracts } from "./useContracts";

type SubmitParams = {
  amount: number;
  offerUserAddress: string;
};

export default function useMatchTokens() {
  const { internalMarketContract } = useContracts();
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ offerUserAddress, amount }: SubmitParams) => {
      return executeTx<InternalMarket["matchOffer"], Parameters<InternalMarket["matchOffer"]>>({
        contractMethod: internalMarketContract?.matchOffer,
        params: [offerUserAddress, parseEther(String(amount))],
        onSuccessMessage: "Offer correctly matched",
        onErrorMessage: "Error matching the offer",
        stateKey: BLOCKCHAIN_TRANSACTION_KEYS.MATCH_TOKENS,
      });
    },
  };
}
