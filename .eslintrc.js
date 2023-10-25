module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: ['plugin:react/recommended'],
  "extends": "next",
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    // add rules
    semi: 2,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'off',
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      // Set React version
      pragma: 'React',
      version: 'detect',
    },
  },
};
