import * as test from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';
import noPropsInWidgetsAndPages from '../no-props-and-emits-in-widgets-and-pages.mjs';
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
const ruleTester = new RuleTester({
    languageOptions: {
        parser: vueParser,
        parserOptions: {
            parser: tsParser,
            sourceType: 'module',
            tsconfigRootDir: './',
            extraFileExtensions: ['.vue'],
            allowAutomaticSingleRunInference: false,
            disallowAutomaticSingleRunInference: true,
        },
    },
},);

describe('no-props-in-widgets-and-pages', () => {
    ruleTester.run('no-props-in-widgets-and-pages', noPropsInWidgetsAndPages, {
        valid: [
            // Код в других слоях, где использование defineProps и defineEmits разрешено
            {
                filename: '/project/src/shared/component.vue',
                code: `
                <script setup lang="ts">
                const props = defineProps<{}>();
                const emit = defineEmits<['click']>();
                </script>
            `,
            },
            {
                filename: '/project/src/entities/component.vue',
                code: `
                <script setup lang="ts">
                const props = defineProps<{}>();
                </script>
            `,
            },
            // Код в слоях widgets и pages без использования defineProps и defineEmits
            {
                filename: '/project/src/widgets/component.vue',
                code: `
                <script setup lang="ts">
                import { ref } from 'vue';
                const data = ref(0);
                </script>
            `,
            },
            {
                filename: '/project/src/pages/component.vue',
                code: `
                <script setup lang="ts">
                import { ref } from 'vue';
                const data = ref(0);
                </script>
            `,
            },
        ],
        invalid: [
            // Использование defineProps в слое widgets
            {
                filename: '/project/src/widgets/component.vue',
                code: `
                <script setup lang="ts">
                const props = defineProps<{}>();
                </script>
            `,
                errors: [
                    {
                        messageId: 'noPropsEmits',
                        data: { layer: 'widgets', type: 'defineProps' },
                    },
                ],
            },
            // Использование defineEmits в слое pages
            {
                filename: '/project/src/pages/component.vue',
                code: `
                <script setup lang="ts">
                const emit = defineEmits<['click']>();
                </script>
            `,
                errors: [
                    {
                        messageId: 'noPropsEmits',
                        data: { layer: 'pages', type: 'defineEmits' },
                    },
                ],
            },
            // Одновременное использование defineProps и defineEmits в слое widgets
            {
                filename: '/project/src/widgets/component.vue',
                code: `
                <script setup lang="ts">
                const props = defineProps<{}>();
                const emit = defineEmits<['submit']>();
                </script>
            `,
                errors: [
                    {
                        messageId: 'noPropsEmits',
                        data: { layer: 'widgets', type: 'defineProps' },
                    },
                    {
                        messageId: 'noPropsEmits',
                        data: { layer: 'widgets', type: 'defineEmits' },
                    },
                ],
            },
        ],
    });
});
