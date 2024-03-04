module.exports = {
  extends: [
    "../base",
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
