import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import useSWR from "swr";
import { DaoUser } from "types";

import { useCallback, useMemo } from "react";

import { fetcher } from "@graphql/client";
import { getShareholdersInfo } from "@graphql/queries/get-shareholders-info.query";

const bigIntToNum = (bigIntNum: BigInt) => Number(formatEther(BigNumber.from(bigIntNum)));

type ShareholderStatus = "ManagingBoard" | "Investor" | "Contributor" | "Shareholder";

export default function useShareholderStatus() {
  const { data, isLoading }: { data: any; isLoading: boolean } = useSWR(getShareholdersInfo, fetcher);

  const getShareholderStatus: (address: string) => ShareholderStatus[] = useCallback(
    (address: string) => {
      if (!data || !address) {
        return [];
      }
      return [
        data.daoManager?.managingBoardAddresses.includes(address.toLowerCase()) && "ManagingBoard",
        data.daoManager?.shareholdersAddresses.includes(address.toLowerCase()) && "Shareholder",
        data.daoManager?.contributorsAddresses.includes(address.toLowerCase()) && "Contributor",
        data.daoManager?.investorsAddresses.includes(address.toLowerCase()) && "Investor",
      ].filter(Boolean);
    },
    [data],
  );

  const [daoUsers, daoUsersAddresses] = useMemo(() => {
    if (!data) {
      return [];
    }

    const balancesSum = data.daoUsers.reduce(
      (sum: number, daoUser: DaoUser) =>
        getShareholderStatus(daoUser.address).length === 0
          ? sum
          : sum + (daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0),
      0,
    );

    const users = data?.daoUsers.reduce((computed: any, daoUser: DaoUser) => {
      const balance = Math.round(daoUser?.totalBalance ? bigIntToNum(daoUser.totalBalance) : 0);
      const power = (balance * 100) / balancesSum;
      computed[daoUser.address] = {
        balance,
        power: power > 0 ? power.toFixed(2) : 0,
      };
      return computed;
    }, {});

    const addresses = Object.keys(users)
      .filter((address) => getShareholderStatus(address).length > 0)
      .sort((userA, userB) => users[userB].balance - users[userA].balance);

    return [users, addresses];
  }, [data, getShareholderStatus]);

  return {
    daoUsers,
    daoUsersAddresses,
    getShareholderStatus,
    isLoading,
  };
}
