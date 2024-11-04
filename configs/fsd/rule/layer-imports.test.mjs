import { RuleTester } from 'eslint'
import rule from './layer-imports.mjs'

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2020,
  },
})

ruleTester.run('layer-imports', rule, {
  valid: [
    {
      code: "import { something } from '@/shared/lib/something'",
      filename: '/project/src/shared/ui/component.js',
    },
    {
      code: "import { something } from '../lib'",
      filename: '/project/src/widgets/project/widget/ui/component.js',
    },
    {
      code: "import { something } from '@/features/feature/'",
      filename: '/project/src/widgets/widget/ui/Component.vue',
    },
    {
      code: "import { something } from '@/features/feature1'",
      filename: '/project/src/features/feature2/ui/Component.vue',
    },
    {
      code: "import { something } from '../ui/card'",
      filename: '/project/src/shared/lib/composable.js',
    },
  ],
  invalid: [
    {
      code: "import { something } from '@/entities/something'",
      filename: '/project/src/shared/ui/Component.vue',
      errors: [{ message: "Нарушение импорта: 'shared' не может импортировать из вышестоящего слоя 'entities'." }],
    },
    {
      code: "import { something } from '@/features/feature1/ui/something'",
      filename: '/project/src/entities/ui/Component.vue',
      errors: [
        { message: 'Нарушение импорта: недопустимо импортировать сегменты другого слоя.' },
        { message: "Нарушение импорта: 'entities' не может импортировать из вышестоящего слоя 'features'." },
      ],
    },
    {
      code: "import { something } from '@/entites/entity/lib'",
      filename: '/project/src/features/ui/Component.vue',
      errors: [{ message: 'Нарушение импорта: недопустимо импортировать сегменты другого слоя.' }],
    },
  ],
})
