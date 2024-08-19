const FS_LAYERS = [
  "app",
  "processes",
  "pages",
  "widgets",
  "features",
  "entities",
  "shared",
];

const FS_SEGMENTS = ["ui", "model", "lib", "api", "config", "assets"];

const getLowerLayers = (layer) => FS_LAYERS.slice(FS_LAYERS.indexOf(layer) + 1);
const getUpperLayers = (layer) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));
const FS_SLICED_LAYERS_REG = getUpperLayers("shared").join("|");
const FS_SEGMENTS_REG = [
  ...FS_SEGMENTS,
  ...FS_SEGMENTS.map((seg) => `${seg}.*`),
].join("|");

module.exports = {
  extends: [
    "../base",
    "@feature-sliced/eslint-config/rules/import-order/experimental",
    "@feature-sliced/eslint-config/rules/public-api/lite",
    "@feature-sliced/eslint-config/rules/layers-slices",
  ],
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          /**
           * Allow not segments import from slices
           * @example
           * 'entities/form/ui' // Fail
           * 'entities/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow slices with structure grouping
           * @example
           * 'features/auth/form' // Pass
           */
          `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow not segments import in shared segments
           * @example
           * 'shared/ui/button' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

          /**
           * Allow import from segments in shared
           * @example
           * 'shared/ui' // Pass
           */
          `**/*shared/*(${FS_SEGMENTS_REG})`,

          /** allow global modules */
          `**/node_modules/**`,

          /**
           * allow custom shared segments with _prefix
           */
          `**/*shared/_*`,
          `**/*shared/_*/*`,

          /**
           *  Used for allow import local modules
           * @example
           * './model/something' // Pass
           */
          `./**`,
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        paths: ["src"],
        extensions: [".js", ".ts", ".d.ts", ".vue"],
      },
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },
};
