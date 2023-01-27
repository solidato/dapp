import { gql } from "graphql-request";
import { resolutionTypeFragment } from "./resolution-type.fragment";

export const getResolutionTypesQuery = gql`
  query GetResolutionTypes {
    resolutionTypes {
      ...resolutionTypeFragment
    }
  }

  ${resolutionTypeFragment}
`;
