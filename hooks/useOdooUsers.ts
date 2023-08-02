import useSWR from "swr";
import { OdooUser } from "types";

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
    const userEthereumAddress = user?.ethereum_address as string;
    const allOdooUsers = data.filter((odooUser: OdooUser) => !!odooUser.ethereum_address);
    return {
      allOdooUsers,
      currentOdooUser: allOdooUsers.find((odooUser: OdooUser) =>
        isSameAddress(odooUser.ethereum_address, userEthereumAddress),
      ),
      filteredOdooUser: allOdooUsers.find((odooUser: OdooUser) =>
        isSameAddress(odooUser.ethereum_address, address || userEthereumAddress),
      ),
      isLoading: false,
      error: false,
    };
  }

  return { allOdooUsers: [], currentOdooUser: null, filteredOdooUser: null, error, isLoading };
}
