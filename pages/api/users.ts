// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";

import { db } from "../../drizzle";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.session.cookie;
  if (!cookie) {
    return res.status(401).end();
  }
  const shareholders = await db.query.shareholders.findMany();
  return res.status(200).json(shareholders);
};

export default withIronSessionApiRoute(getUsers, sessionOptions);
