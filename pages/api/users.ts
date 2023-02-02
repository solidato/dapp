// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { getSession } from "@lib/odoo";
import { sessionOptions } from "@lib/session";
import { OdooUser } from "types";
import { USER_FIELDS } from "@lib/constants";

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;

  if (!user?.isLoggedIn) {
    return res.status(401).end();
  }

  const { username, password } = user;
  const session = await getSession(process.env.ODOO_ENDPOINT!, process.env.ODOO_DB_NAME!, username, password);

  const data: OdooUser[] = await session.search("res.users", [], {
    fields: USER_FIELDS[process.env.NEXT_PUBLIC_PROJECT_KEY],
  });

  if (process.env.NEXT_PUBLIC_PROJECT_KEY === "neokingdom") {
    return res.status(200).json(data.map((user) => ({ ...user, image: user.avatar_256 })));
  }

  res.status(200).json(data);
};

export default withIronSessionApiRoute(getUsers, sessionOptions);
