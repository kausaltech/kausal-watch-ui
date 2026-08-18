import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

import pathsApolloConfig from './apollo-paths.config.cjs';
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
    Date: 'string',
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

/*
 * Load schemas with the shared loader instead of the default URL loader: it
 * strips directive locations that the backends' graphql-core advertises but
 * our graphql-js version cannot parse.
 */
const schemaLoader = './kausal_common/configs/codegen-schema-loader.cjs';
const watchSchema = {
  [apolloConfig.client.service.url]: { loader: schemaLoader },
};
const pathsSchema = {
  [pathsApolloConfig.client.service.url]: { loader: schemaLoader },
};

const config: CodegenConfig = {
  overwrite: true,

  generates: {
    'src/common/__generated__/possible_types.json': {
      schema: watchSchema,
      documents: watchConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'src/common/__generated__/graphql.ts': {
      schema: watchSchema,
      documents: watchConfigDocs,
      plugins: [
        { add: { content: '/* istanbul ignore file */' } },
        'typescript',
        'typescript-operations',
        {
          add: {
            placement: 'append',
            content:
              "export type { DimensionalNodeMetricFragment } from './paths/graphql';\nexport { ScenarioKind } from './paths/graphql';",
          },
        },
      ],
      config: tsoConfig,
    },
    'src/common/__generated__/paths/possible_types.json': {
      schema: pathsSchema,
      documents: pathsConfigDocs,
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'src/common/__generated__/paths/graphql.ts': {
      schema: pathsSchema,
      documents: pathsConfigDocs,
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    },
    'e2e-tests/__generated__/graphql.ts': {
      schema: watchSchema,
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
