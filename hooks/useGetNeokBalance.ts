import { useContractsContext } from "contexts/ContractsContext";
import { formatEther } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";

import { useEffect, useState } from "react";

export default function useGetNeokBalance() {
  const { neokingdomTokenContract } = useContractsContext();
  const { address } = useAccount();

  const [neokBalance, setNeokBalance] = useState<null | number>(null);

  useEffect(() => {
    if (!neokingdomTokenContract || !address) return;

    neokingdomTokenContract.balanceOf(address).then((balance) => {
      setNeokBalance(Number(formatEther(balance)));
    });
  }, [neokingdomTokenContract]);

  return {
    neokBalance,
  };
}
