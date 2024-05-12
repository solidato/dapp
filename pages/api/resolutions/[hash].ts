import { withIronSessionApiRoute } from "iron-session/next";
import { getResolution } from "model/resolution";
import { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "@lib/session";

async function getResolutionFromHash(req: NextApiRequest, res: NextApiResponse) {
  const cookie = req.session.cookie;
  const user = req.session.user;
  if (!(cookie && user)) {
    return res.status(401).end();
  }

  try {
    const [existingResolution] = await getResolution(req.query.hash as string);

    if (!existingResolution) {
      return res.status(404).end();
    }

    return res.status(200).json(existingResolution);
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}

export default withIronSessionApiRoute(getResolutionFromHash, sessionOptions);
