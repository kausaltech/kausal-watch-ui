import * as nextJestModule from 'next/jest.js';

import type { Config } from 'jest';

/*
 * `next/jest` wires up the SWC transformer, the CSS/image/font/`server-only`
 * mocks, `.env` loading and the `node_modules`/`.next` ignore patterns for us.
 *
 * Note this file is loaded by Node's native type stripping (as ESM, since the
 * package is `"type": "module"`), so it must stay erasable TypeScript and must
 * not use `require`.
 *
 * `next/jest.js` is CommonJS with no `exports` map, hence the `.js` suffix. Its
 * `module.exports` is the factory itself, but the shipped declarations describe
 * it as an ES default export, so TypeScript resolves the import to the module
 * namespace rather than to something callable. Next ships no ESM-friendly type
 * for this, so describe the small slice of the signature we use.
 */
type NextJest = (options: { dir?: string }) => (config: Config) => () => Promise<Config>;

const nextJest = nextJestModule.default as unknown as NextJest;

const withNextConfig = nextJest({ dir: './' })({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.[jt]s?(x)', '**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    // Path aliases from tsconfig.json (specific before general)
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/kausal_common/src/$1',
  },
});

export default async (): Promise<Config> => {
  const config = await withNextConfig();

  return {
    ...config,
    /*
     * `next/jest` mirrors the Next.js build by leaving `node_modules`
     * untransformed. That doesn't work under Jest: several of our dependencies
     * (next-intl, lodash-es, ...) are ESM-only and Jest's CommonJS module
     * registry can't load them. Custom `transformIgnorePatterns` are appended
     * to the defaults and the patterns are OR'd, so appending can only ever
     * exclude more -- replace the list instead and let SWC transform
     * everything.
     */
    transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  };
};
