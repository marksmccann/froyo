module.exports = {
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: ['@babel/plugin-transform-runtime'],
    env: {
        cjs: {
            presets: [['@babel/preset-env', { modules: 'cjs' }]],
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};
