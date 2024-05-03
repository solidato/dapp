import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

import { db } from "../../../../drizzle";
import { insertShareholdersSchema, shareholders } from "../../../../schema/shareholders";

const shareholdersRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  if (req.method === "GET") {
    try {
      const results = await db.query.shareholders.findMany({ where: eq(shareholders.id, Number(id)) });
      res.json(results[0]);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  if (req.method === "PUT") {
    try {
      const data = insertShareholdersSchema.partial().parse(req.body);
      const newShareholder = await db
        .update(shareholders)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(shareholders.id, Number(id)))
        .returning();
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
