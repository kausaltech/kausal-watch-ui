import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import type { ConfigWithExtends } from 'typescript-eslint';

import {
  getGlobalIgnores,
  getGraphQLDocsConfig,
  getGraphQLProcessorConfig,
  getNextEslintConfig,
  getNodeConfig,
  getStorybookConfig,
} from './kausal_common/configs/eslint.ts';

const nodeConfig = getNodeConfig({
  files: ['*.ts', '*.js'],
});
const nextConfig = await getNextEslintConfig(['src']);
const storybookConfig = await getStorybookConfig([
  'src/**/*.stories.@(ts|tsx|js|jsx)',
  '.storybook/**/*.@(ts|tsx|js|jsx)',
]);
const graphqlConfig = getGraphQLDocsConfig(['src']);
graphqlConfig.rules['@graphql-eslint/selection-set-depth'] = ['error', { maxDepth: 15 }];

const config: ConfigWithExtends[] = defineConfig(
  getGraphQLProcessorConfig({ jsDirs: ['src'] }),
  graphqlConfig,
  nextConfig,
  nodeConfig,
  storybookConfig,
  {
    name: 'typescript-react',
    files: ['src/**/*.@(ts|tsx)'],
    rules: {
      // TypeScript interfaces provide the component prop validation.
      'react/prop-types': 'off',
    },
  },
  {
    name: 'javascript',
    files: ['**/*.@(js|jsx)'],
    rules: {
      // These rules require TypeScript declarations at the value boundary;
      // JavaScript files remain covered by the base, React, and hooks rules.
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    name: 'jest',
    files: ['src/tests/**/*.js'],
    languageOptions: {
      globals: globals.jest,
    },
  },
  getGlobalIgnores(),
  globalIgnores(['kausal_common/**']),
  globalIgnores(['src/embed']),
  globalIgnores(
    ['src/components/paths', 'src/context/paths', 'src/queries/paths', 'src/utils/paths'],
    'no-paths'
  )
);

export default config;
