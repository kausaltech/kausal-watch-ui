/**
 * @jest-environment node
 */
import type { NextRequest, NextResponse } from 'next/server';

import { PlanDomainStatus } from '@/common/__generated__/graphql';

import type * as MiddlewareUtilsModule from '../middleware.utils';
import {
  type PlanFromPlansQuery,
  applySecurityHeaders,
  buildReportOnlyPolicy,
  getDomainStatus,
  getLocaleAndPlan,
  getParsedLocale,
  isPlanAvailable,
  resolveStalePlan,
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
  const secureRequest = {
    headers: new Headers({ 'x-forwarded-proto': 'https' }),
    nextUrl: { protocol: 'http:' },
  } as unknown as NextRequest;

  const insecureRequest = {
    headers: new Headers(),
    nextUrl: { protocol: 'http:' },
  } as unknown as NextRequest;

  const rewrittenTo = (path: string) => {
    const response = new Response(null);
    response.headers.set('x-middleware-rewrite', path);

    return response;
  };

  /*
   * The Auth.js wrapper rebuilds the middleware result with `new Response(body, response)`
   * before returning it, so what reaches the proxy is a native Response, never a NextResponse.
   */
  it('sets the constant security headers on a native Response', () => {
    const { headers } = applySecurityHeaders(new Response(null), secureRequest);

    expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
    expect(headers.get('permissions-policy')).toBe(
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
  });

  it('passes through a handler result that is not a response', () => {
    expect(applySecurityHeaders(undefined, secureRequest)).toBeUndefined();
  });

  /*
   * The exemption is decided from the rewritten path, because only there have the plan's base
   * path and the locale been stripped. An incoming path cannot distinguish an embed view from
   * a content page whose slug happens to be `embed`, since both go through a catch-all route.
   */
  it.each([
    ['/root/plan.example.com/fi/plan/embed/v1/actions-recent', 'an embed view'],
    ['/root/plan.example.com/fi/plan/embed/v2/actions-recent', 'a future embed version'],
  ])('leaves framing unrestricted for %s (%s)', (rewrite) => {
    const { headers } = applySecurityHeaders(rewrittenTo(rewrite), secureRequest);

    expect(headers.has('x-frame-options')).toBe(false);
    expect(headers.get('content-security-policy')).toBe('upgrade-insecure-requests');
    expect(headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
  });

  it.each([
    ['/root/plan.example.com/fi/plan/actions/1', 'a normal page'],
    [
      '/root/plan.example.com/fi/plan/resources/embed/v1/guidance',
      'a content page nested under embed',
    ],
    ['/root/plan.example.com/fi/plan/v1/foo', 'content on a tenant whose base path is embed'],
    ['/root/plan.example.com/fi/plan/en/embed/v1/x', 'an unsupported locale position'],
    ['/404', 'a rewrite with no plan path'],
  ])('denies framing for %s (%s)', (rewrite) => {
    const { headers } = applySecurityHeaders(rewrittenTo(rewrite), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
    expect(headers.get('content-security-policy')).toContain("frame-ancestors 'self'");
  });

  it('denies framing when nothing was rewritten', () => {
    const { headers } = applySecurityHeaders(new Response(null), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
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

    const { headers } = applySecurityHeaders(response, secureRequest);

    expect(headers.get('x-plan-identifier')).toBe('test-plan');
    expect(headers.get('x-plan-domain')).toBe('plan.example.com');
    expect(headers.get('x-url')).toBe('https://plan.example.com/some/path');
  });
});

describe('buildReportOnlyPolicy', () => {
  const options = {
    dsn: 'https://publickey@sentry.example.com/42',
    assetPrefix: 'https://cdn.example.com',
    backendUrl: 'https://api.backend.example.com',
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

  /* A self-hosted Sentry can live under a path prefix: the project id is the last segment. */
  it('keeps a path prefix out of the project id', () => {
    const policy = buildReportOnlyPolicy({
      ...options,
      dsn: 'https://publickey@example.com/sentry/42',
    })!;
    const reportUri = new URL(/report-uri ([^;]+)/.exec(policy)![1]);

    expect(reportUri.pathname).toBe('/sentry/api/42/security/');
  });

  /* Mapbox GL starts its worker from a blob: URL, which would otherwise report on every map. */
  /* Several themes import their webfonts from Adobe Typekit in the theme CSS. */
  it('allows the theme webfont hosts', () => {
    const policy = buildReportOnlyPolicy(options)!;

    expect(/style-src [^;]*https:\/\/use\.typekit\.net/.test(policy)).toBe(true);
    expect(/style-src [^;]*https:\/\/p\.typekit\.net/.test(policy)).toBe(true);
    expect(/font-src [^;]*https:\/\/use\.typekit\.net/.test(policy)).toBe(true);
  });

  /* The cartography block renders with Mapbox GL, which fetches styles, tiles and glyphs. */
  it('allows the map host', () => {
    const policy = buildReportOnlyPolicy(options)!;

    expect(/connect-src [^;]*https:\/\/api\.mapbox\.com/.test(policy)).toBe(true);
  });

  /* Our own Matomo, which most plans report to. */
  it('allows the analytics host', () => {
    const policy = buildReportOnlyPolicy(options)!;

    expect(/script-src [^;]*https:\/\/ana\.kausal\.tech/.test(policy)).toBe(true);
    expect(/connect-src [^;]*https:\/\/ana\.kausal\.tech/.test(policy)).toBe(true);
  });

  /* Themes reference webfonts uploaded as documents on the backend, which differs per region. */
  it('allows the backend origin the deployment points at', () => {
    const policy = buildReportOnlyPolicy(options)!;

    expect(/font-src [^;]*https:\/\/api\.backend\.example\.com/.test(policy)).toBe(true);
    expect(/connect-src [^;]*https:\/\/api\.backend\.example\.com/.test(policy)).toBe(true);
  });

  it('leaves the backend out when it is not configured', () => {
    const policy = buildReportOnlyPolicy({ ...options, backendUrl: '' })!;

    expect(policy).not.toContain('api.backend.example.com');
  });

  it('allows blob workers', () => {
    expect(buildReportOnlyPolicy(options)).toContain("worker-src 'self' blob:");
  });

  /*
   * CI drives synthetic traffic over seeded data, so its violations say nothing about real
   * sites, and reporting them would bury the traffic we actually want to learn from.
   */
  it('is left out in CI', () => {
    expect(buildReportOnlyPolicy({ ...options, environment: 'ci' })).toBeUndefined();
  });

  it('is left out when no DSN is configured', () => {
    expect(buildReportOnlyPolicy({ ...options, dsn: undefined })).toBeUndefined();
  });
});

describe('applySecurityHeaders over plain HTTP', () => {
  /*
   * The production image is served over HTTP in the e2e workflow, so the upgrade has to key
   * on how the request arrived rather than on how the bundle was built.
   */
  const insecureRequest = {
    headers: new Headers(),
    nextUrl: { protocol: 'http:' },
  } as unknown as NextRequest;

  it('does not ask the browser to upgrade subresources', () => {
    const { headers } = applySecurityHeaders(new Response(null), insecureRequest);

    expect(headers.get('content-security-policy')).toBe("frame-ancestors 'self'");
  });

  it('still upgrades when the edge terminated TLS', () => {
    const secureRequest = {
      headers: new Headers({ 'x-forwarded-proto': 'https' }),
      nextUrl: { protocol: 'http:' },
    } as unknown as NextRequest;
    const { headers } = applySecurityHeaders(new Response(null), secureRequest);

    expect(headers.get('content-security-policy')).toBe(
      "frame-ancestors 'self'; upgrade-insecure-requests"
    );
  });
});

describe('domain status', () => {
  const planWithStatus = (status: PlanDomainStatus | null) =>
    ({ ...MOCK_PLAN, domain: { status } }) as PlanFromPlansQuery;

  it.each([
    [PlanDomainStatus.Available, true],
    [PlanDomainStatus.Unavailable, false],
    [PlanDomainStatus.SignInRequired, false],
  ])('serves the site only when the backend says %s', (status, expected) => {
    expect(isPlanAvailable(planWithStatus(status))).toBe(expected);
  });

  describe('a backend that predates the surface-status vocabulary', () => {
    // Deploying the UI before the backend must not darken every site. The old values come from
    // the PublicationStatus enum the field used to carry.
    const legacy = (status: string, typename: 'Plan' | 'RestrictedPlanNode') =>
      ({ ...MOCK_PLAN, __typename: typename, domain: { status } }) as unknown as PlanFromPlansQuery;

    it.each(['PUBLISHED', 'UNPUBLISHED', 'SCHEDULED'])(
      'falls back to __typename when the status is %s',
      (status) => {
        expect(isPlanAvailable(legacy(status, 'Plan'))).toBe(true);
        expect(isPlanAvailable(legacy(status, 'RestrictedPlanNode'))).toBe(false);
      }
    );

    it('still offers a way in for a restricted plan', () => {
      // The old backend cannot say whether signing in would help, and it offered a link by
      // default, so stranding someone who has access would be the worse guess.
      expect(getDomainStatus(legacy('UNPUBLISHED', 'RestrictedPlanNode'))).toBe(
        PlanDomainStatus.SignInRequired
      );
    });
  });

  it('treats a missing status as whatever __typename says', () => {
    // The field is nullable in the schema, and a plan reached without a hostname has no domain.
    // Every plan from this query carries a __typename, so that is what decides.
    const served = { ...MOCK_PLAN, __typename: 'Plan' } as PlanFromPlansQuery;
    expect(getDomainStatus(served)).toBe(PlanDomainStatus.Available);
    expect(isPlanAvailable({ ...served, domain: { status: null } } as PlanFromPlansQuery)).toBe(
      true
    );
  });
});

describe('resolveStalePlan', () => {
  const restricted = (status: PlanDomainStatus, statusMessage: string | null = null) =>
    ({
      __typename: 'RestrictedPlanNode',
      primaryLanguage,
      statusMessage: null,
      domain: { status, statusMessage, basePath: null },
      domains: [{ basePath: null }],
    }) as unknown as PlanFromPlansQuery;

  it('names the placeholder the proxy would have rewritten to', () => {
    expect(resolveStalePlan('/', [restricted(PlanDomainStatus.SignInRequired, 'Soon')])).toEqual({
      kind: 'unavailable',
      status: PlanDomainStatus.SignInRequired,
      message: 'Soon',
    });
  });

  it('leaves no message when the backend gives none', () => {
    expect(resolveStalePlan('/', [restricted(PlanDomainStatus.Unavailable)])).toEqual({
      kind: 'unavailable',
      status: PlanDomainStatus.Unavailable,
      message: undefined,
    });
  });

  it('reports a hostname that no longer resolves a plan', () => {
    expect(resolveStalePlan('/', [])).toEqual({ kind: 'not-found' });
  });

  it('reports a plan the backend still serves, which a fresh lookup cannot explain', () => {
    const available = {
      ...MOCK_PLAN,
      __typename: 'Plan',
      domain: { status: PlanDomainStatus.Available, basePath: null },
      domains: [{ basePath: null }],
    } as unknown as PlanFromPlansQuery;

    expect(resolveStalePlan('/', [available])).toEqual({ kind: 'available' });
  });
});

describe('hostname plan cache', () => {
  /*
   * The proxy and the pages are bundled separately, so each gets its own copy of this module.
   * A page evicting a stale entry only helps if both copies hold the same cache.
   */
  it('is shared between separately loaded copies of the module', () => {
    let proxyCopy: typeof MiddlewareUtilsModule | undefined;
    let pageCopy: typeof MiddlewareUtilsModule | undefined;

    jest.isolateModules(() => {
      proxyCopy = jest.requireActual<typeof MiddlewareUtilsModule>('../middleware.utils');
    });
    jest.isolateModules(() => {
      pageCopy = jest.requireActual<typeof MiddlewareUtilsModule>('../middleware.utils');
    });

    proxyCopy!.cacheHostnamePlans('shared.example.com', [MOCK_PLAN]);
    expect(pageCopy!.getCachedHostnamePlans('shared.example.com')).toEqual([MOCK_PLAN]);

    pageCopy!.evictHostnamePlans('shared.example.com');
    expect(proxyCopy!.getCachedHostnamePlans('shared.example.com')).toBeUndefined();
  });
});

describe('a hostname shared by several plans', () => {
  // A regional site carries several plans on one hostname, separated by base path. The backend
  // answers for every plan on the hostname and cannot know the path, so choosing between them is
  // this layer's job — including when the chosen one is not being served, which is exactly when
  // picking the neighbour instead would show a site that should not be shown.
  const planAt = (
    basePath: string,
    typename: 'Plan' | 'RestrictedPlanNode',
    status: PlanDomainStatus
  ) =>
    ({
      ...MOCK_PLAN,
      __typename: typename,
      domain: { basePath, status },
      domains: [{ basePath, status }],
    }) as unknown as PlanFromPlansQuery;

  const open = planAt('/open', 'Plan', PlanDomainStatus.Available);
  const closed = planAt('/closed', 'RestrictedPlanNode', PlanDomainStatus.SignInRequired);
  const plans = [open, closed];

  it('picks the restricted plan by its base path rather than its served neighbour', () => {
    const { parsedPlan } = getLocaleAndPlan(`/${primaryLanguage}/closed/actions`, plans);

    expect(parsedPlan).toBe(closed);
    expect(isPlanAvailable(parsedPlan!)).toBe(false);
    expect(getDomainStatus(parsedPlan!)).toBe(PlanDomainStatus.SignInRequired);
  });

  it('picks the served plan at its own base path', () => {
    const { parsedPlan } = getLocaleAndPlan(`/${primaryLanguage}/open/actions`, plans);

    expect(parsedPlan).toBe(open);
    expect(isPlanAvailable(parsedPlan!)).toBe(true);
  });
});
