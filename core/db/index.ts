import { drizzle } from "drizzle-orm/neon-http";
import { serverEnv } from "../env/server";

export const db = drizzle(serverEnv.DATABASE_URL);
