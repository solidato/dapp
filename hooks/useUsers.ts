import useSWR from "swr";

import { fetcher } from "@lib/net";
import { isSameAddress } from "@lib/utils";

import { Shareholder } from "../schema/shareholders";

export default function useUsers() {
  const { data: users, isLoading, error } = useSWR<Shareholder[]>("/api/users", fetcher);
  const getUser = (address: string) => (users || []).find((user) => isSameAddress(user.ethAddress, address));
  return {
    users,
    getUser,
    isLoading,
    error,
  };
}
