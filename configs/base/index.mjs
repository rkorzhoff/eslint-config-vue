import eslintComments from 'eslint-plugin-eslint-comments'
import pluginPromise from 'eslint-plugin-promise'
import sonarjs from 'eslint-plugin-sonarjs'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  pluginPromise.configs['flat/recommended'],
  {
    plugins: {
      eslintComments,
      sonarjs,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      /**
       * It is safe to disable this rule when using TypeScript
       * because TypeScript's compiler enforces this check.
       */
      'no-undef': 'off',
      curly: ['error', 'all'],
      'import/no-named-as-default': 'off',
      'import/extensions': 'off',
      'no-irregular-whitespace': 'off',
      'no-param-reassign': 'off',
      'no-restricted-globals': 'off',
      'no-throw-literal': 'off',
      'arrow-body-style': 'off',
      'implicit-arrow-linebreak': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'function-paren-newline': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'consistent-return': 'off',
      'no-underscore-dangle': 'off',
      indent: 'off',
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      'no-console': 'warn',
      semi: 'off',
      'no-extra-semi': 'off',
      'no-spaced-func': 'off',
      'func-call-spacing': 'off',
      'default-param-last': 'off',

      /**
       * -----------------------|
       *        import          |
       * -----------------------|
       */
      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',

      /**
       * ----------------------------|
       *      @typescript-eslint     |
       * ----------------------------|
       */
      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
      '@typescript-eslint/no-restricted-types': 'error',
      '@typescript-eslint/class-literal-property-style': 'error',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/consistent-indexed-object-style': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/no-confusing-non-null-assertion': 'error',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      /**
       * -----------------------|
       *        sonarjs         |
       * -----------------------|
       */
      // sonarjs Bug Detection https://github.com/SonarSource/eslint-plugin-sonarjs?tab=readme-ov-file#bug-detection-bug
      'sonarjs/cognitive-complexity': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-all-duplicated-branches': 'error',
      'sonarjs/no-element-overwrite': 'error',
      'sonarjs/no-empty-collection': 'error',
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-ignored-return': 'error',
      'sonarjs/no-one-iteration-loop': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/non-existent-operator': 'error',

      //sonarjs Code Smell Detection https://github.com/SonarSource/eslint-plugin-sonarjs?tab=readme-ov-file#code-smell-detection-pig
      'sonarjs/cognitive-complexity': 'error',
      'sonarjs/max-switch-cases': 'error',
      'sonarjs/no-collapsible-if': 'error',
      // "sonarjs/no-duplicate-string": "error",
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-gratuitous-expressions': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-inverted-boolean-check': 'error',
      'sonarjs/no-nested-switch': 'error',
      'sonarjs/no-nested-template-literals': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-redundant-jump': 'error',
      'sonarjs/no-same-line-conditional': 'error',
      'sonarjs/no-small-switch': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/prefer-object-literal': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/prefer-while': 'error',
    },
  },
)
