import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "../../lib/session";
import userFactory from "../../lib/userFactory";
import { AuthUser } from "../../types";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<AuthUser>) {
  req.session.destroy();
  res.json(userFactory({}));
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
