module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    // typescript関係
    'no-empty-function': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'arrow-parens': 'off',
    'import/extensions': ['off'],
    'no-dupe-class-members': 'off',
    // typescript無関係
    'no-magic-numbers': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-mixed-operators': ['error', { allowSamePrecedence: true }],
    'no-use-before-define': ['error', { variables: false }],
    'class-methods-use-this': 'off',
    // import関連
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/no-named-default': 'off',
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'import/no-useless-path-segments': 'error',
    'import/no-cycle': 'error',
  },
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  globals: {},
}
