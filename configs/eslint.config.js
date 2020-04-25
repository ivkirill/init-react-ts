const path = require('path');

const PATH_ROOT = path.resolve(`${__dirname}/../`);

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: `${PATH_ROOT}/tsconfig.json`,
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    'import/resolver': {
      node: {
          extensions: ['.ts', '.d.ts', '.tsx', '.json'],
      },
    },
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'prettier',
  ],
  rules: {
    'lines-between-class-members': ["error", "always", { exceptAfterSingleLine: true }],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    '@typescript-eslint/prefer-regexp-exec': 0,
    'import/no-unresolved': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
