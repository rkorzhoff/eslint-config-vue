require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
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
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:sonarjs/recommended",
    "eslint:recommended",
    "plugin:vue/vue3-strongly-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },

  plugins: ["vue", "promise", "sonarjs"],

  rules: {
    // default
    curly: ["error", "all"],
    "import/extensions": "off",
    "no-irregular-whitespace": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off",
    "no-throw-literal": "off",
    "arrow-body-style": "off",
    "implicit-arrow-linebreak": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "function-paren-newline": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    indent: "off",
    "no-unused-vars": "off",
    "no-shadow": "off",
    semi: "off",
    "no-extra-semi": "off",
    "no-spaced-func": "off",
    "func-call-spacing": "off",
    "default-param-last": "off",
    "no-restricted-syntax": "off",
    "generator-star-spacing": "off",
    "no-console": "warn",
    eqeqeq: "error",

    //import
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
    // @typescript-eslint
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-explicit-any": ["error"],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
      },
    ],
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/naming-convention": "off",

    // vue
    "vue/html-indent": "off",
    "vue/comma-dangle": "off",
    "vue/attributes-order": "error",
    "vue/max-len": "off",
    "vue/require-v-for-key": "off",
    "vue/valid-v-for": "off",
    "vue/html-button-has-type": "off",
    "vue/multi-word-component-names": "off",
    "vue/block-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],

    // sonarjs
    "sonarjs/no-duplicate-string": "off",
  },

  overrides: [
    {
      files: ["**/*.vue"],
      rules: {
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
    ".helm/*",
    "*.yaml",
    "@types/*",
    "scripts/*",
    "config/*",
    ".eslintrc.cjs",
  ],
};
