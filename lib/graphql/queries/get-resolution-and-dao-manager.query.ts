import { gql } from "graphql-request";
import { resolutionFragment } from "./resolution.fragment";
import { daoManagerFragment } from "./dao-manager.fragment";

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
