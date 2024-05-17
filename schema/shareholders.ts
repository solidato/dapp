import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { customType } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

import { ShareholderStatus } from "../types";

const stringArray = customType<{ data: ShareholderStatus[]; driverData: string; default: true }>({
  dataType() {
    return "text";
  },
  toDriver: (value: ShareholderStatus[]) => {
    const array = Array.isArray(value) ? value : JSON.parse(value);
    return `${array.join(",")}`;
  },
  fromDriver: (value: string) => value.split(",") as ShareholderStatus[],
});

const textToLowercase = customType<{ data: string; notNull: true; driverData: string }>({
  dataType() {
    return "text";
  },
  toDriver: (value: string) => value.toLowerCase(),
});

// SHAREHOLDER SCHEMA
export const shareholders = pgTable(
  "shareholders",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    ethAddress: textToLowercase("ethAddress").notNull(),
    status: stringArray("status"),
    personalIdNumber: text("personalIdNumber"),
    birthdate: text("birthdate"),
    residenceAddress: text("residenceAddress"),
    country: text("country"),
    nationality: text("nationality"),
    phone: text("phone"),
    hourlyRate: text("hourlyRate"),
    avatar: text("avatar"),
    updatedAt: timestamp("updatedAt"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (shareholders) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(shareholders.email),
      ethAddressIdx: uniqueIndex("eth_address_idx").on(shareholders.ethAddress),
    };
  },
);

export type Shareholder = InferSelectModel<typeof shareholders>;
export type NewShareholder = InferInsertModel<typeof shareholders>;

// Zod schema for select and insert
export const selectShareholdersSchema = createSelectSchema(shareholders);
export const insertShareholdersSchema = createInsertSchema(shareholders, {
  ethAddress: () => z.string(),
  email: (schema) => schema.email.email(),
});
export const updateShareholdersSchema = insertShareholdersSchema.pick({
  name: true,
  email: true,
  ethAddress: true,
  avatar: true,
  personalIdNumber: true,
  birthdate: true,
  residenceAddress: true,
  country: true,
  nationality: true,
  phone: true,
  hourlyRate: true,
});
