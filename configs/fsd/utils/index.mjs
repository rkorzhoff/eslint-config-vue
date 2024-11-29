export const isNodeModulesImport = (importSource) => {
    return !importSource.startsWith('.') && !importSource.startsWith('@/')
}
