import { gql } from "graphql-request";

import { getStageId } from "@lib/constants";

import { projectTaskFragment } from "./project-task.fragment";

export const getProjectsTasksQuery = gql`
  query GetProjectsTasks($projectIds: [Int]!, $taskIds: [Int]!, $userId: Int!) {
    ProjectProject(domain: [["id", "in", $projectIds]]) {
      id
      name
      description
      display_name
      tag_ids {
        id
        name
      }
      task_count
      task_count_with_subtasks
      tasks(domain: [["id", "in", $taskIds], ["stage_id.id", "!=", ${getStageId("approved")} ]]) {
        ...projectTaskFragment
        child_ids(domain: [["user_id", "in", [$userId]], ["stage_id.id", "!=", ${getStageId("approved")} ]]) {
          ...projectTaskFragment
        }
      }
    }
  }

  ${projectTaskFragment}
`;
