import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import baseConfig from '../base/index.mjs'
import vuePlugin from 'eslint-plugin-vue'

export default tseslint.config(
  ...baseConfig,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        tsconfigRootDir: './',
        extraFileExtensions: ['.vue'],
        projectService: {
          defaultProject: './tsconfig.app.json',
        },
        allowAutomaticSingleRunInference: false,
        disallowAutomaticSingleRunInference: true,
      },
    },
  },
  {
    plugins: {
      vuePlugin,
    },
    rules: {
      /**
       * ----------------|
       *       Vue       |
       * ----------------|
       */
      'vue/html-indent': 'off',
      'vue/comma-dangle': 'off',
      'vue/attributes-order': 'error',
      'vue/max-len': 'off',
      'vue/require-v-for-key': 'off',
      'vue/valid-v-for': 'off',
      'vue/html-button-has-type': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-template-target-blank': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/prop-name-casing': ['warn', 'camelCase'],
      'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'never',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],

      /**
       * -----------------------|
       *    Vue Accessibility   |
       * -----------------------|
       */
      'vuejs-accessibility/alt-text': 'off',
      'vuejs-accessibility/anchor-has-content': 'off',
      'vuejs-accessibility/aria-props': 'off',
      'vuejs-accessibility/aria-role': 'off',
      'vuejs-accessibility/aria-unsupported-elements': 'off',
      'vuejs-accessibility/click-events-have-key-events': 'off',
      'vuejs-accessibility/form-control-has-label': 'off',
      'vuejs-accessibility/heading-has-content': 'off',
      'vuejs-accessibility/iframe-has-title': 'off',
      'vuejs-accessibility/interactive-supports-focus': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      'vuejs-accessibility/media-has-caption': 'off',
      'vuejs-accessibility/mouse-events-have-key-events': 'off',
      'vuejs-accessibility/no-access-key': 'off',
      'vuejs-accessibility/no-autofocus': 'off',
      'vuejs-accessibility/no-distracting-elements': 'off',
      'vuejs-accessibility/no-onchange': 'off',
      'vuejs-accessibility/no-redundant-roles': 'off',
      'vuejs-accessibility/no-static-element-interactions': 'off',
      'vuejs-accessibility/role-has-requiered-aria-props': 'off',
      'vuejs-accessibility/tabindex-no-positive': 'off',
    },
  },
)
