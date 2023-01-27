import { gql } from "graphql-request";
import { resolutionFragment } from "./resolution.fragment";

export const getResolutionQuery = gql`
  query GetResolution($id: String!) {
    resolution(id: $id) {
      ...resolutionFragment
    }
  }

  ${resolutionFragment}
`;
