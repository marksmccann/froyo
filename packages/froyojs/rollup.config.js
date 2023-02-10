import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';

export default [
    {
        input: 'src/index.js',
        output: {
            file: '../../bundles/froyojs.js',
            format: 'umd',
            name: 'froyojs',
            globals: { crypto: 'crypto' },
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
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
        input: 'src/index.js',
        output: {
            file: '../../bundles/froyojs.min.js',
            format: 'umd',
            name: 'froyojs',
            globals: { crypto: 'crypto' },
        },
        plugins: [
            nodeResolve({ browser: true }),
            commonjs(),
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
];
