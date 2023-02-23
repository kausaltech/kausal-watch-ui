/* eslint-disable no-console */

import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';
import originalUrl from 'original-url';
//import cacheableResponse from 'cacheable-response';
//import parseCacheControl from '@tusbar/cache-control';
//import normalizeUrl from 'normalize-url';
import LRU from 'lru-cache';
import apollo from '@apollo/client';
import 'dotenv/config'
import next from 'next';

console.log('> 💡 Starting server');

const { ApolloClient, HttpLink, InMemoryCache, gql } = apollo;

import * as Sentry from '@sentry/nextjs';
import './sentry.server.config.js';

if (process.env.SENTRY_DSN) {
  console.log(`> ⚙️ Sentry initialized at ${process.env.SENTRY_DSN}`);
}
const serverPort = process.env.PORT || 3000;
const isDevMode = process.env.NODE_ENV !== 'production';
const isProductionInstance = process.env.DEPLOYMENT_TYPE === 'production';

/*
let ssrCache;
if (false && (('ENABLE_CACHE' in process.env)
  ? (process.env.ENABLE_CACHE === '1') : process.env.NODE_ENV === 'production')) {
  console.log('SSR cache initialized');
  ssrCache = cacheableResponse({
    ttl: 1000 * 60, // 1 min
    get: async ({ req, res, pagePath, queryParams }) => {
      if ('force' in req.query) delete req.query.force;
      const data = await app.renderToHTML(req, res, pagePath, queryParams);
      return { data, statusCode: res.statusCode };
    },
    send: ({ statusCode, data, res }) => {
      res.statusCode = statusCode;
      res.send(data);
    },
    getKey: ({ req }) => {
      const url = originalUrl(req);
      const baseKey = normalizeUrl(url.full, {
        removeQueryParameters: ['force', /^utm_\w+/i]
      });
      return baseKey;
    },
  });
}
*/

function getCurrentURL(req) {
  const obj = originalUrl(req);
  let port;

  if (obj.protocol === 'http:' && obj.port === 80) {
    port = '';
  } else if (obj.protocol === 'https:' && obj.port === 443) {
    port = '';
  } else {
    port = `:${obj.port}`;
  }
  const path = obj.pathname.replace(/\/$/, ''); // strip trailing slash
  const baseURL = `${obj.protocol}//${obj.hostname}${port}`;
  const hostname = obj.hostname;
  return { baseURL, path, hostname };
}

Error.stackTraceLimit = 30;

const GET_PLANS_BY_HOSTNAME = gql`
query GetPlansByHostname($hostname: String) {
  plansForHostname(hostname: $hostname) {
    domains {
      hostname
      basePath
      status
      statusMessage
    }
    primaryLanguage
    ... on Plan {
      id
      identifier
      otherLanguages
    }
  }
}
`;

class WatchServer {
  constructor() {
    this.nextConfig = null;
    this.app = next({ dev: isDevMode });
    this.nextHandleRequest = this.app.getRequestHandler();
    this.hostnameCache = new LRU({
      max: 500,
      ttl: 1 * 60 * 1000,
    });
  }

  initApollo() {
    const uri = this.nextConfig.publicRuntimeConfig.aplansApiBaseURL + '/graphql/';
    const httpLink = new HttpLink({
      uri,
    });
    console.log(`> 🚀 GraphQL API at ${uri}`);
    return new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }

  parseRequestPath(ctx, plans) {
    const { path } = ctx;
    let matchedPlan = null, basePath = null;
    let parts = path.split('/').splice(1);

    for (const plan of plans) {
      let prefix;
      if (!plan.domains.length) {
        prefix = '';
      } else {
        const domain = plan.domains[0];
        prefix = (domain.basePath || '/').split('/').splice(1)[0];
      }
      if (!prefix) {
        // Root plan
        matchedPlan = plan;
        basePath = '';
        continue
      }
      if (prefix === parts[0]) {
        matchedPlan = plan;
        parts = parts.splice(1);
        basePath = `/${prefix}`;
        break;
      }
    }
    if (!matchedPlan) {
      throw new Error(`Did not find a matching plan for path ${path}`);
    }
    let locale = matchedPlan.primaryLanguage;
    if (parts.length) {
      // Check if we have a locale prefix
      for (const lang of matchedPlan.otherLanguages) {
        if (parts[0] === lang) {
          locale = lang;
          break;
        }
      }
    }
    return { plan: matchedPlan, locale, basePath};
  }

  async getAvailablePlans(ctx) {
    const { hostname, path } = ctx;
    let plansForHostname;
    const obj = this.hostnameCache.get(hostname);

    if (obj) return JSON.parse(obj);

    try {
      const { data } = await this.apolloClient.query({
        query: GET_PLANS_BY_HOSTNAME,
        variables: {
          hostname: ctx.hostname,
        },
        fetchPolicy: 'no-cache',
      });
      plansForHostname = data.plansForHostname;
    } catch (error) {
      console.error(`Unable to get plan for hostname: ${ctx.hostname}`)
      if (error.networkError) {
        if (!error.networkError.result) {
          console.error(error.networkError);
        } else {
          console.log(error.networkError.result?.errors);
        }
      } else {
        console.error(error);
      }
      Sentry.withScope((scope) => {
        scope.setTag('hostname', ctx.hostname);
        Sentry.captureException(error);
      });
      ctx.throw(500, 'Internal server error (unable to get plan data)');
      return null;
    }
    if (!plansForHostname.length) {
      const msg = `Unknown hostname: ${ctx.hostname}`;
      console.error(msg);
      ctx.throw(404, msg);
    }
    this.hostnameCache.set(hostname, JSON.stringify(plansForHostname));
    return plansForHostname;
  }

