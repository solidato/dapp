import { gql } from "graphql-request";

import { daoManagerFragment } from "./dao-manager.fragment";

export const getShareholdersInfo = gql`
  query GetShareholdersInfo {
    daoManager(id: "0") {
      ...daoManagerFragment
    }

    daoUsers {
      address
      governanceBalance
      governanceOfferedTempBalance
      governanceVestingBalance
      governanceVaultedBalance
      governanceWithdrawableTempBalance
      votingPower
      shareholderRegistryBalance
      neokigdomTokenBalance
    }
  }

  ${daoManagerFragment}
`;
