import { isNodeModulesImport } from '../utils/index.mjs'
import { LAYERS, SEGMENTS } from '../utils/constants.mjs'
import path from 'path'

export default {
    meta: {
        type: 'problem',
        docs: {
            description:
                'Запрещает прямые импорты из сегментов, требуя импорта через публичное API слайса',
            category: 'Best Practices',
            recommended: false,
        },
        messages: {
            noDirectSegmentImport: 'Импорты модулей не через публичное API запрещены',
        },
        schema: [],
    },

    create(context) {

        return {
            ImportDeclaration(node) {
                const importPath = node.source.value;
                const currentFilename = context.getFilename();

                // Применяем правило только к .ts, .js и .vue файлам
                if (!['.ts', '.js', '.vue'].includes(path.extname(currentFilename))) {
                    return;
                }

                // Игнорируем импорты из node_modules
                if (isNodeModulesImport(importPath)) {
                    return;
                }

                // Разрешаем импорты на одном уровне директории
                if (importPath.startsWith('./') || importPath.startsWith('../')) {
                    const resolvedImportPath = path.resolve(path.dirname(currentFilename), importPath);
                    const currentDir = path.dirname(currentFilename);
                    if (path.dirname(resolvedImportPath) === currentDir) {
                        return;
                    }
                }

                // Обработка алиаса '@' для src
                let resolvedImportPath;
                if (importPath.startsWith('@/')) {
                    const projectSrc = path.resolve(context.getCwd(), 'src');
                    resolvedImportPath = path.join(projectSrc, importPath.slice(2));
                } else {
                    // Относительный импорт
                    resolvedImportPath = path.resolve(path.dirname(currentFilename), importPath);
                }

                const importSegments = resolvedImportPath.split(path.sep);

                // Поиск слоя в пути импорта
                const importLayerIndex = importSegments.findIndex((segment) => LAYERS.includes(segment));
                if (importLayerIndex === -1) {
                    // Путь импорта не содержит слой, игнорируем
                    return;
                }

                const importLayer = importSegments[importLayerIndex];

                // Поиск индекса сегмента в пути импорта после слоя
                const importSegmentIndex = importSegments.findIndex(
                    (segment, index) =>
                        index > importLayerIndex && SEGMENTS.includes(segment)
                );

                // Слайс — это все между слоем и сегментом (не включая сегмент)
                const importSlice = importSegments
                    .slice(importLayerIndex + 1, importSegmentIndex > -1 ? importSegmentIndex : undefined)
                    .join('/');

                // Проверяем, есть ли сегмент в пути импорта
                const hasSegment = importSegmentIndex > -1;

                // Разрешаем импорты из 'shared' слоя
                if (importLayer === 'shared') {
                    return;
                }

                // Находим слой и слайс текущего файла
                const currentSegments = currentFilename.split(path.sep);
                const currentLayerIndex = currentSegments.findIndex((segment) =>
                    LAYERS.includes(segment)
                );
                if (currentLayerIndex === -1) {
                    // Текущий файл не находится в известном слое
                    return;
                }
                const currentLayer = currentSegments[currentLayerIndex];

                const currentSegmentIndex = currentSegments.findIndex(
                    (segment, index) =>
                        index > currentLayerIndex && SEGMENTS.includes(segment)
                );

                const currentSlice = currentSegments
                    .slice(currentLayerIndex + 1, currentSegmentIndex > -1 ? currentSegmentIndex : undefined)
                    .join('/');

                // Разрешаем импорты внутри одного слайса
                if (importLayer === currentLayer && importSlice === currentSlice) {
                    return;
                }

                // Разрешаем импорты из публичного API слайса (когда нет сегмента в пути импорта)
                if (!hasSegment) {
                    return;
                }

                // Запрещаем прямые импорты из сегментов
                context.report({
                    node,
                    messageId: 'noDirectSegmentImport',
                });
            },
        };
    },
}
