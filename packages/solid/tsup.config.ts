import type { Options } from 'tsup';

export const tsup: Options = {
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['esm', 'cjs'],
    entryPoints: ['src/index.ts'],
    target: 'node12',
};