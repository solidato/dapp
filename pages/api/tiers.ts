// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getTiersQuery } from "@lib/graphql/queries/get-tiers.query";
import { sessionOptions } from "@lib/session";

const getTiers = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  // const data = await odooGraphQLClient.query(cookie, getTiersQuery, { userId: user.id });
  res.status(200).json([]);
};

export default withIronSessionApiRoute(getTiers, sessionOptions);
