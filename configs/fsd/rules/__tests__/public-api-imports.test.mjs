import { RuleTester } from '@typescript-eslint/rule-tester';
import publicApiImportsRule from '../public-api-imports.mjs';

const ruleTester = new RuleTester();

describe('public-api-imports', () => {
    ruleTester.run('no-direct-segment-import', publicApiImportsRule, {
        valid: [
            {
                code: "import { themeOverrides } from '../lib/themeOverrides'",
                filename: '/project/src/entities/project/ui/Component.ts',
            },
            {
                code: "import { themeOverrides } from '../lib'",
                filename: '/project/src/entities/project/ui/Component.ts',
            },
            {
                code: "import { themeOverrides } from './lib'",
                filename: '/project/src/entities/project/ui/Component.ts',
            },
            {
                code: "import { themeOverrides } from '../themeOverrides'",
                filename: '/project/src/entities/project/ui/Component.ts',
            },
            {
                code: "import { useCurrentProjectStore } from '@/entities/project'",
                filename: '/project/src/features/featureX/model/model.ts',
            },
            {
                code: "import { themeOverrides } from './themeOverrides'",
                filename: '/project/src/shared/lib/helpers.ts',
            },
            {
                code: "import Component from './Component.vue'",
                filename: '/project/src/entities/project/ui/Component.vue',
            },
            {
                code: "import { Component } from '@/entities/project'",
                filename: '/project/src/features/featureX/ui/FeatureComponent.vue',
            },
            {
                code: "import { Component } from '../ui'",
                filename: '/project/src/entities/project/ui/AnotherComponent.vue',
            },
            {
                code: "import { Component } from './ui'",
                filename: '/project/src/entities/project/index.ts',
            },
        ],
        invalid: [
            {
                code: "import { getUser } from '@/entities/user/model/getUser'",
                filename: '/project/src/features/featureX/model/model.ts',
                errors: [{ messageId: 'noDirectSegmentImport' }],
            },
            {
                code: "import { Button } from '@/entities/user/ui'",
                filename: '/project/src/entities/project/ui/Component.vue',
                errors: [{ messageId: 'noDirectSegmentImport' }],
            },
            {
                code: "import { Button } from '@/entities/user/ui/Component.vue'",
                filename: '/project/src/entities/project/ui/Component.vue',
                errors: [{ messageId: 'noDirectSegmentImport' }],
            },


            {
                code: "import { fetchData } from '@/entities/project/model/fetchData'",
                filename: '/project/src/features/featureX/ui/FeatureComponent.vue',
                errors: [{ messageId: 'noDirectSegmentImport' }],
            },

            {
                code: "import { fetchData } from '../../project/model'",
                filename: '/project/src/features/featureX/ui/FeatureComponent.vue',
                errors: [{ messageId: 'noDirectSegmentImport' }],
            },

        ],
    });

})
