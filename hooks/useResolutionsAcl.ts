import { ResolutionVoterEnhanced, ResolutionsAcl } from "types";
import { useAccount } from "wagmi";

import { getDaoManagerQuery } from "@graphql/subgraph/queries/get-dao-manager-query";
import { useSubgraphGraphQL } from "@graphql/subgraph/subgraph-client";

const DEFAULT_ACL = {
  canCreate: false,
  canUpdate: false,
  canApprove: false,
  canVote: (_: ResolutionVoterEnhanced[]) => false,
  isShareholder: false,
  isManagingBoard: false,
  isContributor: false,
  isExtraneous: true,
};

export default function useResolutionsAcl(): { acl: ResolutionsAcl; error?: boolean; isLoading?: boolean } {
  const { address } = useAccount();
  const { data, error, isLoading } = useSubgraphGraphQL(address ? getDaoManagerQuery : null);

  if (!data || error || !address || isLoading) {
    return { acl: DEFAULT_ACL, error, isLoading: isLoading };
  }

  const isContributor = data.daoManager?.contributorsAddresses.includes(address.toLowerCase());
  const isManagingBoard = data.daoManager?.managingBoardAddresses.includes(address.toLowerCase());
  const isShareholder = data.daoManager?.shareholdersAddresses.includes(address.toLowerCase());
  const isExtraneous = !isContributor && !isManagingBoard && !isShareholder;

  const acl = {
    canCreate: isContributor,
    canUpdate: isManagingBoard,
    canApprove: isManagingBoard,
    canVote: (resolutionVoters: ResolutionVoterEnhanced[]) =>
      resolutionVoters.map((voter) => voter.address.toLowerCase()).includes(address.toLowerCase()),
    isShareholder,
    isManagingBoard,
    isContributor,
    isExtraneous,
  };

  return { acl, error, isLoading };
}
