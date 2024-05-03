// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { getTagsQuery } from "@lib/graphql/queries/get-tags.query";
import { sessionOptions } from "@lib/session";

const getTags = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  // const data = await odooGraphQLClient.query(cookie, getTagsQuery, { userId: user.id });
  res.status(200).json([]);
};

export default withIronSessionApiRoute(getTags, sessionOptions);
