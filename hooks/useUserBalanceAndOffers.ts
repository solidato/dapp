import { useContractsContext } from "contexts/ContractsContext";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import useSWR from "swr";
import { ComputedBalances, DaoUser, Offer } from "types";
import { useAccount } from "wagmi";

import { useEffect, useState } from "react";

import { fetcherWithParams } from "@graphql/client";
import { getTokensPageData } from "@graphql/queries/get-tokens-page-data";

export const isNonExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 > Date.now();

export const isExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 <= Date.now();

export const bigIntToBigNum = (bigIntNum: BigInt) => BigNumber.from(bigIntNum);
export const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

export const computeBalances = (daoUser: DaoUser | null, neokTokens: number): ComputedBalances => {
  const governanceTokens = bigIntToBigNum(daoUser?.governanceVaultedBalance || BigInt(0)).add(
    bigIntToBigNum(daoUser?.governanceBalance || BigInt(0)),
  );

  // commented out until we will figure the problem out w/ subgraph's neokigdomTokenBalance
  // const neokTokens = bigIntToBigNum(daoUser?.neokigdomTokenBalance || BigInt(0));

  const lockedTokens = bigIntToBigNum(daoUser?.governanceBalance || BigInt(0)).sub(
    bigIntToBigNum(daoUser?.governanceVestingBalance || BigInt(0)),
  );

  const offeredTokens = (daoUser?.activeOffers || []).reduce((sum, activeOffer) => {
    return sum.add(isNonExpired(activeOffer) ? bigIntToBigNum(activeOffer.amount) : BigNumber.from(0));
  }, BigNumber.from(0));

  const unlockedTokens = bigIntToBigNum(daoUser?.governanceWithdrawableTempBalance || BigInt(0)).add(
    (daoUser?.activeOffers || []).reduce((sum, activeOffer) => {
      return sum.add(isExpired(activeOffer) ? bigIntToBigNum(activeOffer.amount) : BigNumber.from(0));
    }, BigNumber.from(0)),
  );

  const vestingTokens = bigIntToBigNum(daoUser?.governanceVestingBalance || BigInt(0));

  return {
    governanceTokens: Number(formatEther(governanceTokens)),
    neokTokens,
    lockedTokens: Number(formatEther(lockedTokens)),
    offeredTokens: Number(formatEther(offeredTokens)),
    unlockedTokens: Number(formatEther(unlockedTokens)),
    vestingTokens: Number(formatEther(vestingTokens)),
    votingPower: bigIntToNum(daoUser?.votingPower || BigInt(0)),
  };
};

const REFRESH_EVERY_MS = 1000 * 5;

const useGetNeokingdomTokenBalance = () => {
  const { address } = useAccount();
  const { neokingdomTokenContract } = useContractsContext();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    if (neokingdomTokenContract && address) {
      async function getBalance() {
        const balanceErc20 = (await neokingdomTokenContract?.balanceOf(address as string)) as BigNumber;
        setBalance(parseFloat(formatEther(balanceErc20)));
      }
      getBalance();
    }
  }, [neokingdomTokenContract, address]);

  return balance;
};

export default function useUserBalanceAndOffers(): {
  data: { balance: ComputedBalances; allOffers: Offer[]; expiredOffers: Offer[]; activeOffers: Offer[] } | null;
  isLoading: boolean;
} {
  const { address: userId } = useAccount();
  const neokBalance = useGetNeokingdomTokenBalance();
  const { data, isLoading } = useSWR<any>(
    userId ? [getTokensPageData, { userId: userId.toLowerCase() }] : null,
    fetcherWithParams,
    {
      refreshInterval: REFRESH_EVERY_MS,
    },
  );

  if (data && !isLoading && typeof neokBalance === "number") {
    return {
      data: {
        balance: computeBalances(data.daoUser, neokBalance),
        allOffers: data.offers,
        expiredOffers: data.offers.filter(isExpired),
        activeOffers: data.offers.filter(isNonExpired),
      },
      isLoading,
    };
  }

  return {
    data,
    isLoading: isLoading || typeof neokBalance !== "number",
  };
}
