import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: '../../bundles/froyojs.js',
            format: 'umd',
            name: 'froyojs',
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
            typescript(),
            babel({ babelHelpers: 'bundled' }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            sourcemap: true,
            file: '../../bundles/froyojs.min.js',
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
            filesize(),
        ],
    },
];
