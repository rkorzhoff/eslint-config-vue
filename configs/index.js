'use strict'
import base from './base/index.mjs'
import vue from './vue-3/index.mjs'
import fsd from './fsd/index.mjs'

export default {
    meta: {
        name: 'eslint-config-aurora-vue',
    },
    configs: {
        base,
        vue,
        fsd,
    }
}
