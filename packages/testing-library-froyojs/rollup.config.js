import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: ['src/index.ts', 'src/pure.ts'],
        external: ['@testing-library/dom', 'froyojs'],
        output: {
            dir: 'dist/lib',
            format: 'cjs',
        },
        plugins: [typescript()],
    },
    {
        input: ['src/index.ts', 'src/pure.ts'],
        external: ['@testing-library/dom', 'froyojs'],
        output: {
            dir: 'dist/es',
            format: 'es',
        },
        plugins: [
            typescript({
                target: 'es2020',
                filterRoot: 'src',
                compilerOptions: {
                    declaration: true,
                    declarationDir: 'dist/es/types',
                },
            }),
        ],
    },
];
