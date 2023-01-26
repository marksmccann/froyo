module.exports = {
    env: {
        es: {
            presets: [
                [
                    '@babel/preset-env',
                    { modules: false, ignoreBrowserslistConfig: true },
                ],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
        },
        cjs: {
            presets: [
                ['@babel/preset-env', { ignoreBrowserslistConfig: true }],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
        },
        umd: {
            presets: ['@babel/preset-env'],
            plugins: [],
        },
    },
};
