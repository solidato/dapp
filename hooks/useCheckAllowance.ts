import { GovernanceToken, NeokingdomToken, TokenMock } from "@contracts/typechain";
import { formatEther } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";

import { useCallback, useEffect, useState } from "react";

export default function useCheckAllowance(
  contract?: GovernanceToken | NeokingdomToken | TokenMock | undefined,
  contractAddress?: string | undefined,
) {
  const [allowance, setAllowance] = useState(0);

  const { address } = useAccount();

  const refreshAllowanceFromContract = useCallback(async () => {
    if (contract) {
      const allowance = await contract?.allowance(address as string, contractAddress as string);
      if (allowance) {
        setAllowance(Number(formatEther(allowance)));
      }
    }
  }, [contract]);

  useEffect(() => {
    refreshAllowanceFromContract();
  }, [refreshAllowanceFromContract]);

  return {
    allowance,
    refreshAllowanceFromContract,
  };
}
