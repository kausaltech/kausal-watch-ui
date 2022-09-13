import { CodegenConfig } from '@graphql-codegen/cli';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations'
import apolloConfig from './apollo.config';


const tsoConfig: TypeScriptDocumentsPluginConfig = {
  arrayInputCoercion: false,
  mergeFragmentTypes: true,
}

const config: CodegenConfig = {
  schema: apolloConfig.client.service.url,
  documents: apolloConfig.client.includes,
  generates: {
    'common/__generated__/possible_types.json': {
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    },
    'common/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: tsoConfig,
    }
  },
};

export default config;
