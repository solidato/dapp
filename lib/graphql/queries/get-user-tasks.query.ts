import { gql } from "graphql-request";

import { getStageId } from "../../constants";

export const getUserTasksQuery = gql`
  query GetUserTasks($user_id: Int!) {
    ProjectTask(domain: [["user_id", "in", [$user_id] ], ["stage_id.id", "!=", ${getStageId("approved")} ]]) {
      id
      name
      stage_id {
        id
        name
      }
      project_id {
        id
        name
      }
      parent_id {
        id
        name
      }
    }
  }
`;
