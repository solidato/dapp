import useSWR from "swr";
import { useAccount } from "wagmi";

import { fetcher } from "@graphql/client";
import { getDelegationUsers } from "@graphql/queries/get-delegation-users.query";

import { isSameAddress } from "@lib/utils";

import { DelegationUser } from "../types";

export default function useDelegationStatus() {
  const { address } = useAccount();
  const { data, error, isLoading } = useSWR(address ? getDelegationUsers : null, fetcher);

  if (error || isLoading || !data) {
    return {
      data: {
        signerDelegatedBy: [],
        signerDelegationStatus: null,
        usersList: [],
      },
      error,
      isLoading,
    };
  }

  const delegationUsers = (data?.delegationUsers || []) as DelegationUser[];

  const signerDelegationStatus = (delegationUsers as DelegationUser[]).find((user) =>
    isSameAddress(user.address, address as string),
  );

  // if this is null it means noone has delegated current user, and therefore they can delegate
  const signerDelegatedBy = delegationUsers.filter(
    (user) => !isSameAddress(user.address, address as string) && isSameAddress(user.delegated, address as string),
  );

  return {
    data: {
      signerDelegatedBy,
      signerDelegationStatus,
      usersList: delegationUsers
        .filter((user) => !isSameAddress(user.address, address as string))
        .map((user) => ({
          ...user,
          canBeDelegated: isSameAddress(user.address, user.delegated) && signerDelegatedBy.length === 0,
        })),
    },
  };
}
