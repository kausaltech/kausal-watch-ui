import { expect, test } from '@playwright/test';

import { PlanContext, getIdentifiersToTest } from '../common/context.ts';

/* A cold route can take a while to answer; these assertions are about headers, not latency. */
const REQUEST_TIMEOUT = 30_000;

const CONSTANT_HEADERS = {
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
};

/*
 * The subresource upgrade is only asked for when the page itself arrived over TLS, so the
 * expected policy depends on the scheme under test: CI serves the production image over HTTP.
 */
const expectedPolicy = (baseURL: string, framed: boolean) => {
  const directives = [
    ...(framed ? [] : ["frame-ancestors 'self'"]),
    ...(baseURL.startsWith('https://') ? ['upgrade-insecure-requests'] : []),
  ];

  return directives.length ? directives.join('; ') : undefined;
};

const testPlan = (planId: string) => {
  const baseURL = PlanContext.getBaseURL(planId);

  test.describe(planId, { annotation: [{ type: 'url', description: baseURL }] }, () => {
    test('page responses carry the security headers', async ({ request }) => {
      const headers = (await request.get(baseURL, { timeout: REQUEST_TIMEOUT })).headers();

      for (const [name, value] of Object.entries(CONSTANT_HEADERS)) {
        expect(headers[name], `${name} on ${baseURL}`).toBe(value);
      }

      expect(headers['x-frame-options'], `x-frame-options on ${baseURL}`).toBe('SAMEORIGIN');
      expect(headers['content-security-policy'], `csp on ${baseURL}`).toBe(
        expectedPolicy(baseURL, false)
      );
    });

    /*
     * Embed views are meant to be framed by third-party sites, so they must not carry the
     * framing headers. The exemption is decided from the rewritten path, which only exists on
     * a real response, so this is the only test that covers it end to end.
     */
    test('embed views stay framable', async ({ request }) => {
      const url = `${baseURL}/embed/v1/actions-recent`;
      const headers = (await request.get(url, { timeout: REQUEST_TIMEOUT })).headers();

      expect(headers['x-frame-options'], `x-frame-options on ${url}`).toBeUndefined();
      expect(headers['content-security-policy'], `csp on ${url}`).toBe(
        expectedPolicy(baseURL, true)
      );
      expect(headers['referrer-policy']).toBe(CONSTANT_HEADERS['referrer-policy']);
    });
  });
};

getIdentifiersToTest().forEach(testPlan);
