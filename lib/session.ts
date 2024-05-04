import type { IronSessionOptions } from "iron-session";

import { AuthUser } from "../types";

// Typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: AuthUser;
    cookie?: string;
  }
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    secure: process.env.NODE_ENV === "production",
  },
};
