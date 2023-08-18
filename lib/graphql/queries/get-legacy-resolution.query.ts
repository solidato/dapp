import { gql } from "graphql-request";

import { legacyResolutionFragment } from "./resolution.fragment";

export const getLegacyResolutionQuery = gql`
  query GetLegacyResolution($id: String!) {
    resolution(id: $id) {
      ...legacyResolutionFragment
    }
  }

  ${legacyResolutionFragment}
`;
