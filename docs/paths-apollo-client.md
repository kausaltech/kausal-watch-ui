# A separate Apollo client for Paths data

Plan (October 2026) for moving Paths API data fetching onto its own Apollo
client. This is the first step towards reproducing the kausal-paths-ui public
UI in watch-ui.

## Goal and scope

All content management stays in the Watch backend: pages, stream fields and
content blocks come from Watch. Only impact-model data (instance settings,
goals, nodes, metrics, scenarios, parameters) comes from Paths. This plan only
covers how that model data is fetched.

## Current state

- **Server.** `src/app/root/[domain]/[lang]/[plan]/layout.tsx` awaits
  `getPlan`, then `getPathsData(plan.kausalPathsInstanceUuid)`. That runs
  `GetInstanceContext` (`src/queries/paths/get-paths-instance.ts`) on the
  Watch RSC client (`src/utils/apollo-rsc-client.ts`), with a `uri`
  override pointing at the Paths API and `fetchPolicy: 'no-cache'`. The
  result goes to `PathsProvider`, which merges in the hard-coded
  `PER_INSTANCE_SETTINGS`.
- **Browser.** Paths components use the Watch client from `ApolloWrapper`.
  Seven call sites each pass
  `context: { uri: '/api/graphql-paths', headers: getHttpHeaders(...) }`.
  The route handler `src/app/api/graphql-paths/route.ts` forwards to Paths
  and maps `paths_api_*` cookies to the Paths session cookie, which holds the
  user's scenario and parameter choices.
- **SSR.** The Next.js integration makes `useQuery` cache-only during SSR,
  so Paths blocks always render a loader on the server and fetch after
  hydration (browser → Next proxy → Paths).
- **Shared UI state.** Module-level reactive vars in
  `kausal_common/src/apollo/paths-cache.ts`, seeded by `SettingsPanelFull`.

## Problems this fixes

1. **Paths mutations refetch Watch queries.** `ScenarioSelector`,
   `NormalizationWidget` and `ParameterWidget` use
   `refetchQueries: 'active'`, which refetches every active query in the
   shared client, including Watch queries.
2. **Paths requests run through Watch's link chain.** If Paths returns
   `UNAUTHENTICATED`, the browser `unauthErrorLink` calls `signOut()` on the
   Watch session. Sentry spans record Paths operations under the Watch URL.
   The Watch-only headers (pledge token, `x-cache-plan-*`) are stripped by the
   proxy's `PASS_HEADERS`, so they don't leak.
3. **The server-rendered instance context ignores the user's Paths session.**
   The server query sends no `paths_api_*` cookies, so `scenarios`,
   `parameters` and `availableNormalizations[].isActive` are always the
   defaults. `SettingsPanelFull` seeds `activeScenarioVar` from them.
   paths-ui forwards client cookies during SSR
   (`kausal-paths-ui/src/common/apollo-config.ts`).
4. **The shared cache only knows Watch types.** The cache is built with
   Watch `possibleTypes`. Watch and Paths already share about 30 type
   names (`StaticPage`, `Page`, `RichTextBlock`, `StreamFieldInterface`,
   ...), so entries can collide and interface fragments can silently lose
   fields. Content comes from Watch, so pages and blocks won't hit this, but
   model types will as Paths grows.
5. **Every plan page makes a blocking Paths request.** It runs after
   `getPlan` and `loadTheme`, is never cached, runs on pages with no Paths
   content, and fetches fields nothing reads from the context (`parameters`,
   `introContent`, `leadTitle`, `leadParagraph`).
6. **Paths content is never server-rendered.** See SSR above.

## Constraint: `ApolloNextAppProvider` holds only one client in the browser

The browser build of `@apollo/client-react-streaming` (0.14.5) creates the
client with:

```js
clientRef.current = window[ApolloClientSingleton] ??= makeClient();
```

A second `ApolloNextAppProvider` would get the Watch client back and silently
ignore its own `makeClient`. So:

- The Paths client is a **plain `ApolloClient` from `@apollo/client`**,
  provided with a plain `ApolloProvider` or passed explicitly via the
  `client` hook option.
