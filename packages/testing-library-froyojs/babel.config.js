module.exports = {
    env: {
        es: {
            presets: [['@babel/preset-env', { modules: false }]],
            plugins: ['@babel/plugin-transform-runtime'],
        },
        cjs: {
            presets: [['@babel/preset-env', { modules: 'cjs' }]],
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
