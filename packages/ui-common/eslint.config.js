// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import { config } from '@repo/eslint-config/react-internal'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,

  // Storybook rules 추가
  {
    files: [
      '**/*.stories.@(ts|tsx|js|jsx|mdx)',
      '.storybook/**/*.{ts,tsx,js,jsx}',
    ],
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
]