  setBasePath(basePath) {
    const srv = this.nextServer;
    srv.nextConfig.basePath = basePath;
    srv.nextConfig.assetPrefix = basePath;
    srv.nextConfig.images.path = basePath + '/_next/image';
    srv.nextConfig.publicRuntimeConfig.basePath = basePath;
    srv.renderOpts.basePath = basePath;
    srv.renderOpts.canonicalBase = basePath;
    srv.renderOpts.runtimeConfig.basePath = basePath;
    srv.renderOpts.assetPrefix = basePath;
    srv.router.basePath = basePath;
  }

  setLocale(locale, defaultLocale, locales) {
    const srv = this.nextServer;
    // Insert defaultLocale as the first element in locale list
    const loc = locales.filter((lang) => lang !== defaultLocale);
    loc.splice(0, 0, defaultLocale);
    srv.nextConfig.i18n.defaultLocale = defaultLocale;
    srv.nextConfig.i18n.locales = loc;
    srv.nextConfig.publicRuntimeConfig.locale = locale;
    srv.router.locales = loc;
    srv.incrementalCache.locales = loc;
  }

  async handleRequest(ctx) {
    ctx.req.currentURL = getCurrentURL(ctx.req);
    if (ctx.req.currentURL.path === '/_health') {
      ctx.res.statusCode = 200;
      ctx.res.statusMessage = 'OK';
      return;
    }
    const plans = await this.getAvailablePlans(ctx);
    if (!plans) return;
    const domain = plans[0].domains[0];
    // The domain is not shown for automatically configured domains
    const publicationStatus = domain?.status ?? 'PUBLISHED';
    const published = publicationStatus === 'PUBLISHED'
    if (published) {
      const { plan, locale, basePath } = this.parseRequestPath(ctx, plans);
      this.setBasePath(basePath);
      this.setLocale(locale, plan.primaryLanguage, plan.otherLanguages);
      ctx.req.planIdentifier = plan.identifier;
    }
    else {
      ctx.req.publicationStatus = publicationStatus;
      ctx.req.publicationStatusMessage = domain.statusMessage;
      const plan = plans[0];
      const primaryLanguage = plan?.primaryLanguage;
      if (primaryLanguage != null) {
        this.setLocale(primaryLanguage, primaryLanguage, []);
      }
    }
    await this.nextHandleRequest(ctx.req, ctx.res);
    ctx.respond = false;
  }

  async init() {
    await this.app.prepare();
    this.nextConfig = (await import("next/config.js")).default.default();
    const router = new Router();
    const server = new Koa();

    this.apolloClient = this.initApollo();
    this.nextServer = await this.app.getServer();

    router.get('/favicon.ico', async (ctx) => {
      ctx.throw(404, 'File not found');
    });
    router.get('/robots.txt', async (ctx) => {
      let ret = 'User-agent: *\nDisallow:';
      if (isProductionInstance) {
        ret += '\n';
      } else {
        ret += ' /\n';
      }
      ctx.body = ret;
      ctx.status = 200;
    });

    router.all('(.*)', this.handleRequest.bind(this));

    server.use(logger());
    server.use(router.routes());
    server.on('error', (err, ctx) => {
      // Do not report HTTP 404s to Sentry
      if (err.statusCode && err.statusCode === 404) return;
      Sentry.withScope((scope) => {
        scope.addEventProcessor((event) => Sentry.Handlers.parseRequest(event, ctx.request));
        Sentry.captureException(err);
      });
      console.error(err);
    });
    server.listen(serverPort, () => {
      console.log(`> ✅ Ready on http://localhost:${serverPort}`);
    });
  }
}

const pathsServer = new WatchServer();
pathsServer.init().then(() => {
  console.log('> Init done');
});

/*
// Serve locales as JSON
server.get('/locales/:lang([a-z]{2})/:ns([0-9a-z_-]+).json', function (req, res) {
  const { lang, ns } = req.params;
  let contents;

  try {
    contents = fs.readFileSync(`./locales/${lang}/${ns}.yaml`, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.sendStatus(404)
      return;
    }
  }
  const data = YAML.parse(contents);
  res.json(data);
});

server.get('*', (req, res) => {
  const { path } = req;
  req.currentURL = getCurrentURL(req);

  if (ssrCache) {
    if (!path.startsWith('/static') && !path.startsWith('/_next')) {
      const queryParams = { ...req.query };
      const cacheControl = req.get('Cache-Control');
      const parsed = parseCacheControl.parse(cacheControl);

      // If browser requests a fresh version, we force a cache miss.
      if (parsed.noCache || parsed.maxAge === 0) {
        req.query.force = true;
      }
      return ssrCache({ req, res, pagePath: req.path, queryParams });
    }
  }
  return handle(req, res);
});
*/
