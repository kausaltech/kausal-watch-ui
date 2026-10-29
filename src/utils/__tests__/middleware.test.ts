/**
 * @jest-environment node
 */
import type { NextRequest, NextResponse } from 'next/server';

import { PlanDomainAvailability } from '@/common/__generated__/graphql';

import type * as MiddlewareUtilsModule from '../middleware.utils';
import {
  type PlanFromPlansQuery,
  applyWatchSecurityHeaders,
  buildWatchReportOnlyPolicy,
  getDomainAvailability,
  getLocaleAndPlan,
  getParsedLocale,
  isPlanAvailable,
  resolveStalePlan,
  rewriteUrl,
  setMatomoAnalyticsUrl,
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

describe('applyWatchSecurityHeaders', () => {
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

  const rewrittenTo = (path: string) => {
    const response = new Response(null);
    response.headers.set('x-middleware-rewrite', path);

    return response;
  };

  /*
   * The exemption is decided from the rewritten path, because only there have the plan's base
   * path and the locale been stripped. An incoming path cannot distinguish an embed view from
   * a content page whose slug happens to be `embed`, since both go through a catch-all route.
   */
  it.each([
    ['/root/plan.example.com/fi/plan/embed/v1/actions-recent', 'an embed view'],
    ['/root/plan.example.com/fi/plan/embed/v2/actions-recent', 'a future embed version'],
  ])('leaves framing unrestricted for %s (%s)', (rewrite) => {
    const { headers } = applyWatchSecurityHeaders(rewrittenTo(rewrite), secureRequest);

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
    const { headers } = applyWatchSecurityHeaders(rewrittenTo(rewrite), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
    expect(headers.get('content-security-policy')).toContain("frame-ancestors 'self'");
  });

  /* The rewrite header is parsed per request, so a value that will not parse must not throw. */
  it('denies framing when the rewrite target will not parse', () => {
    const { headers } = applyWatchSecurityHeaders(rewrittenTo('http://%%'), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
  });

  it('denies framing when nothing was rewritten', () => {
    const { headers } = applyWatchSecurityHeaders(new Response(null), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
  });

  /*
   * The served plan's Matomo setting reaches the policy through a response header, which must
   * not be left on the response the browser gets.
   */
  it('removes the Matomo setting it was handed', () => {
    const plan = {
      ...MOCK_PLAN,
      domain: { matomoAnalyticsUrl: 'https://matomo.city.example?3' },
    } as PlanFromPlansQuery;
    const response = setMatomoAnalyticsUrl(new Response(null), plan);

    expect(response.headers.get('x-kausal-matomo-analytics-url')).toBe(
      'https://matomo.city.example?3'
    );

    const { headers } = applyWatchSecurityHeaders(response, secureRequest);

    expect(headers.has('x-kausal-matomo-analytics-url')).toBe(false);
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

    const { headers } = applyWatchSecurityHeaders(response, secureRequest);

    expect(headers.get('x-plan-identifier')).toBe('test-plan');
    expect(headers.get('x-plan-domain')).toBe('plan.example.com');
    expect(headers.get('x-url')).toBe('https://plan.example.com/some/path');
  });
});

describe('buildWatchReportOnlyPolicy', () => {
  /* The sources of one directive, so assertions do not have to match against the whole policy. */
  const sourcesOf = (policy: string, directive: string) =>
    policy
      .split(';')
      .map((part) => part.trim().split(/\s+/))
      .find((parts) => parts[0] === directive)
      ?.slice(1) ?? [];

  const options = {
    dsn: 'https://publickey@sentry.example.com/42',
    assetPrefix: 'https://cdn.example.com',
    backendUrl: 'https://api.backend.example.com',
    environment: 'production',
    release: 'build-1',
  };

  it('allows the map hosts', () => {
    const policy = buildWatchReportOnlyPolicy(options)!;

    expect(sourcesOf(policy, 'connect-src')).toEqual(
      expect.arrayContaining(['https://api.mapbox.com', 'https://events.mapbox.com'])
    );
  });

  it.each([
    ['https://ana.kausal.tech?12', 'https://ana.kausal.tech', 'our own'],
    ['https://matomo.city.example/analytics/?3', 'https://matomo.city.example', "a customer's"],
  ])('allows the Matomo host the plan reports to (%s, %s)', (matomoAnalyticsUrl, origin) => {
    const policy = buildWatchReportOnlyPolicy({ ...options, matomoAnalyticsUrl })!;

    expect(sourcesOf(policy, 'script-src')).toContain(origin);
    expect(sourcesOf(policy, 'connect-src')).toContain(origin);
  });

  it.each([
    ['not configured', null],
    ['malformed', 'matomo.city.example?3'],
  ])('allows no Matomo host when it is %s', (_name, matomoAnalyticsUrl) => {
    const policy = buildWatchReportOnlyPolicy({ ...options, matomoAnalyticsUrl })!;

    expect(policy).not.toContain('matomo');
    expect(policy).not.toContain('ana.kausal.tech');
  });

  it('allows the backend origin the deployment points at', () => {
    const policy = buildWatchReportOnlyPolicy(options)!;

    expect(sourcesOf(policy, 'connect-src')).toContain('https://api.backend.example.com');
  });

  it.each([
    ['not configured', ''],
    ['malformed', 'api.example.com'],
  ])('leaves the backend out when it is %s', (_name, backendUrl) => {
    const policy = buildWatchReportOnlyPolicy({ ...options, backendUrl })!;

    expect(sourcesOf(policy, 'connect-src')).not.toContain(backendUrl);
    expect(policy).not.toContain('api.backend.example.com');
  });

  it.each([
    ['https://www.googletagmanager.com', 'Google Analytics'],
    ['https://*.google-analytics.com', 'Google Analytics'],
    ['https://*.google.com', 'Google Analytics'],
    ['https://app-script.monsido.com', 'Monsido'],
    ['https://cdn.monsido.com', 'Monsido'],
    ['https://pagecorrect.monsido.com', 'Monsido'],
    ['https://heatmaps.monsido.com', 'Monsido'],
    ['https://tracking.monsido.com', 'Monsido'],
    ['https://www.stadt-zuerich.ch', 'Zurich analytics'],
    ['https://analytics.stadt-zuerich.ch', 'Zurich analytics'],
    ['https://dpm.demdex.net', 'Zurich analytics'],
  ])('allows %s (%s)', (host) => {
    const policy = buildWatchReportOnlyPolicy(options)!;

    expect(sourcesOf(policy, 'script-src')).toContain(host);
    expect(sourcesOf(policy, 'connect-src')).toContain(host);
  });
});

describe('domain availability', () => {
  const planWithAvailability = (availability: PlanDomainAvailability | null) =>
    ({ ...MOCK_PLAN, domain: { availability } }) as PlanFromPlansQuery;

  it.each([
    [PlanDomainAvailability.Available, true],
    [PlanDomainAvailability.Unavailable, false],
    [PlanDomainAvailability.SignInRequired, false],
  ])('serves the site only when the backend says %s', (availability, expected) => {
    expect(isPlanAvailable(planWithAvailability(availability))).toBe(expected);
  });

  describe('a value this UI does not recognise', () => {
    const unknown = (typename: 'Plan' | 'RestrictedPlanNode') =>
      ({
        ...MOCK_PLAN,
        __typename: typename,
        domain: { availability: 'SOMETHING_NEW' },
      }) as unknown as PlanFromPlansQuery;

    it('falls back to __typename', () => {
      expect(isPlanAvailable(unknown('Plan'))).toBe(true);
      expect(isPlanAvailable(unknown('RestrictedPlanNode'))).toBe(false);
    });

    it('still offers a way in for a restricted plan', () => {
      expect(getDomainAvailability(unknown('RestrictedPlanNode'))).toBe(
        PlanDomainAvailability.SignInRequired
      );
    });
  });

  it('treats a missing availability as whatever __typename says', () => {
    // The field is nullable in the schema, and a plan reached without a hostname has no domain.
    const served = { ...MOCK_PLAN, __typename: 'Plan' } as PlanFromPlansQuery;
    expect(getDomainAvailability(served)).toBe(PlanDomainAvailability.Available);
    expect(
      isPlanAvailable({ ...served, domain: { availability: null } } as PlanFromPlansQuery)
    ).toBe(true);
  });
});

describe('resolveStalePlan', () => {
  const restricted = (
    availability: PlanDomainAvailability,
    statusMessage: string | null = null,
    accessRequestsEnabled = true
  ) =>
    ({
      __typename: 'RestrictedPlanNode',
      identifier: 'private-plan',
      name: 'Private plan',
      themeIdentifier: 'de-nrw',
      accessRequestsEnabled,
      primaryLanguage,
      statusMessage: null,
      domain: { availability, statusMessage, basePath: null },
      domains: [{ basePath: null }],
    }) as unknown as PlanFromPlansQuery;

  it('names the sign-in page, and what it needs to present the plan', () => {
    expect(resolveStalePlan('/', [restricted(PlanDomainAvailability.SignInRequired)])).toEqual({
      kind: 'sign-in-required',
      plan: {
        planIdentifier: 'private-plan',
        planName: 'Private plan',
        themeIdentifier: 'de-nrw',
        homePath: '/',
        eligibilityText: null,
      },
    });
  });

  it('names the placeholder with a sign-in button for a plan that takes no access requests', () => {
    expect(
      resolveStalePlan('/', [restricted(PlanDomainAvailability.SignInRequired, null, false)])
    ).toEqual({ kind: 'unavailable', signInRequired: true, message: undefined });
  });

  it('names the placeholder, with the message the backend gives', () => {
    expect(resolveStalePlan('/', [restricted(PlanDomainAvailability.Unavailable, 'Soon')])).toEqual(
      { kind: 'unavailable', signInRequired: false, message: 'Soon' }
    );
  });

  it('leaves no message when the backend gives none', () => {
    expect(resolveStalePlan('/', [restricted(PlanDomainAvailability.Unavailable)])).toEqual({
      kind: 'unavailable',
      signInRequired: false,
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
      domain: { availability: PlanDomainAvailability.Available, basePath: null },
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
    availability: PlanDomainAvailability
  ) =>
    ({
      ...MOCK_PLAN,
      __typename: typename,
      domain: { basePath, availability },
      domains: [{ basePath, availability }],
    }) as unknown as PlanFromPlansQuery;

  const open = planAt('/open', 'Plan', PlanDomainAvailability.Available);
  const closed = planAt('/closed', 'RestrictedPlanNode', PlanDomainAvailability.SignInRequired);
  const plans = [open, closed];

  it('picks the restricted plan by its base path rather than its served neighbour', () => {
    const { parsedPlan } = getLocaleAndPlan(`/${primaryLanguage}/closed/actions`, plans);

    expect(parsedPlan).toBe(closed);
    expect(isPlanAvailable(parsedPlan!)).toBe(false);
    expect(getDomainAvailability(parsedPlan!)).toBe(PlanDomainAvailability.SignInRequired);
  });

  it('picks the served plan at its own base path', () => {
    const { parsedPlan } = getLocaleAndPlan(`/${primaryLanguage}/open/actions`, plans);

    expect(parsedPlan).toBe(open);
    expect(isPlanAvailable(parsedPlan!)).toBe(true);
  });
});
