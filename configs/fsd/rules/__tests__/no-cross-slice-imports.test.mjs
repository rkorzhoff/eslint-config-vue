import { describe } from "vitest";
import { RuleTester } from '@typescript-eslint/rule-tester';
import noCrossSliceImports from "../no-cross-slice-imports.mjs";

const ruleTester = new RuleTester();
describe('no-cross-slice-imports', () => {
    ruleTester.run('no-cross-slice-imports', noCrossSliceImports, {
        valid: [
            // Импорт из того же слайса
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { something } from './utils';
            `,
            },
            // Импорт из слоя shared
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { sharedUtil } from '@/shared/utils';
            `,
            },
            // Импорт из node_modules
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import React from 'react';
            `,
            },
            // Импорт из абсолютного пути, но в пределах того же слайса
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { something } from '@/entities/user/model/anotherModel';
            `,
            },
            // Импорт из другого слоя, который находится в исключениях
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { featureUtil } from '@/features/featureX/utils';
            `,
            },
        ],
        invalid: [
            // Кросс-импорт между слайсами в одном слое
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { orderModel } from '@/entities/order/model/orderModel';
            `,
                errors: [
                    {
                        messageId: 'crossSliceImport',
                    },
                ],
            },
            // Кросс-импорт с относительным путем
            {
                filename: '/project/src/entities/user/model/userModel.js',
                code: `
                import { orderModel } from '../../order/model/orderModel';
            `,
                errors: [
                    {
                        messageId: 'crossSliceImport',
                    },
                ],
            },
            // Кросс-импорт между слайсами в слое widgets
            {
                filename: '/project/src/widgets/widgetA/index.js',
                code: `
                import { widgetBUtil } from '@/widgets/widgetB/utils';
            `,
                errors: [
                    {
                        messageId: 'crossSliceImport',
                    },
                ],
            },
        ],
    });
});
