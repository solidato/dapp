import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import useSWR from "swr";
import { ComputedBalances, DaoUser, Offer } from "types";
import { useAccount } from "wagmi";

import { fetcherWithParams } from "@graphql/client";
import { getTokensPageData } from "@graphql/queries/get-tokens-page-data";

export const isNonExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 > Date.now();

export const isExpired = (offer: Offer) => Number(offer.expirationTimestamp) * 1000 <= Date.now();

export const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

export const computeBalances = (daoUser: DaoUser | null): ComputedBalances => {
  const governanceTokens =
    bigIntToNum(daoUser?.governanceVaultedBalance || BigInt(0)) + bigIntToNum(daoUser?.governanceBalance || BigInt(0));
  const neokTokens = bigIntToNum(daoUser?.neokigdomTokenBalance || BigInt(0));

  const lockedTokens =
    bigIntToNum(daoUser?.governanceBalance || BigInt(0)) - bigIntToNum(daoUser?.governanceVestingBalance || BigInt(0));
  const offeredTokens = (daoUser?.activeOffers || []).reduce((sum, activeOffer) => {
    return sum + (isNonExpired(activeOffer) ? bigIntToNum(activeOffer.amount) : 0);
  }, 0);
  const unlockedTokens =
    bigIntToNum(daoUser?.governanceWithdrawableTempBalance || BigInt(0)) +
    (daoUser?.activeOffers || []).reduce((sum, activeOffer) => {
      return sum + (isExpired(activeOffer) ? bigIntToNum(activeOffer.amount) : 0);
    }, 0);
  const vestingTokens = bigIntToNum(daoUser?.governanceVestingBalance || BigInt(0));

  return {
    governanceTokens,
    neokTokens,
    lockedTokens,
    offeredTokens,
    unlockedTokens,
    vestingTokens,
  };
};

const REFRESH_EVERY_MS = 1000 * 5;

export default function useUserBalanceAndOffers(): {
  data: { balance: ComputedBalances; allOffers: Offer[]; expiredOffers: Offer[]; activeOffers: Offer[] } | null;
  isLoading: boolean;
} {
  const { address: userId } = useAccount();
  const { data, isLoading } = useSWR<any>(
    userId ? [getTokensPageData, { userId: userId.toLowerCase() }] : null,
    fetcherWithParams,
    {
      refreshInterval: REFRESH_EVERY_MS,
    },
  );

  if (data && !isLoading) {
    return {
      data: {
        balance: computeBalances(data.daoUser),
        allOffers: data.offers,
        expiredOffers: data.offers.filter(isExpired),
        activeOffers: data.offers.filter(isNonExpired),
      },
      isLoading,
    };
  }

  return {
    data,
    isLoading,
  };
}
