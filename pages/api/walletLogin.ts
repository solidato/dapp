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
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  if (req.method === "GET") {
    try {
      const message = "Please sign this message to login";
      const payload = { iat: Date.now(), message };
      const signingToken = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ signingToken, message });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }

  if (req.method === "POST") {
    const { signingToken, signature } = req.body;
    try {
      const { message } = jwt.verify(signingToken, process.env.JWT_SECRET) as { message: string };
      const address = await recoverMessageAddress({ message, signature });
      // Check if the signer is in the Database!
      const users = await db.query.shareholders.findMany({ where: eq(shareholders.ethAddress, address) });
      if (!users.length) {
        return res.status(401).json({ error: "User not found" });
      }
      const authUser = userFactory({
        ...users[0],
        isLoggedIn: true,
      });
      const cookie = jwt.sign(authUser, process.env.JWT_SECRET, { expiresIn: "7 days" });
      req.session.cookie = cookie;
      await req.session.save();
      return res.status(200).json(authUser);
    } catch (err) {
      console.log("🐞 >>> Error:", err);
      return res.status(409).json({ error: "Invalid signing token" });
    }
  }
};

export default withIronSessionApiRoute(walletLoginRoute, sessionOptions);
