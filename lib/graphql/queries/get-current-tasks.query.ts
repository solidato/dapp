import { gql } from "graphql-request";

export const getCurrentTasks = gql`
  query GetCurrentTasks($userId: String!) {
    ProjectTask(
      domain: [
        "&"
        ["user_id", "=", $userId]
        ["approval_date", "=", false]
        ["parent_id", "=", false]
        "|"
        ["subtask_effective_hours", ">", 0]
        ["effective_hours", ">", 0]
      ]
      order: "write_date DESC"
    ) {
      subtask_effective_hours
      effective_hours
      name
      write_date
      project_id {
        id
        name
      }
    }
  }
`;
