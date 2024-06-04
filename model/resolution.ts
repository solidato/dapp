import { sql } from "@vercel/postgres";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "../schema";

export const db = drizzle(sql, { schema });

export const DEFAULT_COLUMNS = ["title", "hash", "isRewards"] as Array<
  keyof typeof schema.resolutionsTable.$inferSelect
>;

export const getResolutions = async (columns?: Array<keyof typeof schema.resolutionsTable.$inferSelect>) => {
  if (!columns || columns.length === 0) {
    const allResolutions = await db.query.resolutionsTable.findMany({
      where: (resolutions) => eq(resolutions.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
    });

    return allResolutions;
  }

  const allResolutions = await db.query.resolutionsTable.findMany({
    columns: {
      hash: !!columns?.includes("hash"),
      title: !!columns?.includes("title"),
      content: !!columns?.includes("content"),
      isRewards: !!columns?.includes("isRewards"),
    },
    where: (resolutions) => eq(resolutions.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
  });

  return allResolutions;
};

export const getResolution = async (hash: string) => {
  const [resolution] = await db
    .select()
    .from(schema.resolutionsTable)
    .where(
      and(
        eq(schema.resolutionsTable.hash, hash),
        eq(schema.resolutionsTable.project, process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato"),
      ),
    );

  return resolution;
};

type NewResolution = typeof schema.resolutionsTable.$inferInsert;

export const addResolution = async (data: Omit<NewResolution, "id" | "createdAt">) => {
  await db.insert(schema.resolutionsTable).values({
    ...data,
    project: process.env.NEXT_PUBLIC_PROJECT_KEY || "solidato",
  });
};
