import { eq } from "drizzle-orm";
import { withIronSessionApiRoute } from "iron-session/next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";
import userFactory from "@lib/userFactory";

import { db } from "../../drizzle";
import { shareholders } from "../../schema/shareholders";
import { AuthUser } from "../../types";

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { cookie } = req.session;
  try {
    if (!cookie) throw new Error("No cookie found");
    const payload = jwt.verify(cookie, process.env.JWT_SECRET) as AuthUser;
    const users = await db.query.shareholders.findMany({
      where: eq(shareholders.ethAddress, String(payload.ethAddress)),
    });
    return res.json({ ...userFactory(payload), ...users[0] });
  } catch (err) {
    req.session.destroy();
    return res.status(401).json(userFactory({}));
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
