// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        deps: {
            interopDefault: true,
        },
        setupFiles: ['testSetup.mjs'],
        globals: true,
    },
});
