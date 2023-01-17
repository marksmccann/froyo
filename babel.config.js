module.exports = {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
    env: {
        test: {
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
            plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
        },
    },
};
