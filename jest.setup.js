// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Set PROJECT_ID so kausal_common/src/env/static.ts doesn't throw
process.env.PROJECT_ID = 'watch-ui';
