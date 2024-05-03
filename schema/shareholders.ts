import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const shareholders = pgTable(
  "shareholders",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    ethAddress: text("ethAddress").notNull(),
    avatar: text("avatar"),
    updatedAt: timestamp("updatedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (shareholders) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(shareholders.email),
    };
  },
);

export type Shareholder = InferSelectModel<typeof shareholders>;
export type NewShareholder = InferInsertModel<typeof shareholders>;

// Zod schema for select and insert
export const selectShareholdersSchema = createSelectSchema(shareholders);
export const insertShareholdersSchema = createInsertSchema(shareholders, {
  email: (schema) => schema.email.email(),
});
