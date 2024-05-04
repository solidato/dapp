import { eq } from "drizzle-orm";
import { withIronSessionApiRoute } from "iron-session/next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { recoverMessageAddress } from "viem";

import { sessionOptions } from "@lib/session";
import userFactory from "@lib/userFactory";

import { db } from "../../drizzle";
import { shareholders } from "../../schema/shareholders";

// Login with Wallet
const walletLoginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

  if (req.method === "GET") {
    try {
      const message = "Please sign this message to login";
      const payload = { iat: Date.now(), message };
      const signingToken = jwt.sign(payload, JWT_SECRET);
      res.json({ signingToken, message });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }

  if (req.method === "POST") {
    const { signingToken, signature } = req.body;
    try {
      const { message } = jwt.verify(signingToken, JWT_SECRET) as { message: string };
      const address = await recoverMessageAddress({ message, signature });
      // Check if the signer is in the Database!
      const results = await db.query.shareholders.findMany({ where: eq(shareholders.ethAddress, address) });
      if (!results.length) {
        return res.status(401).json({ error: "User not found" });
      }
      const user = results[0];
      const authUser = userFactory({
        ...user,
        isLoggedIn: true,
      });
      const cookie = jwt.sign({ sub: address }, JWT_SECRET);
      req.session.cookie = cookie;
      req.session.user = authUser;
      await req.session.save();
      return res.status(200).json(user);
    } catch (err) {
      return res.status(409).json({ error: "Invalid signing token" });
    }
  }
};

export default withIronSessionApiRoute(walletLoginRoute, sessionOptions);
