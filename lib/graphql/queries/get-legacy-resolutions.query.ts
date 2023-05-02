import { gql } from "graphql-request";

import { resolutionFragment } from "./resolution.fragment";

export const getLegacyResolutionsQuery = gql`
  query GetLegacyResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      ...resolutionFragment
    }
  }

  ${resolutionFragment}
`;
