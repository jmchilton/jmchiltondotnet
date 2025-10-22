import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,
  // TypeScript recommended config
  ...tseslint.configs.recommended,
  {
    rules: {
      // Customize rules here
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '.astro/', '*.config.mjs', '*.config.js'],
  },
];
