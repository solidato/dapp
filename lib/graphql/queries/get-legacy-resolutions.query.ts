import { gql } from "graphql-request";

import { legacyResolutionFragment, resolutionFragment } from "./resolution.fragment";

export const getLegacyResolutionsQuery = gql`
  query GetLegacyResolutions {
    resolutions(orderBy: createTimestamp, orderDirection: desc) {
      ...legacyResolutionFragment
    }
  }

  ${legacyResolutionFragment}
`;
