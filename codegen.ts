import { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

import pathsApolloConfig from './apollo-paths.config';
import apolloConfig from './apollo.config';

const tsoConfig: TypeScriptDocumentsPluginConfig & TypeScriptPluginConfig = {
  arrayInputCoercion: false,
  mergeFragmentTypes: true,
};

const watchConfigDocs = [
  ...apolloConfig.client.includes,
  ...apolloConfig.client.excludes.map((exclude) => `!${exclude}`),
];

const pathsConfigDocs = [
  ...pathsApolloConfig.client.includes,
  ...pathsApolloConfig.client.excludes.map((exclude) => `!${exclude}`),
];

const config: CodegenConfig = {
  overwrite: true,

  generates: {
    'common/__generated__/possible_types.json': {
      schema: apolloConfig.client.service.url,
      documents: watchConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'common/__generated__/graphql.ts': {
      schema: apolloConfig.client.service.url,
      documents: watchConfigDocs,
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    },
    'common/__generated__/paths/possible_types.json': {
      schema: pathsApolloConfig.client.service.url,
      documents: pathsConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'common/__generated__/paths/graphql.ts': {
      schema: pathsApolloConfig.client.service.url,
      documents: pathsConfigDocs,
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    },
  },
};

export default config;
