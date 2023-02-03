module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'prettier',
        'plugin:jest-dom/recommended',
        'plugin:jest/all',
    ],
    plugins: ['@typescript-eslint', 'jest', 'jest-dom'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    rules: {
        'jest/prefer-expect-assertions': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
        },
    ],
};
