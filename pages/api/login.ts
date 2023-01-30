import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { getSession } from "../../lib/odoo";
import { sessionOptions } from "../../lib/session";
import userFactory from "../../lib/userFactory";
import { OdooUser } from "types";
import { USER_FIELDS } from "@lib/constants";

// Login with Odoo
const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).end();
  }

  try {
    const session = await getSession(process.env.ODOO_ENDPOINT!, process.env.ODOO_DB_NAME!, username, password);

    if (session.uid) {
      const odooUserData: OdooUser[] = await session.search("res.users", [["email", "in", [username]]], {
        fields: USER_FIELDS[process.env.PROJECT_KEY],
      });
      const [{ image, avatar_256, ...withoutImage }] = odooUserData; // removing image/avatar as it will make the cookie too big
      const user = userFactory({ uid: session.uid, username, password, isLoggedIn: true, ...withoutImage });
      req.session.user = user;
      await req.session.save();

      return res.status(200).json(user);
    }
    res.status(403).json({});
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
};

export default withIronSessionApiRoute(loginRoute, sessionOptions);
