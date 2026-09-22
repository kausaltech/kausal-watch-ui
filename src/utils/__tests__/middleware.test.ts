/**
 * @jest-environment node
 */
import type { NextRequest, NextResponse } from 'next/server';

import {
  type PlanFromPlansQuery,
  applySecurityHeaders,
  buildReportOnlyPolicy,
  getParsedLocale,
  rewriteUrl,
} from '../middleware.utils';

const primaryLanguage = 'en-US';
const otherLanguages = ['es-US', 'DOTHRAKI'];
const MOCK_PLAN = {
  id: 'foo',
  identifier: 'foo',
  otherLanguages,
  primaryLanguage,
} as PlanFromPlansQuery;

describe('getParsedLocale', () => {
  it('returns the plan primary language if no match is found in the path', () => {
    expect(getParsedLocale([], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
    expect(getParsedLocale(['fi', 'bar'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
  });

  it('returns the plan primary language if it is found in the path', () => {
    expect(getParsedLocale([primaryLanguage], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
    expect(getParsedLocale([primaryLanguage, 'foo', 'bar'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: false,
    });
  });

  it("returns the plan's other language if it is found in the path", () => {
    expect(getParsedLocale([otherLanguages[0]], MOCK_PLAN)).toMatchObject({
      parsedLocale: otherLanguages[0],
      isCaseInvalid: false,
    });
    expect(getParsedLocale(['foo', otherLanguages[1]], MOCK_PLAN)).toMatchObject({
      parsedLocale: otherLanguages[1],
      isCaseInvalid: false,
    });
  });

  it('returns the plan primary language or other language if a lowercase version is found in the path', () => {
    expect(getParsedLocale(['en-us'], MOCK_PLAN)).toMatchObject({
      parsedLocale: primaryLanguage,
      isCaseInvalid: true,
    });
    expect(getParsedLocale(['plan', 'es-us', 'foo'], MOCK_PLAN)).toMatchObject({
      parsedLocale: 'es-US',
      isCaseInvalid: true,
    });
    expect(getParsedLocale(['dothraki', 'foo'], MOCK_PLAN)).toMatchObject({
      parsedLocale: 'DOTHRAKI',
      isCaseInvalid: true,
    });
  });
});

describe('rewriteUrl', () => {
  const hostUrl = new URL('https://plan.example.com');
  const rewrittenUrl = new URL('https://plan.example.com/root/plan.example.com/en/unpublished');

  function callRewriteUrl(planIdentifier: string | undefined) {
    const request = { nextUrl: { pathname: '/some/path' } } as unknown as NextRequest;
    const response = { headers: new Headers() } as unknown as NextResponse;

    return rewriteUrl(request, response, hostUrl, rewrittenUrl, planIdentifier).headers;
  }

  it('passes the resolved plan identifier and domain on to the RSC Apollo client', () => {
    const headers = callRewriteUrl('test-plan');

    expect(headers.get('x-plan-identifier')).toBe('test-plan');
    expect(headers.get('x-plan-domain')).toBe('plan.example.com');
    expect(headers.get('x-url')).toBe('https://plan.example.com/some/path');
  });

  /*
   * A restricted plan resolves no identifier. Stamping a placeholder would make
   * the RSC Apollo client send it as a cache header, which the backend rejects,
   * so the header is left out and downstream consumers treat it as absent.
   */
  it('leaves out the plan identifier header when no plan identifier was resolved', () => {
    const headers = callRewriteUrl(undefined);

    expect(headers.has('x-plan-identifier')).toBe(false);
    expect(headers.get('x-plan-domain')).toBe('plan.example.com');
  });
});

describe('applySecurityHeaders', () => {
  const hostUrl = new URL('https://plan.example.com');
  const rewrittenUrl = new URL('https://plan.example.com/root/plan.example.com/en/unpublished');

  /*
   * The Auth.js wrapper rebuilds the middleware result with `new Response(body, response)`
   * before returning it, so what reaches the proxy is a native Response, never a NextResponse.
   */
  it('sets the constant security headers on a native Response', () => {
    const { headers } = applySecurityHeaders(new Response(null), '/actions');

    expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
    expect(headers.get('permissions-policy')).toBe(
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
  });

  it('passes through a handler result that is not a response', () => {
    expect(applySecurityHeaders(undefined, '/actions')).toBeUndefined();
  });

  it('denies framing on a normal page', () => {
    const { headers } = applySecurityHeaders(new Response(null), '/actions/1');

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
    expect(headers.get('content-security-policy')).toBe(
      "frame-ancestors 'self'; upgrade-insecure-requests"
    );
  });

  /*
   * Embed views exist to be framed by third-party sites. They are reachable under a plan's
   * base path and with a locale segment, so the embed segment is not always the first one.
   */
  it.each([
    '/embed/v1/actions-recent',
    '/en/embed/v1/actions-recent',
    '/2022/embed/v1/actions-recent',
    '/2022/en/embed/v1/actions-recent',
    '/en/2022/embed/v1/actions-recent',
  ])('leaves framing unrestricted for the embed view at %s', (pathname) => {
    const { headers } = applySecurityHeaders(new Response(null), pathname);

    expect(headers.has('x-frame-options')).toBe(false);
    expect(headers.get('content-security-policy')).toBe('upgrade-insecure-requests');
    expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
  });

  /*
   * Next propagates middleware response headers onto the rewritten request, which is how
   * the RSC layouts read the resolved plan back. Stripping them here would break plan
   * resolution.
   */
  it('leaves the plan headers the rewritten request is resolved from intact', () => {
    const request = { nextUrl: { pathname: '/some/path' } } as unknown as NextRequest;
    const response = rewriteUrl(
      request,
      new Response(null) as unknown as NextResponse,
      hostUrl,
      rewrittenUrl,
      'test-plan'
    );

    const { headers } = applySecurityHeaders(response, '/some/path');

    expect(headers.get('x-plan-identifier')).toBe('test-plan');
    expect(headers.get('x-plan-domain')).toBe('plan.example.com');
    expect(headers.get('x-url')).toBe('https://plan.example.com/some/path');
  });
});

describe('buildReportOnlyPolicy', () => {
  const options = {
    dsn: 'https://publickey@sentry.example.com/42',
    assetPrefix: 'https://cdn.example.com',
    environment: 'production',
    release: 'build-1',
  };

  it('reports to the security endpoint derived from the Sentry DSN', () => {
    const policy = buildReportOnlyPolicy(options)!;
    const reportUri = new URL(/report-uri ([^;]+)/.exec(policy)![1]);

    expect(reportUri.origin).toBe('https://sentry.example.com');
    expect(reportUri.pathname).toBe('/api/42/security/');
    expect(reportUri.searchParams.get('sentry_key')).toBe('publickey');
    expect(reportUri.searchParams.get('sentry_environment')).toBe('production');
    expect(reportUri.searchParams.get('sentry_release')).toBe('build-1');
  });

  /* Reports are posted to Sentry, so its origin has to survive the policy it reports against. */
  it('allows the asset host and the Sentry origin', () => {
    const policy = buildReportOnlyPolicy(options)!;

    expect(/script-src [^;]*https:\/\/cdn\.example\.com/.test(policy)).toBe(true);
    expect(/connect-src [^;]*https:\/\/sentry\.example\.com/.test(policy)).toBe(true);
  });

  it('is left out when no DSN is configured', () => {
    expect(buildReportOnlyPolicy({ ...options, dsn: undefined })).toBeUndefined();
  });
});
