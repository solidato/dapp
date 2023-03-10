import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getNotApprovedTasks } from "@graphql/queries/get-not-approved-tasks.query";

import odooGraphQLClient from "@lib/graphql/odoo";
import { sessionOptions } from "@lib/session";

async function tasksRoute(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  const data = await odooGraphQLClient(cookie, getNotApprovedTasks, { userId: user.id });
  res
    .status(200)
    .json(
      data.ProjectTask.reduce(
        (total: number, task: { subtask_effective_hours: number; effective_hours: number }) =>
          task.subtask_effective_hours + task.effective_hours + total,
        0,
      ),
    );
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
