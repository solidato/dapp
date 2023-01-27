import { gql } from "graphql-request";

export const resolutionTypeFragment = gql`
  fragment resolutionTypeFragment on ResolutionType {
    id
    name
    quorum
    noticePeriod
    votingPeriod
    canBeNegative
  }
`;
