require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  env: {
    node: true,
  },

  extends: [
    "../base",
    "plugin:vue/vue3-essential",
    "@feature-sliced",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
