import type { Linter } from 'eslint'

declare const configs: {
  meta: any
  configs: {
    base: Linter.Config
    vue: Linter.Config,
    fsd: Linter.Config
  }
}

export = configs
