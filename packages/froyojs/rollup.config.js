import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/froyojs.js',
            format: 'cjs',
        },
        external: [/@babel\/runtime/, /prop-types/],
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript({
                target: 'es2020',
                filterRoot: 'src',
                compilerOptions: {
                    declaration: true,
                    declarationDir: 'dts',
                },
            }),
            babel({
                babelHelpers: 'runtime',
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/froyojs.mjs',
            format: 'es',
        },
        external: [/@babel\/runtime/, /prop-types/],
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript(),
            babel({
                babelHelpers: 'runtime',
                presets: [['@babel/preset-env', { modules: false }]],
                plugins: ['@babel/plugin-transform-runtime'],
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'bundles/froyojs.js',
            format: 'umd',
            name: 'froyojs',
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript(),
            babel({ babelHelpers: 'bundled' }),
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('development'),
                },
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'bundles/froyojs.min.js',
            format: 'umd',
            name: 'froyojs',
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript(),
            babel({ babelHelpers: 'bundled' }),
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('production'),
                },
            }),
            terser(),
        ],
    },
    {
        input: 'dist/dts/index.d.ts',
        output: [{ file: 'dist/froyojs.d.ts', format: 'es' }],
        plugins: [dts.default()],
    },
];
