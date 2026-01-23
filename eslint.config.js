import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import globals from 'globals';

const astroConfigs = astroPlugin.configs?.['flat/recommended'];
const astroConfigArray = astroConfigs
  ? Array.isArray(astroConfigs)
    ? astroConfigs
    : [astroConfigs]
  : [
      {
        files: ['**/*.astro'],
        languageOptions: {
          parser: astroParser,
          parserOptions: {
            parser: tsParser,
            extraFileExtensions: ['.astro'],
            ecmaVersion: 'latest',
            sourceType: 'module',
          },
          globals: {
            ...globals.browser,
            ...globals.node,
          },
        },
        plugins: {
          astro: astroPlugin,
        },
        processor: astroPlugin.processors['.astro'],
        rules: {
          ...(astroPlugin.configs?.recommended?.rules ?? {}),
        },
      },
    ];

const jsRecommendedRules = js.configs.recommended?.rules ?? {};
const tsRecommendedRules = tsPlugin.configs.recommended?.rules ?? {};
const reactRecommendedRules = reactPlugin.configs.recommended?.rules ?? {};
const reactHooksRecommendedRules =
  reactHooksPlugin.configs.recommended?.rules ?? {};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '.lighthouseci/**'],
  },
  ...astroConfigArray,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...jsRecommendedRules,
      ...tsRecommendedRules,
      ...reactRecommendedRules,
      ...reactHooksRecommendedRules,
      'no-undef': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
