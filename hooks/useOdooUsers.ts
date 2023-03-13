import useSWR from "swr";
import { OdooUser } from "types";

import { fetcher } from "@lib/net";
import { isSameAddress } from "@lib/utils";

import useUser from "@hooks/useUser";

export default function useOdooUsers(address = ""): { users: OdooUser[]; error?: boolean; isLoading?: boolean } {
  const { user } = useUser();
  const { data, error, isLoading } = useSWR(user?.isLoggedIn ? "/api/users" : null, fetcher);

  if (!address && data) {
    return { users: data, isLoading: false, error: false };
  }

  if (address && data) {
    return {
      users: data.filter((user: OdooUser) => isSameAddress(user.ethereum_address, address)),
      isLoading: false,
      error: false,
    };
  }

  return { users: [], error, isLoading };
}
