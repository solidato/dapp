import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const {
    query: { taskId },
    body,
  } = req;
  if (req.method === "PUT") {
    // UPDATE TASK
    try {
      // TODO: TASKS
      // const updated = await session.update("project.task", Number(taskId), JSON.parse(body));
      res.status(200).json({ updated: {} });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "DELETE") {
    // DELETE TASK
    try {
      // const deleted = await session.remove("project.task", [Number(taskId)]);
      res.status(200).json({ deleted: false });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
