import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import drizzle from "eslint-plugin-drizzle";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".content-collections/**",
  ]),
  {
    plugins: {
      drizzle,
    },
    rules: {
      'react/no-unescaped-entities': 'off',
      'drizzle/enforce-delete-with-where': "error",
      'drizzle/enforce-update-with-where': "error"
    },
  },
]);

export default eslintConfig;
