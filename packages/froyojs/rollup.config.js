import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';

export default [
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
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify('production'),
                },
            }),
            filesize(),
            terser(),
        ],
    },
];
