import { db } from "@/core/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  plugins: [admin(), nextCookies()], //nextCookies() must be the last plugin
  emailAndPassword: { enabled: true },
});
