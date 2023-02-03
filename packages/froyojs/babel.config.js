module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    env: {
        es: {
            presets: [
                ['@babel/preset-env', { modules: false }],
                '@babel/preset-typescript',
            ],
            plugins: ['@babel/plugin-transform-runtime'],
        },
        cjs: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-runtime'],
        },
        // test: {
        //     presets: [
        //         '@babel/preset-env',
        //         // ['@babel/preset-env', { targets: { node: 'current' } }],
        //     ],
        // },
    },
};
