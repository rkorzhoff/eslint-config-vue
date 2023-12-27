module.exports = {
  extends: [
    "../vue-3",
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
