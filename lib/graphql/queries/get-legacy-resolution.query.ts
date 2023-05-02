import { gql } from "graphql-request";

import { resolutionFragment } from "./resolution.fragment";

export const getLegacyResolutionQuery = gql`
  query GetLegacyResolution($id: String!) {
    resolution(id: $id) {
      ...resolutionFragment
    }
  }

  ${resolutionFragment}
`;
