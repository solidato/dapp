import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getProjectsTasksQuery } from "@graphql/queries/get-projects-tasks.query";

import odooGraphQLClient from "@lib/graphql/odoo";
import { ODOO_DB_NAME, ODOO_ENDPOINT, getSession } from "@lib/odooClient";
import { sessionOptions } from "@lib/session";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const { body } = req;
  const { username, password } = user;
  const session = await getSession(ODOO_ENDPOINT, ODOO_DB_NAME, username, password);

  if (req.method === "GET") {
    // List all Projects Tasks
    const data = await odooGraphQLClient(cookie, getProjectsTasksQuery, { userId: user.id });
    res.status(200).json(data.ProjectProject);
  }

  if (req.method === "POST") {
    // Create New Task
    try {
      const newTaskId = await session.create("project.task", JSON.parse(body));
      if (newTaskId) {
        const [newTask] = await session.read("project.task", [Number(newTaskId)]);
        res.status(200).json(newTask);
      } else {
        throw new Error("Unable to create task");
      }
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);