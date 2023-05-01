import { InternalMarket } from "@contracts/typechain";
import { parseEther } from "ethers/lib/utils.js";

import { BLOCKCHAIN_TRANSACTION_KEYS } from "@lib/constants";

import useBlockhainTransaction from "./useBlockchainTransaction";
import { useContracts } from "./useContracts";

export default function useDeposit() {
  const { internalMarketContract } = useContracts();
  const { executeTx } = useBlockhainTransaction();

  return {
    onSubmit: async ({ amount }: { amount: number }) => {
      return executeTx<InternalMarket["deposit"], Parameters<InternalMarket["deposit"]>>({
        contractMethod: internalMarketContract?.deposit,
        params: [parseEther(String(amount))],
        onSuccessMessage: `NEOK deposited correctly`,
        onErrorMessage: `Error approving depositing NEOK`,
        stateKey: BLOCKCHAIN_TRANSACTION_KEYS.DEPOSIT_NEOK,
      });
    },
  };
}
