import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";
import userFactory from "@lib/userFactory";

import { AuthUser } from "../../types";

async function userRoute(req: NextApiRequest, res: NextApiResponse<AuthUser>) {
  if (!req.session.user) {
    return res.json(userFactory({}));
  }
  res.json({
    ...req.session.user,
    isLoggedIn: true,
  });
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
