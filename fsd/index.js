const FS_LAYERS = ["app", "pages", "widgets", "features", "entities", "shared"];

const FS_SEGMENTS = ["ui", "model", "lib", "api", "config", "assets"];

module.exports = {
  extends: [
    "../base",
    "@feature-sliced/eslint-config/rules/import-order/experimental",
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
    },
  },
};
