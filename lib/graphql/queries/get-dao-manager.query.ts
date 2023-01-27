import { gql } from "graphql-request";
import { daoManagerFragment } from "./dao-manager.fragment";

export const getDaoManagerQuery = gql`
  query GetDaoManager {
    daoManager(id: "0") {
      ...daoManagerFragment
    }
  }

  ${daoManagerFragment}
`;
