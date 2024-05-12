import { sql } from "@vercel/postgres";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "../schema";

export const db = drizzle(sql, { schema });

export const getResolutions = async (columns?: Array<keyof typeof schema.resolutionsTable.$inferSelect>) => {
  if (!columns)
    return db.query.resolutionsTable.findMany({
      where: (resolutions) => eq(resolutions.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
    });

  return db.query.resolutionsTable.findMany({
    columns: {
      hash: !!columns?.includes("hash"),
      title: !!columns?.includes("title"),
      content: !!columns?.includes("content"),
      isRewards: !!columns?.includes("isRewards"),
    },
    where: (resolutions) => eq(resolutions.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
  });
};

export const getResolution = async (hash: string) => {
  return db
    .select()
    .from(schema.resolutionsTable)
    .where(
      and(
        eq(schema.resolutionsTable.hash, hash),
        eq(schema.resolutionsTable.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
      ),
    );
};

type NewResolution = typeof schema.resolutionsTable.$inferInsert;

export const addResolution = async (data: Omit<NewResolution, "id" | "createdAt">) => {
  await db.insert(schema.resolutionsTable).values({
    ...data,
    project: process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato",
  });
};
