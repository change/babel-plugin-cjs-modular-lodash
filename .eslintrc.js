module.exports = {
  plugins: ['prettier'],

  extends: ['change-base', 'prettier'],

  globals: {
    expect: true,
    jest: true,
  },

  rules: {
    'prettier/prettier': ['error'],

    // **************************************************
    // Approved deviations from styleguide
    // **************************************************

    // The `as-needed` option requires function expressions to have a name only
    // if the name cannot be assigned automatically in an ES6 environment.
    'func-names': ['error', 'as-needed'],

    // Increased max line length
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    // Only tolerate devDependencies being loaded in these files/dirs:
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/__tests__/*.js',
        ],
        optionalDependencies: false,
      },
    ],

    'import/no-unresolved': [
      'error',
      {
        caseSensitive: true,
        commonjs: true,
      },
    ],

    // Too disruptive to introduce to an existing codebase, also not sure how desirable it is
    // (testing it in react-fe)
    // 'prefer-destructuring': 'off',

    // Disable until we can enforce
    // 'global-require': 'off', // 711 violations
    // 'prefer-rest-params': 'off', // 332 violations
    // 'import/newline-after-import': 'off', // 380 violations
    // 'promise/always-return': 'off', // 451 violations
  },

  settings: {
    'import/extensions': ['.js'],
  },
};
