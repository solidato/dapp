import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema/index.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
