import { describe } from "vitest";
import { RuleTester } from '@typescript-eslint/rule-tester';
import layerImports from "../layer-imports.mjs";

const ruleTester = new RuleTester();
describe('layer-imports', () => {
    ruleTester.run('layer-imports', layerImports, {
        valid: [
            // Импорт из более низкого слоя в более высокий
            {
                filename: '/project/src/features/featureX/index.js',
                code: `import { Entity } from '@/entities/entityY';`,
            },
            // Импорт внутри одного слоя
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { EntityY } from './entityY';`,
            },
            // Импорт из shared слоя
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { SharedUtil } from '@/shared/utils';`,
            },
            // Импорт из node_modules
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { ref } from 'vue';`,
            },
            // Разрешенные пути импорта
            {
                filename: '/project/src/features/featureX/index.js',
                code: `
                    import { something } from '@/shared/something';
                    import { anotherThing } from '../entities/entityX';
                `,
            },
        ],
        invalid: [
            // Импорт из более высокого слоя в более низкий
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { FeatureY } from '@/features/featureY';`,
                errors: [
                    {
                        messageId: 'invalidLayerImport',
                        data: {
                            currentLayer: 'entities',
                            importedLayer: 'features',
                        },
                    },
                ],
            },
            // Импорт из app слоя в любой другой
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { AppComponent } from '@/app/component';`,
                errors: [
                    {
                        messageId: 'invalidLayerImport',
                        data: {
                            currentLayer: 'entities',
                            importedLayer: 'app',
                        },
                    },
                ],
            },
            // Импорт из widgets слоя в features
            {
                filename: '/project/src/features/featureX/index.js',
                code: `import { Widget } from '@/widgets/widgetY';`,
                errors: [
                    {
                        messageId: 'invalidLayerImport',
                        data: {
                            currentLayer: 'features',
                            importedLayer: 'widgets',
                        },
                    },
                ],
            },
            // Импорт из pages слоя в entities
            {
                filename: '/project/src/entities/entityX/index.js',
                code: `import { PageComponent } from '@/pages/pageY';`,
                errors: [
                    {
                        messageId: 'invalidLayerImport',
                        data: {
                            currentLayer: 'entities',
                            importedLayer: 'pages',
                        },
                    },
                ],
            },

        ],
    });
});
