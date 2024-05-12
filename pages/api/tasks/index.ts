import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getProjectsTasksQuery } from "@graphql/queries/get-projects-tasks.query";
import { getUserTasksQuery } from "@graphql/queries/get-user-tasks.query";

import { sessionOptions } from "@lib/session";

import { ProjectTask } from "@store/projectTaskStore";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const { body } = req;

  const getUserTasks = async (userId?: number) => {
    // TODO: TASKS
    // const userTasks = await odooGraphQLClient.query(cookie, getUserTasksQuery, { user_id: userId });
    return [];
  };

  const getUserProjectIds = (tasks: ProjectTask[]) => {
    return [...new Set(tasks.map((t: ProjectTask) => t.project_id.id))];
  };

  const getTaskIds = (tasks: ProjectTask[]) => {
    return [
      ...new Set(
        tasks.map((task: ProjectTask) => {
          if (task.parent_id) return task.parent_id.id;
          return task.id;
        }),
      ),
    ];
  };

  if (req.method === "GET") {
    // List all Projects Tasks
    try {
      const userId = user.id;
      const tasks = await getUserTasks(userId);
      const projectIds = getUserProjectIds(tasks);
      const taskIds = getTaskIds(tasks);
      // TODO: TASKS
      // const data = await odooGraphQLClient.query(cookie, getProjectsTasksQuery, {
      //   projectIds,
      //   taskIds,
      //   userId,
      // });
      res.status(200).json([]);
    } catch (err: any) {
      console.log("🐞 > err:", err);
      res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "POST") {
    // Create New Task
    try {
      // TODO: TASKS
      // const newTaskId = await session.create("project.task", JSON.parse(body));
      // if (newTaskId) {
      //   const [newTask] = await session.read("project.task", [Number(newTaskId)]);
      //   res.status(200).json(newTask);
      // } else {
      //   throw new Error("Unable to create task");
      // }
      throw new Error("Unable to create task");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
