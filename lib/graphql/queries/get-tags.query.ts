import { gql } from "graphql-request";

export const getTagsQuery = gql`
  query GetTags {
    ProjectTags {
      id
      name
    }
  }
`;
