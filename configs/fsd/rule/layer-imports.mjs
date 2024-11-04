import path from 'node:path'
import { LAYERS, SEGMENTS } from './constants.mjs'

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce FSD layer import hierarchy',
      category: 'Best Practices',
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value

        const currentFilePath = context.getFilename()
        const currentLayer = LAYERS.find((layer) => currentFilePath.includes(`${path.sep}${layer}${path.sep}`))
        const importLayer = LAYERS.find((layer) => importPath.includes(`/${layer}/`))

        const foreignSegment = SEGMENTS.find((segment) => importPath.includes(`/${segment}`))
        const isImportFromForeignSegment = importLayer !== 'shared' && importLayer !== currentLayer && foreignSegment

        if (isImportFromForeignSegment) {
          context.report({
            node,
            message: `Нарушение импорта: недопустимо импортировать сегменты другого слоя.`,
          })
        }

        if (!currentLayer || !importLayer) return

        if (currentLayer === 'features' && importLayer === 'features') {
          return
        }

        const currentLayerIndex = LAYERS.indexOf(currentLayer)
        const importLayerIndex = LAYERS.indexOf(importLayer)

        if (importLayerIndex > currentLayerIndex) {
          context.report({
            node,
            message: `Нарушение импорта: '${currentLayer}' не может импортировать из вышестоящего слоя '${importLayer}'.`,
          })
        }
      },
    }
  },
}
