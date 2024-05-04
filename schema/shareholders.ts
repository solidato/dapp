import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { customType } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { ShareholderStatus } from "../types";

const stringArray = customType<{ data: ShareholderStatus[]; driverData: string; default: true }>({
  dataType() {
    return "text";
  },
  toDriver: (value: ShareholderStatus[]) => `${(value || []).join(",")}`,
  fromDriver: (value: string) => value.split(",") as ShareholderStatus[],
});

export const shareholders = pgTable(
  "shareholders",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    ethAddress: text("ethAddress").notNull(),
    status: stringArray("status"),
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
