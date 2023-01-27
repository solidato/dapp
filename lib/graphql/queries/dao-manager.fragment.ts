import { gql } from "graphql-request";

export const daoManagerFragment = gql`
  fragment daoManagerFragment on DaoManager {
    id
    managingBoardAddresses
    contributorsAddresses
    investorsAddresses
    shareholdersAddresses
  }
`;
