module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': ['off'],
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "react/destructuring-assignment": ['off']
  },
};
