import { eq } from "drizzle-orm";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";

import { db } from "../../../../drizzle";
import { shareholders } from "../../../../schema/shareholders";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { ethAddress },
  } = req;

  if (req.method === "GET") {
    try {
      const results = await db.query.shareholders.findMany({ where: eq(shareholders.ethAddress, String(ethAddress)) });
      res.json(results[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};

export default withIronSessionApiRoute(userRoute, sessionOptions);
