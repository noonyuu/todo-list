import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // envから読み込む
  schema: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/query",
  documents: ["src/**/*.{ts,tsx}", "src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
