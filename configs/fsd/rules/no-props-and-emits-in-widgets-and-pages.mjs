import { LAYERS } from "../utils/constants.mjs";

export default {
    meta: {
        type: 'problem',
        docs: {
            description: 'Запрещает использование defineProps и defineEmits в слоях widgets и pages',
            category: 'Possible Errors',
            recommended: false,
        },
        messages: {
            noPropsEmits: '{{layer}} не могут содержать {{type}}',
        },
    },
    create(context) {
        const filename = context.getFilename();

        const layer = LAYERS.find((layerName) => filename.includes(`/${layerName}/`));

        if (layer === 'widgets' || layer === 'pages') {
            return {
                CallExpression(node) {
                    const callee = node.callee;
                    if (
                        callee.type === 'Identifier' &&
                        (callee.name === 'defineProps' || callee.name === 'defineEmits')
                    ) {
                        context.report({
                            node,
                            messageId: 'noPropsEmits',
                            data: { layer, type: callee.name },
                        });
                    }
                },
            };
        }
        return {};
    },
}
