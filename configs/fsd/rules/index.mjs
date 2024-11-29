import layerImports from './layer-imports.mjs'
import noCrossSliceImports from './no-cross-slice-imports.mjs'
import noPropsInWidgetsAndPages from './no-props-and-emits-in-widgets-and-pages.mjs'
import publicApiImports from './public-api-imports.mjs'

export default {
  rules: {
    'public-api-imports': publicApiImports,
    'no-props-in-widgets-and-pages': noPropsInWidgetsAndPages,
    'layer-imports': layerImports,
    'no-cross-slice-imports': noCrossSliceImports
  },
}
