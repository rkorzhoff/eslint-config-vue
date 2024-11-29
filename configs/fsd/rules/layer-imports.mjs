import { isNodeModulesImport } from '../utils/index.mjs'
import path from 'path'

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Проверяет направление импорта между слоями согласно методологии Feature-Sliced Design',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      invalidLayerImport:
        'Слой "{{currentLayer}}" не может импортировать слой "{{importedLayer}}". Следуйте направлению слоев shared -> entities -> features -> views -> widgets -> pages -> app',
      invalidImportPath:
        'Импорты должны начинаться с "@/"" или "..", другие импорты запрещены',
    },
    schema: [],
  },
  create(context) {
    const layersOrder = {
      shared: 1,
      entities: 2,
      features: 3,
      views: 4,
      widgets: 5,
      pages: 6,
      app: 7,
    };

    const cwd = context.getCwd();

    function getLayerFromPath(filePath) {
      const normalizedPath = filePath.replace(/\\/g, '/');
      const pathSegments = normalizedPath.split('/');
      const srcIndex = pathSegments.lastIndexOf('src');
      if (srcIndex !== -1 && pathSegments.length > srcIndex + 1) {
        const layer = pathSegments[srcIndex + 1];
        if (layersOrder.hasOwnProperty(layer)) {
          return layer;
        }
      }
      return null;
    }

    function resolveImportPath(importSource, currentFilePath) {
      let importFilePath;

      if (importSource.startsWith('@/')) {
        // Обработка алиаса '@'
        const srcPath = path.resolve(cwd, 'src');
        importFilePath = path.resolve(srcPath, importSource.slice(2));
      } else if (importSource.startsWith('..') || importSource.startsWith('./')) {
        // Обработка относительных путей
        importFilePath = path.resolve(path.dirname(currentFilePath), importSource);
      } else {
        // Запрещенные пути
        return null;
      }

      return importFilePath;
    }

    return {
      ImportDeclaration(node) {
        const currentFilePath = context.getFilename();
        const importSource = node.source.value;
        if (isNodeModulesImport(importSource)) {
          return
        }

        if (
          !importSource.startsWith('@/') &&
          !importSource.startsWith('../') &&
          !importSource.startsWith('./')
        ) {
          context.report({
            node,
            messageId: 'invalidImportPath',
          });
          return;
        }

        const currentLayer = getLayerFromPath(currentFilePath);
        if (!currentLayer) {
          return;
        }

        const importFilePath = resolveImportPath(importSource, currentFilePath);

        if (!importFilePath) {
          context.report({
            node,
            messageId: 'invalidImportPath',
          });
          return;
        }

        const importedLayer = getLayerFromPath(importFilePath);
        if (!importedLayer) {
          return;
        }

        const currentLayerOrder = layersOrder[currentLayer];
        const importedLayerOrder = layersOrder[importedLayer];

        if (importedLayerOrder > currentLayerOrder) {
          context.report({
            node,
            messageId: 'invalidLayerImport',
            data: {
              currentLayer,
              importedLayer,
            },
          });
        }
      },
    };
  },
}
