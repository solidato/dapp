import useSWR from "swr";
import { OdooUser } from "types";
import { useAccount } from "wagmi";

import { fetcher } from "@lib/net";
import { isSameAddress } from "@lib/utils";

import useUser from "@hooks/useUser";

export default function useOdooUsers(address?: string): {
  allOdooUsers: OdooUser[];
  currentOdooUser: OdooUser | null;
  filteredOdooUser: OdooUser | null;
  error?: boolean;
  isLoading?: boolean;
} {
  const { user } = useUser();
  const { data, error, isLoading } = useSWR(user?.isLoggedIn ? "/api/users" : null, fetcher);

  if (data) {
    return {
      allOdooUsers: data.filter((odooUser: OdooUser) => !!odooUser.ethereum_address),
      currentOdooUser: data.find((odooUser: OdooUser) =>
        isSameAddress(odooUser.ethereum_address, user?.ethereum_address as string),
      ),
      filteredOdooUser: data.find((odooUser: OdooUser) =>
        isSameAddress(odooUser.ethereum_address, address || (user?.ethereum_address as string)),
      ),
      isLoading: false,
      error: false,
    };
  }

  return { allOdooUsers: [], currentOdooUser: null, filteredOdooUser: null, error, isLoading };
}
