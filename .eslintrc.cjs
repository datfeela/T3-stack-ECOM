/** @type {import("eslint").Linter.Config} */
module.exports = {
    overrides: [
        {
            extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: 'tsconfig.json',
            },
            rules: {
                "prefer-const": "warn",
                "@typescript-eslint/restrict-plus-operands": "warn",
                "@typescript-eslint/ban-ts-comment": "warn",
                "@typescript-eslint/no-floating-promises": "warn",
                "@typescript-eslint/no-unsafe-assignment": "warn",
                "@typescript-eslint/no-misused-promises": "off",
                "@typescript-eslint/restrict-template-expressions": "off",
            }
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
    },
}
