// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";

const login = (req: NextApiRequest, res: NextApiResponse) => {
  // Login with Odoo
  res.status(200).json({ name: "Login Odoo" });
};

export default login;
