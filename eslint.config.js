import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
  // Astro recommended config
  ...eslintPluginAstro.configs.recommended,
  // TypeScript recommended config, scoped to TS files so its parser
  // doesn't override the Astro parser on .astro files.
  ...tseslint.configs.recommended.map((c) => ({
    ...c,
    files: c.files ?? ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  })),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    rules: {
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