- Paths does **not** get the streaming SSR transport. `PreloadQuery` and
  streamed hydration go through the single Watch provider and would put
  Paths data into the Watch cache. Server-rendered Paths data is fetched in
  server components with a separate `registerApolloClient` for Paths, then
  passed down or written into the Paths client cache in the browser.

Watch keeps using `ApolloNextAppProvider` and streaming SSR unchanged.

## Design

### Client factory: `makePathsClient`

Put it in `kausal_common` so paths-ui and watch-ui can share it, starting
from `kausal-paths-ui/src/common/apollo-config.ts`.

- **Cache:** Paths `possibleTypes`
  (`src/common/__generated__/paths/possible_types.json`) and paths-ui's
  `typePolicies`.
- **Links:**
  - locale directive;
  - `@instance` directive middleware (`makeInstanceMiddleware`, which already
    exists unused in `src/utils/paths/paths.utils.ts` and also in paths-ui);
  - Sentry link with the Paths URL;
  - an error link that reports errors but never touches the Watch session;
  - HTTP link: an absolute Paths URL on the server, `/api/graphql-paths` in
    the browser;
  - on the server, the `paths_api_*` cookies forwarded with the prefix
    removed.
- `devtools: { name: 'paths' }`.

### Browser: `PathsApolloProvider` and hooks

- **One instance per browser, a new one per server request.** In the
  browser, keep the client in a module-level variable. On the server, create
  it in `useState(() => makePathsClient(...))`. A module-level client on the
  server would share one user's session cookies and cached scenario data with
  other requests.
- **Locale sync.** `UpdateLocale` only updates the Watch client. The Paths
  provider needs the same `defaultContext.locale` update.
- **Hooks.** `usePathsQuery`, `usePathsSuspenseQuery` and `usePathsMutation`
  pass `client: pathsClient` explicitly.

Decided (October 2026): explicit hooks, not a nested `ApolloProvider`.
Everything inside a nested provider that calls `useQuery` gets the Paths
client. A Watch component rendered there (indicator modal, a Watch content block) would send
Watch queries to Paths and fail at runtime. The typed documents give no
protection: a Paths document passed to the Watch client compiles fine.

Add a lint rule (`no-restricted-imports`) that forbids bare `useQuery`,
`useMutation` and `useSuspenseQuery` from `@apollo/client/react` in
`src/components/paths/**`. Ported paths-ui code then needs a mechanical
`useQuery` → `usePathsQuery` swap.

### Server: `getPathsClient`

A separate `registerApolloClient(() => makePathsClient({ ssr: true, ... }))`,
reading the instance id, locale and `paths_api_*` cookies from the request.
It replaces the `uri` override in `get-paths-instance.ts`. The `uri` branch in
the `authMiddleware` of both Watch clients can then be removed.

### Instance context: split by whether it depends on the user

- **Static part** (instance metadata, goals, years, features): fetched with
  `getPathsClient`, wrapped in React `cache()` and started in parallel with
  `loadTheme`. It can be cached across requests because it doesn't depend
  on the session.
- **Session part** (scenarios, parameters, normalizations): fetched with
  cookies forwarded, or only in the browser via `usePathsQuery`.
  `SettingsPanelFull` seeds `activeScenarioVar` from this, never from
  defaults.
- **Unused fields:** drop `parameters`, `introContent`, `leadTitle` and
  `leadParagraph` unless a ported component needs them.

## Steps

1. **Factory.** Add `makePathsClient` to `kausal_common`, based on paths-ui's
   `apollo-config.ts`. Coordinate with paths-ui so both apps use it, or start
   in watch-ui and move it over.
2. **Browser provider.** Add `PathsApolloProvider`, the hooks and locale sync.
   Mount the provider once next to `PathsProvider` in the plan layout. With
   explicit hooks the provider only holds the client instance and doesn't
   change which client plain `useQuery` gets.
3. **Migrate call sites.** Move the seven call sites to the Paths hooks:
   - `PathsOutcomeBlock`
   - `ScenarioSelector`
   - `NormalizationWidget`
   - `ParameterWidget`
   - `PathsNodeSummary`
   - `GoalOutcomeBar`
   - `IndicatorSparkline`

   Remove the `uri` and `headers` context. `refetchQueries: 'active'` is now
   limited to the Paths client. Add the lint rule.

