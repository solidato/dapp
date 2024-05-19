import { eq } from "drizzle-orm";
import { withIronSessionApiRoute } from "iron-session/next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { getShareholdersInfo } from "@graphql/subgraph/queries/get-shareholders-info-query";
import { fetcherGraphqlPublic } from "@graphql/subgraph/subgraph-client";

import { sessionOptions } from "@lib/session";
import { getShareholderStatus } from "@lib/shareholders";
import userFactory from "@lib/userFactory";

import { db } from "../../drizzle";
import { shareholders } from "../../schema/shareholders";
import { AuthUser } from "../../types";

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { cookie } = req.session;
  try {
    if (!cookie) throw new Error("No cookie found");
    const payload = jwt.verify(cookie, process.env.JWT_SECRET) as AuthUser;
    const shareholdersInfo = await fetcherGraphqlPublic([getShareholdersInfo, {}]);
    const [user] = await db.query.shareholders.findMany({
      where: eq(shareholders.ethAddress, String(payload.ethAddress)),
    });
    return res.json({
      ...userFactory(payload),
      ...user,
      status: getShareholderStatus(user.ethAddress, shareholdersInfo.daoManager),
    });
  } catch (err) {
    req.session.destroy();
    return res.status(401).json(userFactory({}));
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
