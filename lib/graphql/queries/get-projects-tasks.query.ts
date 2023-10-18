import { gql } from "graphql-request";

import { projectTaskFragment } from "./project-task.fragment";

export const getProjectsTasksQuery = gql`
  query GetProjectsTasks($projectIds: [Int]!, $taskIds: [Int]!) {
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
      tasks(domain: [["id", "in", $taskIds]]) {
        ...projectTaskFragment
        child_ids {
          ...projectTaskFragment
        }
      }
    }
  }

  ${projectTaskFragment}
`;
