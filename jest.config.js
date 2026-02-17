const path = require('path');

/**
 * Replicate the essential config from next/jest without loading next.config.ts,
 * which currently crashes due to kausal_common ESM imports in .js files.
 *
 * Uses Next.js's SWC jest transformer directly.
 */

const nextMocksDir = path.join(path.dirname(require.resolve('next/jest')), 'dist/build/jest');

/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/tests/**/*.test.[jt]s?(x)', '**/__tests__/**/*.test.[jt]s?(x)'],
  moduleNameMapper: {
    // Next.js built-in mocks for CSS, images, fonts
    '^.+\\.module\\.(css|sass|scss)$': require.resolve('next/dist/build/jest/object-proxy.js'),
    '^.+\\.(css|sass|scss)$': require.resolve('next/dist/build/jest/__mocks__/styleMock.js'),
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$':
      require.resolve('next/dist/build/jest/__mocks__/fileMock.js'),
    '^.+\\.(svg)$': require.resolve('next/dist/build/jest/__mocks__/fileMock.js'),
    '@next/font/(.*)': require.resolve('next/dist/build/jest/__mocks__/nextFontMock.js'),
    'next/font/(.*)': require.resolve('next/dist/build/jest/__mocks__/nextFontMock.js'),
    '^server-only$': require.resolve('next/dist/build/jest/__mocks__/empty.js'),

    // Path aliases from tsconfig.json (specific before general)
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/kausal_common/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      require.resolve('next/dist/build/swc/jest-transformer'),
      {
        isEsmProject: false,
        serverComponents: true,
      },
    ],
  },
  transformIgnorePatterns: [
    // Many dependencies ship ESM; let SWC transform everything.
    // Only ignore CSS modules (handled by moduleNameMapper above).
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};
