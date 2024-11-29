import path from 'path'
import { isNodeModulesImport } from '../utils/index.mjs'

export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Запрещает кросс-импорты между слайсами',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            crossSliceImport:
                'Кросс-импорты между слайсами запрещены. Исключения: shared, features и views',
        },
        schema: [],
    },
    create(context) {
        const layersException = ['shared', 'features', 'views'];
        const cwd = context.getCwd();

        function getLayerAndSlice(filePath) {
            const normalizedPath = filePath.replace(/\\/g, '/');
            const pathSegments = normalizedPath.split('/');
            const srcIndex = pathSegments.lastIndexOf('src');
            if (srcIndex !== -1 && pathSegments.length > srcIndex + 2) {
                const layer = pathSegments[srcIndex + 1];
                const slice = pathSegments[srcIndex + 2];
                return { layer, slice };
            }
            return null;
        }

        function resolveImportPath(importSource, currentFilePath) {
            let importFilePath;

            if (importSource.startsWith('@/')) {
                const srcPath = path.resolve(cwd, 'src');
                importFilePath = path.resolve(srcPath, importSource.slice(2));
            } else if (importSource.startsWith('..') || importSource.startsWith('./')) {
                importFilePath = path.resolve(path.dirname(currentFilePath), importSource);
            } else {
                return null;
            }

            return importFilePath;
        }

        return {
            ImportDeclaration(node) {
                const currentFilePath = context.getFilename();
                const importSource = node.source.value;
                if (isNodeModulesImport(importSource)) {
                    return;
                }

                const currentLocation = getLayerAndSlice(currentFilePath);
                if (!currentLocation) {
                    return;
                }

                const { layer: currentLayer, slice: currentSlice } = currentLocation;

                if (layersException.includes(currentLayer)) {
                    return;
                }

                const importFilePath = resolveImportPath(importSource, currentFilePath);

                const importLocation = getLayerAndSlice(importFilePath);
                if (!importLocation) {
                    return;
                }

                const { layer: importLayer, slice: importSlice } = importLocation;

                if (
                    currentLayer === importLayer &&
                    currentSlice !== importSlice
                ) {
                    context.report({
                        node,
                        messageId: 'crossSliceImport',
                    });
                }
            },
        };
    },
};
