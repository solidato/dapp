import { gql } from "graphql-request";

export const getNotApprovedTasks = gql`
  query GetUser($userId: String!) {
    ProjectTask(domain: [["user_id", "=", $userId], ["approval_date", "=", false]]) {
      subtask_effective_hours
      effective_hours
    }
  }
`;
