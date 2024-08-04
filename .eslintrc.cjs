module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "semi": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
};
