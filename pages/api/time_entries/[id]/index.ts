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
    query: { id },
    body,
  } = req;

  if (req.method === "PUT") {
    // Update Time Entry
    try {
      // TODO: Validate body params
      // const updated = await session.update("account.analytic.line", Number(id), JSON.parse(body));
      // if (updated) {
      //   const [newTimeEntry] = await session.read("account.analytic.line", [Number(id)]);
      //   res.status(200).json(newTimeEntry);
      // } else {
      //   throw new Error("Unable to update time entry");
      // }
      throw new Error("Unable to update time entry");
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  if (req.method === "DELETE") {
    // Remove Time Entry
    // const removed = await session.remove("account.analytic.line", [Number(id)]);
    return res.status(200).json({ removed: false });
  }
}

export default withIronSessionApiRoute(tasksRoute, sessionOptions);
