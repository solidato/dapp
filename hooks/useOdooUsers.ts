import useSWR from "swr";
import { OdooUser } from "types";
import useUser from "@lib/useUser";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const isSameAddress = (addressLeft: string, addressRight: string) =>
  typeof addressLeft === "string" && // neeeded as odoo sometimes returns false as eth address
  typeof addressRight === "string" && // see ^
  addressLeft.toLowerCase() === addressRight.toLowerCase();

export default function useOdooUsers(address = ""): { users: OdooUser[]; error?: boolean; isLoading?: boolean } {
  const { user } = useUser();
  const { data, error, isLoading } = useSWR(user?.isLoggedIn ? "/api/users" : null, fetcher);

  if (!address && data) {
    return { users: data };
  }

  if (address && data) {
    return { users: data.filter((user: OdooUser) => isSameAddress(user.ethereum_address, address)) };
  }

  return { users: [], error, isLoading };
}
