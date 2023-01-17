module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'jest/globals': true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:jest-dom/recommended',
        'plugin:jest/all',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'jest', 'jest-dom'],
    rules: {
        'jest/no-hooks': 'off',
        'jest/prefer-expect-assertions': 'off',
    },
    overrides: [
        {
            files: ['jest-setup.js'],
            rules: {
                'import/no-extraneous-dependencies': 'off',
            },
        },
        {
            files: ['packages/**/*'],
            rules: {
                'react/require-render-return': 'off',
            },
        },
    ],
};
