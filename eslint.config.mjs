import tanstackQuery from "@tanstack/eslint-plugin-query";
import tsPlugin, { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    // Configuration applies to
    files: ['**/*.{js,jsx,ts,tsx}'],

    // Parser & parser options
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      // Defining global variables (for example, browser globals)
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },

    // Defining plugins by dynamically importing them
    plugins: {
      '@typescript-eslint': tsPlugin,
      react,
      'react-hooks': reactHooks,
      '@tanstack/query': tanstackQuery,
    },

    // Merging recommended rules from TypeScript plugin & overriding with custom rules
    rules: {
      ...tsConfigs.recommended.rules,
      'no-unused-vars': 'off',
      'react/display-name': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': [
        1,
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn', // check effect deps
      'react-hooks/rules-of-hooks': 'error', // check rules of hooks
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
];
