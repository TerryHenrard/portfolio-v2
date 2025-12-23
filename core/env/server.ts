import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import "dotenv/config";

export const serverEnv = createEnv({
  server: {
    BLOB_READ_WRITE_TOKEN: z.string(),
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
