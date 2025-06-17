import { defineConfig } from 'eslint/config';
import config from 'eslint-prettier-vlaqa';

export default defineConfig([
  {
    ignores: ['eslint.config.mjs', 'prettier.config.mjs'],
    files: ['**/*.ts'],
    extends: [config],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
