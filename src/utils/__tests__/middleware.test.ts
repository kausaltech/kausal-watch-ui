/**
 * @jest-environment node
 */
import type { NextRequest, NextResponse } from 'next/server';

import { PlanDomainAvailability } from '@/common/__generated__/graphql';

import type * as MiddlewareUtilsModule from '../middleware.utils';
import {
  type PlanFromPlansQuery,
  applySecurityHeaders,
  buildReportOnlyPolicy,
  getDomainAvailability,
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

  /* The rewrite header is parsed per request, so a value that will not parse must not throw. */
  it('denies framing when the rewrite target will not parse', () => {
    const { headers } = applySecurityHeaders(rewrittenTo('http://%%'), secureRequest);

    expect(headers.get('x-frame-options')).toBe('SAMEORIGIN');
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

  /* Theme CSS imports webfonts from a handful of vendors, so those are ours to know. */
  it.each([
    'https://use.typekit.net',
    'https://p.typekit.net',
    'https://fast.fonts.net',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ])('allows the theme webfont vendor %s', (host) => {
    const policy = buildReportOnlyPolicy(options)!;
    expect(sourcesOf(policy, 'style-src')).toContain(host);
    expect(sourcesOf(policy, 'font-src')).toContain(host);
    /* Typekit's loader also calls back to its own host. */
    expect(sourcesOf(policy, 'connect-src')).toContain(host);
  });

  /*
   * Optional per-plan integrations. The entry point is hardcoded in our own components and
   * switched on by a plan setting, so the hosts are ours to enumerate rather than customer data.
   */
  it.each([
    ['https://www.googletagmanager.com', 'Google Analytics'],
    ['https://www.google-analytics.com', 'Google Analytics'],
    ['https://region1.google-analytics.com', 'Google Analytics'],
    ['https://app-script.monsido.com', 'Monsido'],
    ['https://cdn.monsido.com', 'Monsido'],
    ['https://pagecorrect.monsido.com', 'Monsido'],
    ['https://heatmaps.monsido.com', 'Monsido'],
    ['https://www.stadt-zuerich.ch', 'Zurich analytics'],
    ['https://analytics.stadt-zuerich.ch', 'Zurich analytics'],
    ['https://dpm.demdex.net', 'Zurich analytics'],
  ])('allows %s (%s)', (host) => {
    const policy = buildReportOnlyPolicy(options)!;
    expect(sourcesOf(policy, 'script-src')).toContain(host);
    expect(sourcesOf(policy, 'connect-src')).toContain(host);
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

  /*
   * The policy is built when the module loads, so a malformed value must not throw: that would
   * take down every request rather than degrade a header nothing enforces yet.
   */
  it.each([
    ['assetPrefix', { assetPrefix: 'cdn.example.com' }],
    ['backendUrl', { backendUrl: 'api.example.com' }],
    ['dsn', { dsn: 'not a dsn' }],
  ])('survives a malformed %s', (_name, override) => {
    expect(() => buildReportOnlyPolicy({ ...options, ...override })).not.toThrow();
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
