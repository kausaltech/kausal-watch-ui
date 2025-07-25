import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

import pathsApolloConfig from './apollo-paths.config';
import apolloConfig from './apollo.config.cjs';

const tsoConfig: TypeScriptDocumentsPluginConfig & TypeScriptPluginConfig = {
  arrayInputCoercion: false,
  mergeFragmentTypes: true,
  onlyOperationTypes: true,
  preResolveTypes: true,
  avoidOptionals: true,
  nonOptionalTypename: true,
  scalars: {
    UUID: 'string',
    RichText: 'string',
    PositiveInt: 'number',
    DateTime: 'string',
    JSONString: 'string',
  },
};

const watchConfigDocs = [
  ...apolloConfig.client.includes.filter((include) => !include.includes('e2e-tests')),
  ...apolloConfig.client.excludes.map((exclude) => `!${exclude}`),
];

const pathsConfigDocs = [
  ...pathsApolloConfig.client.includes,
  ...pathsApolloConfig.client.excludes.map((exclude) => `!${exclude}`),
];

const config: CodegenConfig = {
  overwrite: true,

  generates: {
    'src/common/__generated__/possible_types.json': {
      schema: apolloConfig.client.service.url,
      documents: watchConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'src/common/__generated__/graphql.ts': {
      schema: apolloConfig.client.service.url,
      documents: watchConfigDocs,
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    },
    'src/common/__generated__/paths/possible_types.json': {
      schema: pathsApolloConfig.client.service.url,
      documents: pathsConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'src/common/__generated__/paths/graphql.ts': {
      schema: pathsApolloConfig.client.service.url,
      documents: pathsConfigDocs,
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    },
    'e2e-tests/__generated__/graphql.ts': {
      schema: apolloConfig.client.service.url,
      plugins: ['typescript', 'typescript-operations'],
      config: {
        ...tsoConfig,
        onlyOperationTypes: true,
        useTypeImports: true,
      } satisfies TypeScriptDocumentsPluginConfig,
      documents: ['./e2e-tests/**/*.ts'],
    },
  },
};

export default config;
