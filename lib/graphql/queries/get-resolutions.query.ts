import { gql } from "graphql-request";
import { resolutionFragment } from "./resolution.fragment";

export const getResolutionsQuery = gql`
  query GetResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      ...resolutionFragment
    }
  }

  ${resolutionFragment}
`;
