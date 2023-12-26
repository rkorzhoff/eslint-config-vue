require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:perfectionist/recommended-natural",
    "@vue/eslint-config-airbnb-with-typescript",
    "plugin:sonarjs/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    extraFileExtensions: [".vue"],
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  plugins: [
    "import",
    "vue",
    "eslint-comments",
    "promise",
    "perfectionist",
    "sonarjs",
    "eslint-plugin-tsdoc",
  ],

  rules: {
    // default
    curly: ["error", "all"],
    "import/extensions": "off",
    "no-irregular-whitespace": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off",
    "no-throw-literal": "off",
    "tsdoc/syntax": "warn",
    "arrow-body-style": "off",
    "implicit-arrow-linebreak": "off",

    //import
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": "off",

    // @typescript-eslint
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/no-use-before-define": "off",

    // vue
    "vue/html-indent": "off",
    "vue/comma-dangle": "off",
    "vue/attributes-order": "error",
    "vue/max-len": "off",
    "vue/require-v-for-key": "off",
  },

  overrides: [
    {
      files: ["**/*.vue"],
      rules: {
        "perfectionist/sort-imports": "off",
        "perfectionist/sort-vue-attributes": "off",
        "vue/require-v-for-key": "off",
        "vuejs-accessibility/alt-text": "off",
        "vuejs-accessibility/anchor-has-content": "off",
        "vuejs-accessibility/aria-props": "off",
        "vuejs-accessibility/aria-role": "off",
        "vuejs-accessibility/aria-unsupported-elements": "off",
        "vuejs-accessibility/click-events-have-key-events": "off",
        "vuejs-accessibility/form-control-has-label": "off",
        "vuejs-accessibility/heading-has-content": "off",
        "vuejs-accessibility/iframe-has-title": "off",
        "vuejs-accessibility/interactive-supports-focus": "off",
        "vuejs-accessibility/label-has-for": "off",
        "vuejs-accessibility/media-has-caption": "off",
        "vuejs-accessibility/mouse-events-have-key-events": "off",
        "vuejs-accessibility/no-access-key": "off",
        "vuejs-accessibility/no-autofocus": "off",
        "vuejs-accessibility/no-distracting-elements": "off",
        "vuejs-accessibility/no-onchange": "off",
        "vuejs-accessibility/no-redundant-roles": "off",
        "vuejs-accessibility/no-static-element-interactions": "off",
        "vuejs-accessibility/role-has-requiered-aria-props": "off",
        "vuejs-accessibility/tabindex-no-positive": "off",
      },
    },
  ],
  ignorePatterns: [
    "*.config.*",
    "components.d.ts",
    "auto-imports.d.ts",
    "*.test.*",
    "*.testData.*",
    ".helm/*",
    "*.yaml",
    "@types/*",
    "scripts/*",
    "config/*",
    ".eslintrc.cjs",
  ],
};
