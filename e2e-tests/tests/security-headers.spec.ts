import { expect, test } from '@playwright/test';

import { PlanContext, getIdentifiersToTest } from '../common/context.ts';

const PAGE_HEADERS = {
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'x-frame-options': 'SAMEORIGIN',
  'content-security-policy': "frame-ancestors 'self'; upgrade-insecure-requests",
};

const testPlan = (planId: string) => {
  const baseURL = PlanContext.getBaseURL(planId);

  test.describe(planId, { annotation: [{ type: 'url', description: baseURL }] }, () => {
    test('page responses carry the security headers', async ({ request }) => {
      const headers = (await request.get(baseURL)).headers();

      for (const [name, value] of Object.entries(PAGE_HEADERS)) {
        expect(headers[name], `${name} on ${baseURL}`).toBe(value);
      }
    });

    /*
     * Embed views are meant to be framed by third-party sites, so they must not carry the
     * framing headers. They are reachable under a plan's base path too, which is why the
     * proxy matches the embed segment anywhere in the path rather than as a prefix.
     */
    test('embed views stay framable', async ({ request }) => {
      const url = `${baseURL}/embed/v1/actions-recent`;
      const headers = (await request.get(url)).headers();

      expect(headers['x-frame-options'], `x-frame-options on ${url}`).toBeUndefined();
      expect(headers['content-security-policy'], `csp on ${url}`).toBe('upgrade-insecure-requests');
      expect(headers['referrer-policy']).toBe(PAGE_HEADERS['referrer-policy']);
    });
  });
};

getIdentifiersToTest().forEach(testPlan);
