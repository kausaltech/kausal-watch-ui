import fs from 'node:fs';

import dotenv from 'dotenv';
import type { IGraphQLProject } from 'graphql-config';

dotenv.config({ quiet: true });

export function getLocalSchema() {
  for (const fn of ['graphql.schema', 'schema.graphql']) {
    if (fs.existsSync(fn)) {
      return fn;
    }
  }
  return null;
}

export function getRemoteSchema() {
  return (process.env.WATCH_BACKEND_URL || 'https://api.watch.kausal.tech') + '/v1/graphql/';
}

export function getSchema() {
  return getLocalSchema() ?? getRemoteSchema();
}
const JS = '*.{js,jsx,ts,tsx,mjs}';
const documentDirs = ['src', 'e2e-tests', 'kausal_common/src'];

const config = {
  schema: getSchema(),
  documents: [...documentDirs.map((dir) => `./${dir}/**/${JS}`), './e2e-tests/*.ts'],
  exclude: [`./src/*/paths/**/${JS}`, '**/node_modules/**', '**/__generated__/**'],
} satisfies IGraphQLProject;

export default config;
