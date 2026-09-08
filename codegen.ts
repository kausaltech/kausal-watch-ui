import type { CodegenConfig } from '@graphql-codegen/cli';
import type { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import type { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

import pathsApolloConfig from './apollo-paths.config.cjs';
import graphqlConfig from './graphql.config.ts';

const scalars = {
  UUID: 'string',
  RichText: 'string',
  PositiveInt: 'number',
  DateTime: 'string',
  JSONString: 'string',
  JSON: 'Record<string, unknown> | unknown[]',
  Date: 'string',
  PointScalar: 'Record<string, unknown>',
  _Any: 'unknown',
};

const schemaTypesConfig = {
  onlyOperationTypes: true,
  strictScalars: true,
  scalars,
} satisfies TypeScriptPluginConfig;

const tsoConfig = {
  arrayInputCoercion: false,
  avoidOptionals: true,
  enumType: 'native',
  immutableTypes: false,
  mergeFragmentTypes: false,
  nonOptionalTypename: true,
  strictScalars: true,
  extractAllFieldsToTypesCompact: true,
  scalars,
} satisfies TypeScriptDocumentsPluginConfig;

const watchConfigDocs = [
  ...graphqlConfig.documents.filter((include) => !include.includes('e2e-tests')),
  ...graphqlConfig.exclude.map((exclude) => `!${exclude}`),
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
const watchSchema = graphqlConfig.schema.startsWith('http')
  ? {
      [graphqlConfig.schema]: { loader: schemaLoader },
    }
  : graphqlConfig.schema;
const pathsSchema = {
  [pathsApolloConfig.client.service.url]: { loader: schemaLoader },
};

const config: CodegenConfig = {
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
        'typescript-operations',
        {
          add: {
            placement: 'append',
            content:
              "export type { DimensionalNodeMetricFragment } from './paths/graphql';\nexport { ScenarioKind } from './paths/schema';",
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
      plugins: [
        'typescript-operations',
        {
          add: {
            placement: 'append',
            content: "export { ScenarioKind } from './schema';",
          },
        },
      ],
      config: {
        ...tsoConfig,
        importSchemaTypesFrom: './schema',
      } satisfies TypeScriptDocumentsPluginConfig,
    },
    'src/common/__generated__/paths/schema.ts': {
      schema: pathsSchema,
      plugins: ['typescript'],
      config: schemaTypesConfig,
    },
    'e2e-tests/__generated__/graphql.ts': {
      schema: watchSchema,
      plugins: ['typescript-operations'],
      config: {
        ...tsoConfig,
      } satisfies TypeScriptDocumentsPluginConfig,
      documents: ['./e2e-tests/**/*.ts', '!**/node_modules/**', '!**/__generated__/**'],
    },
  },
};

export default config;
