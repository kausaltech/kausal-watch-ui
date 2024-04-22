import { CodegenConfig } from '@graphql-codegen/cli';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';
import apolloConfig from './apollo.config';

const tsoConfig: TypeScriptDocumentsPluginConfig = {
  arrayInputCoercion: false,
  mergeFragmentTypes: true,
};

const generatedExclude = '!**/__generated__/**';

const apolloConfigDocs = [...apolloConfig.client.includes, generatedExclude];

const config: CodegenConfig = {
  schema: apolloConfig.client.service.url,
  generates: {
    'common/__generated__/possible_types.json': {
      plugins: ['fragment-matcher'],
      documents: apolloConfigDocs,
      config: {
        useExplicitTyping: true,
      },
    },
    'common/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      documents: apolloConfigDocs,
      config: tsoConfig,
    },
    'e2e-tests/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        onlyOperationTypes: true,
      },
      documents: ['e2e-tests/**/*.ts', generatedExclude],
    },
  },
};

export default config;
