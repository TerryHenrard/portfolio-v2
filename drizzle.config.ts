import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { serverEnv } from "./core/env/server";

export default defineConfig({
  out: "./core/db/migrations",
  schema: "./core/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
