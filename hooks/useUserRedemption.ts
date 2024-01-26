import useSWR from "swr";
import { Redemption } from "types";
import { useAccount } from "wagmi";

import { useMemo } from "react";

import { fetcherWithParams } from "@graphql/client";
import { getUserRedemption } from "@graphql/queries/get-user-redemption";

import { bigIntToBigNum } from "./useUserBalanceAndOffers";

const REFRESH_EVERY_MS = 1000 * 5;

export default function useUserRedemption(): {
  data: Redemption[] | null;
  error: any;
  isLoading: boolean;
} {
  const { address: userId } = useAccount();
  const { data, error, isLoading } = useSWR<any>(
    userId ? [getUserRedemption, { userId: userId.toLowerCase() }] : null,
    fetcherWithParams,
    {
      refreshInterval: REFRESH_EVERY_MS,
    },
  );

  const redemptions = useMemo(() => {
    if (!data) return null;

    return data.redemptions.reduce((acc: Redemption[], redemption: Redemption) => {
      const existingRedemption = acc.find(
        (existing) =>
          existing.startTimestamp === redemption.startTimestamp && existing.endTimestamp === redemption.endTimestamp,
      );
      if (existingRedemption) {
        existingRedemption.amount = bigIntToBigNum(existingRedemption.amount)
          .add(bigIntToBigNum(redemption.amount))
          .toBigInt();
        existingRedemption.redemptionHistory.push(...redemption.redemptionHistory);
      } else {
        acc.push({ ...redemption });
      }
      return acc;
    }, []);
  }, [data]);

  if (redemptions && !isLoading && !error) {
    return {
      data: redemptions,
      isLoading,
      error: null,
    };
  }

  return {
    data,
    isLoading,
    error,
  };
}
