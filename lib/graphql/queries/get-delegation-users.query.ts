import { gql } from "graphql-request";

export const getDelegationUsers = gql`
  query GetDelegationUsers {
    delegationUsers {
      id
      address
      delegated
    }
  }
`;
