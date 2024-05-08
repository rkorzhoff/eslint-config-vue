module.exports = {
  extends: [
    "../base",
    "@feature-sliced/eslint-config/rules/import-order/experimental",
    "@feature-sliced/eslint-config/rules/public-api/lite",
    "@feature-sliced/eslint-config/rules/layers-slices",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        paths: ["src"],
        extensions: [".js", ".ts", ".d.ts", ".vue"],
      },
      typescript: {
        project: "./tsconfig.json",
      },
      alias: {
        map: [["@", path.resolve(__dirname, "./src")]],
        extensions: [".js", ".ts", ".d.ts", ".vue"],
      },
    },
  },
};
