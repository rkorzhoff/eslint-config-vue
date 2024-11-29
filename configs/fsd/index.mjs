import tseslint from 'typescript-eslint'
import vue3Config from '../vue-3/index.mjs'
import fsdPlugin from './rules/index.mjs'

export default tseslint.config(...vue3Config, {
  plugins: {
    fsd: fsdPlugin,
  },
  rules: {
    'fsd/layer-imports': 'error',
    'fsd/no-props-and-emits-in-widgets-and-pages': 'error',
    'fsd/no-cross-slice-imports': 'error',
    'fsd/public-api-imports': 'error',
  },
})
