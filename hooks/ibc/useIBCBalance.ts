import { NeokingdomToken, NeokingdomToken__factory } from "@contracts/typechain";
import { Provider } from "@ethersproject/providers";
import { evmosToEth } from "@evmos/address-converter";
import { BalanceByDenomResponse, generateEndpointBalanceByDenom } from "@evmos/provider";
import { BigNumber, ethers } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { useProvider } from "wagmi";

import { useCallback, useEffect, useState } from "react";

import networksNeoKingdom from "../../networks/neokingdom.json";
import networksTeledisko from "../../networks/teledisko.json";
import useIbcStore from "../../store/ibcStore";
import { COSMOS_NODE_URL, DENOMS, restOptions } from "./utils";

type Balance = {
  balance?: BigNumber;
  balanceFloat?: number;
  ibc?: BigNumber;
  ibcFloat?: number;
  erc?: BigNumber;
  ercFloat?: number;
};

const networks: Record<string, any> =
  process.env.NEXT_PUBLIC_PROJECT_KEY === "neokingdom" ? networksNeoKingdom : networksTeledisko;

const getNeokingdomTokenContract = (chainId: string, provider: Provider): NeokingdomToken => {
  const address = networks[chainId]["NeokingdomToken"]?.address;
  return NeokingdomToken__factory.connect(address, provider);
};

export default function useIBCBalance({ address }: { address?: string | undefined }) {
  const provider = useProvider();
  const [balance, setBalance] = useState<Balance>({});
  const [error, setError] = useState<string>();
  const setEvmosBalance = useIbcStore(({ setEvmosBalance }) => setEvmosBalance);
  const setCrescentBalance = useIbcStore(({ setEvmosBalance }) => setEvmosBalance);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getQueryEndpoint = (address: string) => {
    let nodeUrl: string;
    let denom: string;
    if (address.startsWith("evmos")) {
      nodeUrl = COSMOS_NODE_URL["evmos"];
      denom = DENOMS["evmos"];
    } else if (address.startsWith("cre")) {
      nodeUrl = COSMOS_NODE_URL["crescent"];
      denom = DENOMS["crescent"];
    } else {
      setError("Invalid address");
      return null;
    }
    return `${nodeUrl}${generateEndpointBalanceByDenom(address, denom)}`;
  };

  const reload = useCallback(
    async (address?: string) => {
      if (!address) return null;
      const balance: Balance = {};
      const neokingdomTokenContract = getNeokingdomTokenContract("9001", provider);
      if (!neokingdomTokenContract) {
        setError("No contract found!");
        return;
      }

      const queryEndpoint = getQueryEndpoint(address);
      if (!queryEndpoint) return null;

      setIsLoading(true);
      const res = await fetch(queryEndpoint, restOptions);
      if (!res.ok) {
        setError("Unable to fetch balance");
        setBalance({});
        setIsLoading(false);
        return;
      }
      const result: BalanceByDenomResponse = await res.json();
      const amount = result.balance.amount;
      balance.ibc = BigNumber.from(amount);
      balance.ibcFloat = parseFloat(formatEther(amount));

      balance.erc = BigNumber.from(0);
      balance.ercFloat = 0;

      if (address.startsWith("evmos")) {
        const ethAddress = evmosToEth(address);
        const balanceErc20 = (await neokingdomTokenContract?.balanceOf(ethAddress)) as BigNumber;
        balance.erc = balanceErc20;
        balance.ercFloat = parseFloat(formatEther(balance.erc));
      }

      balance.balance = balance.ibc.add(balance.erc);
      balance.balanceFloat = parseFloat(formatEther(balance.balance));
      console.log(`🐞 > Reload ${address.startsWith("evmos") ? "evmos" : "crescent"} balance:`, balance.balanceFloat);
      setBalance(balance);
      setIsLoading(false);
      setError("");
    },
    [provider],
  );

  useEffect(() => {
    reload(address);
  }, [address, reload]);

  return { ...balance, error, reload, isLoading };
}
