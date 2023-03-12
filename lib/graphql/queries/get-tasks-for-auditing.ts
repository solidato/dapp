import { gql } from "graphql-request";

export const getTasksForAuditing = gql`
  query GetTasksForAuditing($limit: Number! = 20, $offset: Number! = 0) {
    ProjectTask(
      domain: [
        "&"
        ["approval_date", "=", false]
        ["parent_id", "=", false]
        "|"
        ["subtask_effective_hours", ">", 0]
        ["effective_hours", ">", 0]
      ]
      order: "write_date DESC"
      limit: 20
      offset: 0
    ) {
      subtask_effective_hours
      effective_hours
      name
      write_date
      project_id {
        id
        name
      }
      child_ids {
        id
        name
      }
      user_id {
        id
        name
        ethereum_address
      }
    }
  }
`;
