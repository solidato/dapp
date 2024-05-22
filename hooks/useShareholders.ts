import useSWR from "swr";

import { fetcher } from "@lib/net";

import { Shareholder } from "../schema/shareholders";
import { ShareholderStatus } from "../types";

export type DaoUser = {
  id: string;
  address: string;
  votingPower: BigInt;
  governanceBalance: number;
  governanceOfferedTempBalance: number;
  governanceVestingBalance: number;
  governanceVaultedBalance: number;
  governanceWithdrawableTempBalance: number;
  shareholderRegistryBalance: number;
  neokigdomTokenBalance: number;
  power: string;
  ownership: string;
  shareholdingRights: string;
  status: ShareholderStatus[];
  user?: Shareholder;
};

export default function useShareholders() {
  const { data: daoUsers, mutate, isLoading, error } = useSWR<DaoUser[]>("/api/shareholders", fetcher);
  return {
    daoUsers,
    mutate,
    isLoading,
    error,
  };
}
