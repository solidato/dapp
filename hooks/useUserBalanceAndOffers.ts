import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import useSWR from "swr";
import { ComputedBalances, DaoUser, Offer } from "types";
import { useAccount } from "wagmi";

import { fetcherWithParams } from "@graphql/client";
import { getTokensPageData } from "@graphql/queries/get-tokens-page-data";

import { isSameAddress } from "@lib/utils";

export const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

export const computeBalances = (daoUser: DaoUser | null, userOffers: Offer[]): ComputedBalances => {
  const nowTimestamp = Date.now();

  const total = daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0;
  const vesting = daoUser?.vestingBalance ? bigIntToNum(daoUser.vestingBalance) : 0;
  const unlockedTempBalance = daoUser?.unlockedTempBalance ? bigIntToNum(daoUser.unlockedTempBalance) : 0;

  const [unlocked, currentlyOffered] = userOffers
    .filter((offer) => isSameAddress(offer.from, daoUser?.address as string))
    .reduce(
      (totals, offer) => {
        const offerAmount = Number(formatEther(BigNumber.from(offer.amount)));
        const offerExpirationTimestamp = Number(offer.expirationTimestamp) * 1000;
        const [totUnlocked, totCurrentlyOffered] = totals;
        const newUnlocked = totUnlocked + (nowTimestamp > offerExpirationTimestamp ? offerAmount : 0);
        const newCurrentlyOffered = totCurrentlyOffered + (nowTimestamp <= offerExpirationTimestamp ? offerAmount : 0);
        return [newUnlocked, newCurrentlyOffered];
      },
      [unlockedTempBalance, 0],
    );

  const locked = total - unlocked - vesting;
  const maxToOffer = locked - currentlyOffered;

  return {
    total,
    vesting,
    unlocked,
    locked,
    currentlyOffered,
    maxToOffer,
  };
};

const REFRESH_EVERY_MS = 1000 * 60 * 10;

export default function useUserBalanceAndOffers(): {
  data: { balance: ComputedBalances; offers: Offer[] } | null;
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
        balance: computeBalances(data.daoUser, data.offers),
        offers: data.offers,
      },
      isLoading,
    };
  }

  return {
    data,
    isLoading,
  };
}
