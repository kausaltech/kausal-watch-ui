import { defineConfig, globalIgnores } from 'eslint/config';
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
const config: ConfigWithExtends[] = defineConfig(
  getGraphQLProcessorConfig({ jsDirs: ['src'] }),
  getGraphQLDocsConfig(['src']),
  nextConfig,
  nodeConfig,
  storybookConfig,
  getGlobalIgnores(),
  globalIgnores(['kausal_common/**']),
  globalIgnores(['src/embed']),
  globalIgnores(
    ['src/components/paths', 'src/context/paths', 'src/queries/paths', 'src/utils/paths'],
    'no-paths'
  )
);

export default config;
