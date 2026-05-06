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
  dirs: ['kausal_common/configs'],
  files: ['*.ts', '*.js', 'kausal_common/scripts/*.js'],
});
const nextConfig = await getNextEslintConfig(['src', 'kausal_common/src']);
const storybookConfig = await getStorybookConfig([
  'src/**/*.stories.@(ts|tsx|js|jsx)',
  '.storybook/**/*.@(ts|tsx|js|jsx)',
]);
const config: ConfigWithExtends[] = defineConfig(
  getGraphQLProcessorConfig({ jsDirs: ['src', 'kausal_common/src'] }),
  getGraphQLDocsConfig(['src', 'kausal_common/src']),
  nextConfig,
  nodeConfig,
  storybookConfig,
  getGlobalIgnores(),
  globalIgnores(['src/embed']),
  globalIgnores(
    ['src/components/paths', 'src/context/paths', 'src/queries/paths', 'src/utils/paths'],
    'no-paths'
  )
);

export default config;
