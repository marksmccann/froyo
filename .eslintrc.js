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
        'jest/max-expects': 'off',
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
                'react/prefer-stateless-function': 'off',
                'react/no-unused-class-component-methods': 'off',
                'react/sort-comp': 'off',
            },
        },
    ],
};
