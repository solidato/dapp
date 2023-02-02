import { gql } from "graphql-request";

import { daoManagerFragment } from "./dao-manager.fragment";
import { resolutionFragment } from "./resolution.fragment";

export const getResolutionAndDaoManagerQuery = gql`
  query GetResolutionAndDaoManager($id: String!) {
    resolution(id: $id) {
      ...resolutionFragment
    }

    daoManager(id: "0") {
      ...daoManagerFragment
    }
  }

  ${resolutionFragment}
  ${daoManagerFragment}
`;
