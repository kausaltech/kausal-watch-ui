// server.js
import next from 'next';
import morgan from 'morgan';
import express from 'express';
import originalUrl from 'original-url';
import cacheableResponse from 'cacheable-response';
import parseCacheControl from '@tusbar/cache-control';

import sentry from './common/sentry.js';

const serverPort = process.env.PORT || 3000;

const app = next({ dev: process.env.NODE_ENV !== 'production' });
let Sentry;

if (process.env.SENTRY_DSN) {
  // { release: app.buildId }
  Sentry = sentry.Sentry;
  console.log('Sentry initialized');
}

let ssrCache;
if (('ENABLE_CACHE' in process.env)
  ? (process.env.ENABLE_CACHE === '1') : process.env.NODE_ENV === 'production') {
  console.log('SSR cache initialized');
  ssrCache = cacheableResponse({
    ttl: 1000 * 60, // 1 min
    get: async ({ req, res, pagePath, queryParams }) => {
      if ('force' in req.query) delete req.query.force;
      const data = await app.renderToHTML(req, res, pagePath, queryParams);
      return { data };
    },
    send: ({ data, res }) => res.send(data),
  });
}

app.prepare().then(() => {
  const server = express();

  if (Sentry) {
    server.use(Sentry.Handlers.requestHandler());
  }
  server.use(morgan('dev'));

  const handle = app.getRequestHandler();

  server.get('*', (req, res) => {
    req.currentURL = getCurrentURL(req);

    if (ssrCache) {
      if (req.path === '/' || req.path.startsWith('/actions') || req.path.startsWith('/indicators')) {
        const queryParams = { ...req.query };
        const cacheControl = req.get('Cache-Control');
        const parsed = parseCacheControl.parse(cacheControl);

        if (parsed.noCache || parsed.maxAge === 0) {
          req.query.force = true;
        }
        return ssrCache({ req, res, pagePath: req.path, queryParams });
      }
    }
    return handle(req, res);
  });

  if (Sentry) {
    server.use(Sentry.Handlers.errorHandler());
  }

  server.listen(serverPort, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${serverPort}`);
  });
});

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
  const domain = `${obj.protocol}//${obj.hostname}${port}`;
  return { domain, path };
}
