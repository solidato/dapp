import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

import { db } from "../../drizzle";
import { insertShareholdersSchema, shareholders } from "../../schema/shareholders";

const shareholdersRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const shareholders = await db.query.shareholders.findMany();
      res.json(shareholders);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === "POST") {
    try {
      const shareholder = insertShareholdersSchema.parse(req.body);
      const newShareholder = await db.insert(shareholders).values(shareholder).returning();
      return res.status(200).json(newShareholder);
    } catch (err: any) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: "Validation Error!", errors: err.format() });
      }
      return res.status(500).json({ error: err.message });
    }
  }
};

export default shareholdersRoute;
