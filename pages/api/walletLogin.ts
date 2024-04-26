import { withIronSessionApiRoute } from "iron-session/next";
import { decodeJwt } from "jose";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { getOdooCookie } from "@lib/getOdooCookie";
import odooClient from "@lib/graphql/odoo";
import { getUserByAddressQuery } from "@lib/graphql/queries/get-user-by-address.query";
import { sessionOptions } from "@lib/session";
import userFactory from "@lib/userFactory";

import { OdooUser } from "../../types";

// import { recoverMessageAddress } from "viem";

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

  if (req.method === "PUT") {
    const { signingToken, address, signature } = req.body as {
      signingToken: string;
      address: string;
      signature: string;
    };
    const password = JSON.stringify({ signing_token: signingToken, signature });
    const pwdB64 = Buffer.from(password, "utf8").toString("base64");
    try {
      const cookie = await getOdooCookie(address.toLowerCase(), pwdB64);
      const data = await odooClient.query(cookie, getUserByAddressQuery, { address: address.toLowerCase() });
      const userData = data.ResUsers[0] as OdooUser;
      const user = userFactory({ ...userData, username: address.toLowerCase(), password: pwdB64, isLoggedIn: true });
      req.session.cookie = cookie;
      req.session.user = user;
      await req.session.save();
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.isBoom) {
        return res.status(error.output.statusCode).json(error.output.payload);
      }
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  }

  if (req.method === "POST") {
    const { signingToken, signature } = req.body;
    console.log("🐞 > req.body:", req.body);
    try {
      const decoded = jwt.verify(signingToken, JWT_SECRET);
      console.log("🐞 > decoded:", decoded);
      const { message } = decoded as { message: string };
      console.log("🐞 > message:", message);
      // const signer = await recoverMessageAddress({ message, signature });
      // console.log('🐞 > signer:', signer);
      // return signer;
    } catch (err) {
      return res.status(409).json({ error: "Invalid signing token" });
    }
  }
};

export default withIronSessionApiRoute(walletLoginRoute, sessionOptions);
