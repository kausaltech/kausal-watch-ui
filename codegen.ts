import { CodegenConfig } from '@graphql-codegen/cli';
import apolloConfig from './apollo.config';


const config: CodegenConfig = {
  schema: apolloConfig.client.service.url,
  documents: apolloConfig.client.includes,
  generates: {
    'common/__generated__/possible_types.json': {
      plugins: ['fragment-matcher'],
      config: {
        useExplicitTyping: true,
      },
    }
  },
};

export default config;
