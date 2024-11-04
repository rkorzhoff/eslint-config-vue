import tseslint from 'typescript-eslint'
import vue3Config from '../vue-3/index.mjs'
import fsdPlugin from './rule/index.mjs'

export default tseslint.config(...vue3Config, {
  plugins: {
    fsd: fsdPlugin,
  },
  rules: {
    'fsd/layer-imports': 'error',
  },
})
