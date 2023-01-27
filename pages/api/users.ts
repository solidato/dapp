// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { getSession } from "@lib/odoo";
import { sessionOptions } from "@lib/session";
import { OdooUser } from "types";

const USER_FIELDS = {
  neokingdom: ["display_name", "email", "ethereum_address", "avatar_256"],
  teledisko: ["display_name", "email", "ethereum_address", "image"],
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.user;
  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  const { username, password } = user;
  const session = await getSession(process.env.ODOO_ENDPOINT!, process.env.ODOO_DB_NAME!, username, password);

  const data: OdooUser[] = await session.search("res.users", [], {
    fields: USER_FIELDS[process.env.PROJECT_KEY],
  });

  if (process.env.PROJECT_KEY === "neokingdom") {
    return res.status(200).json(data.map((d) => ({ ...d, image: d.avatar_256 })));
  }

  res.status(200).json(data);
};

export default withIronSessionApiRoute(getUsers, sessionOptions);
