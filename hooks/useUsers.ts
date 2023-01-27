import useSWR from "swr";
import { OdooUser } from "types";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const isSameAddress = (addressLeft: string, addressRight: string) =>
  typeof addressLeft === "string" && // neeeded as odoo sometimes returns false as eth address
  typeof addressRight === "string" && // neeeded as odoo sometimes returns false as eth address
  addressLeft.toLowerCase() === addressRight.toLowerCase();

export default function useUsers(address = ""): { users: OdooUser[]; error?: boolean; isLoading?: boolean } {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (!address && data) {
    return { users: data };
  }

  if (address && data) {
    return { users: data.filter((user: OdooUser) => isSameAddress(user.ethereum_address, address)) };
  }

  return { users: [], error, isLoading };
}
