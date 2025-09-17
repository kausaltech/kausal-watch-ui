/* eslint-disable react-hooks/rules-of-hooks */
import { test as baseTest } from '@playwright/test';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const istanbulTempDir = process.env.ISTANBUL_TEMP_DIR
  ? path.resolve(process.env.ISTANBUL_TEMP_DIR)
  : path.join(process.cwd(), '.nyc_output');

function generateUUID() {
  return crypto.randomBytes(16).toString('hex');
}

const test = baseTest.extend({
  context: async ({ context }, use) => {
    await context.addInitScript({
      content: `
        window.addEventListener("beforeunload", () =>
          window.collectIstanbulCoverage(JSON.stringify(window.__coverage__)),
        )
      `,
    });
    await fs.promises.mkdir(istanbulTempDir, { recursive: true });
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
      if (coverageJSON)
        fs.writeFileSync(
          path.join(istanbulTempDir, `playwright_coverage_${generateUUID()}.json`),
          coverageJSON
        );
    });
    await use(context);
    for (const page of context.pages()) {
      await page.evaluate(() =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        window.collectIstanbulCoverage(JSON.stringify(window.__coverage__))
      );
    }
  },
});

const expect = test.expect;

export { test, expect };
