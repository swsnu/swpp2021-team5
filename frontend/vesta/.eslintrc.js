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
    "react/destructuring-assignment": ['off'],
    "no-unused-vars": "off",
    'max-len': ["error", { "code": 120 }],
    "no-console": "off",
    "no-restricted-syntax": [
        "error",
        {
            "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
            "message": "Unexpected property on console object was called"
        }
    ],
    "comma-dangle": "off",
  
  },
  "parser": "babel-eslint"
};
