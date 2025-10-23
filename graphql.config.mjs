import dotenv from 'dotenv';

dotenv.config();

/**
 * @type {import('graphql-config').IGraphQLProject}
 */
const config = {
  schema: (process.env.WATCH_BACKEND_URL || 'https://api.paths.kausal.dev') + '/v1/graphql/',
  documents: ['src/**/*.{ts,tsx,js,jsx}', 'kausal_common/**/*.{ts,tsx,js,jsx}'],
};

export default config;
