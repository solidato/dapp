import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";

import { db } from "../../../drizzle";

const usersRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await db.query.shareholders.findMany();
      res.json(users);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};

export default withIronSessionApiRoute(usersRoute, sessionOptions);
