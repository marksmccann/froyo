module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:jest-dom/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'jest-dom'],
    rules: {},
    overrides: [
        {
            files: ['jest-setup.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
    ],
};