4. **Server client.** Add `getPathsClient` with cookie forwarding and move
   `getPathsInstance` onto it. Remove the `uri` branches from the Watch
   `authMiddleware`s.
5. **Split the instance context.** Split it as described above, cache the
   static part and run it in parallel. Consider skipping it on pages that
   don't need Paths data.

   Done so far (October 2026): the unused fields are dropped, `getPathsData`
   is wrapped in `cache()` and runs in parallel with `loadTheme`. Since step 4
   forwards the session cookies, one query returns correct session data, so
   the split is deferred until the static part can be cached across requests
   (see open questions). Skipping the fetch is deferred too: the layout can't
   tell whether the page has Paths content, and the settings panel needs the
   context on every page.

6. **SSR for Paths blocks.** Fetch block data in server components with
   `getPathsClient` and hand it to the Paths client in the browser (see open
   questions).

   Done for `PathsOutcomeBlock` (October 2026). Model computations can take
   seconds on a cold cache (1.7–3.8 s measured), so the page does not wait:
   - The root and content pages call `preloadPathsBlocks()` without awaiting
     it and pass the promise to `PathsPreloadProvider`.
   - The block reads it with `use()` inside `Suspense`, writes the results
     into the Paths client cache (`writeQuery`, `broadcast: false`) and
     renders them. The loader streams first and the server-rendered block
     replaces it. The browser hydrates from the same data and skips the
     request (`cache-first` when the variables were preloaded).
   - The settings reactive vars are never set on the server, so
     `useActiveGoal`, `useActiveScenario` and `useYearRange` fall back to the
     initial values `SettingsPanelFull` seeds. The preload uses the same
     default goal, so the variables match.
   - `getPlan` is wrapped in `cache()`, so the preload reuses the layout's
     plan and instance requests.

   Not yet: blocks nested deeper than the page body, and the other Paths
   blocks (`PathsNodeSummary` on category pages, `GoalOutcomeBar`). The
   fallback hooks are only used in the outcome block subtree so far.

   Next: generalise the mechanism before applying it to more block types: a
   `preloadPathsQuery(query, variables)` on the server and a
   `usePreloadedPathsQuery` hook in the block, so the variables are matched in
   one place and a new block needs only a few lines.

7. **Cleanup:**
   - remove the duplicate `makeInstanceMiddleware` and `getHttpHeaders`
     helpers;
   - move `PER_INSTANCE_SETTINGS` into config shared with paths-ui's
     `getInstanceConfig()`, or into the backend;
   - reset the `paths-cache.ts` reactive vars when the instance id changes,
     since they're currently only seeded when empty.

   Done (October 2026). paths-ui's `getInstanceConfig()` holds Watch links
   and demo pages, not goal display settings, so there was nothing to share:
   the settings moved to `src/config/paths-instances.ts` and still belong in
   the backend eventually. `SettingsPanelFull` clears the reactive vars in a
   layout effect when the instance changes, so they are seeded again the same
   way as on first mount.

Steps 1–3 can ship on their own and fix problems 1, 2 and 4. Steps 4–5 fix 3
and 5. Step 6 fixes 6.

## Caveats

- **Refetches don't cross clients.** Watch mutations won't refetch Paths
  queries and Paths mutations won't refetch Watch queries. That's intended;
  it only becomes a gap if a Watch action is ever meant to change model
  output.
- **Tests** need a `MockedProvider` per client. The Paths hooks should
  accept an injected client for tests.
- **Reactive vars** (`activeGoalVar` and the others) aren't tied to any
  client, so this change doesn't affect them.
- **Cost:** none to speak of. Both clients use the same library code, and a
  second small cache is trivial.

## Open questions

- **How SSR data reaches the Paths client.** Options: pass the results as
  props and use them as initial data; `cache.writeQuery` each preloaded
  result in the provider; or `cache.restore()` an extracted snapshot. Writing
  each query is the safest with a browser-wide client that outlives
  navigations, since `restore()` replaces the whole cache. Resolved: each
  result is written with `writeQuery` from a streamed promise (step 6).
- **Where `makePathsClient` lives,** and whether paths-ui adopts it at the
  same time.
- **Whether the static instance context can be cached across requests**
  (`'use cache'` or fetch revalidation), and what invalidates it when the
  model is republished.
