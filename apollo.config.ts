import graphqlConfig, { getLocalSchema, getRemoteSchema } from './graphql.config.ts';

const localSchema = getLocalSchema();

const config = {
  client: {
    includes: graphqlConfig.documents,
    excludes: [
      '**/node_modules/**',
      '**/__generated__/**',
      './e2e-tests/tests-out/**',
      './node_modules/**',
    ],
    service: {
      name: 'kausal-watch',
      url: localSchema ? undefined : getRemoteSchema(),
      localSchemaFile: localSchema,
      skipSslValidation: false,
    },
  },
};

export default config;
