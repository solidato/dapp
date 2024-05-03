import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getTasksForAuditing } from "@graphql/queries/get-tasks-for-auditing";

import { sessionOptions } from "@lib/session";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }
  // TODO: TASKS FOR AUDITING
  // const data = await odooClient.query(cookie, getTasksForAuditing);
  res.status(200).json([]);
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
