# Cleaning up the Paths integration

Status: planned, on `chore/paths-cleanup` (branched from `feat/node-page`). This doc lists what a review of Watch's Paths integration found after the node page and the shared node visualisation work, and in which order to fix it.

## Background

The node visualisation, its controls and the metric data layer now come from kausal_common in both apps (see `feat/node-page` and kausal_common `feat/shared-node-visualisation`). A review of the rest of Watch's Paths code then looked for three things:

- bugs and regressions;
- work that costs requests or renders for nothing;
- dead code;
- code that both apps have, which could move to kausal_common.

The findings were checked against the code. Line numbers are left out because they move; each item names the file and the symbol.

## Scope

In scope: steps 1–3, in Watch, plus the kausal_common changes they need.

Out of scope: step 4 (moving shared code to kausal_common). It is listed so it isn't lost, and each item there is its own piece of work.

## Step 1: bugs

1. **Number formatting default differs between the apps.** `DEFAULT_SIGNIFICANT_DIGITS` is 2 in kausal_common (`utils/format/numbers.ts`) and 3 in paths-ui (`src/common/numbers.ts`). The shared visualisation uses kausal_common's, so since the shared visualisation landed, paths-ui charts show one digit less than its own cards, on instances that set neither `showSignificantDigits` nor `maximumFractionDigits`. Agree on one default (paths-ui's 3 was what paths-ui users saw) and use it in both.
2. **`PathsNodeSummary` sorts the instance goals in place.** `displayGoals?.sort(...)` sorts `paths.instance.goals` itself on every render. That reorders `GoalSelector`'s options, and `InventoryNodeSummary`'s `emissions` memo keeps the old order when the active goal changes, as the array reference never changes. Sort a copy in `useMemo`. `displayAllGoals` is always true, so the other branch goes too (see step 3).
3. **Test disclaimer in production config.** `src/config/paths-instances.ts` has "Testing disclaimer" for `lappeenranta-nzc`. Check whether that instance is live, and remove or replace the text.
4. **Sparkline may overwrite the total with a category value.** `IndicatorSparkline` merges dimensional values by year, so a category value for a year can replace the total. Confirm with data that has dimensions, and fix the merge to keep only the totals.

## Step 2: wasted work

In order of impact:

1. **Clicking an outcome card recomputes the model on the server.** `PathsOutcomeBlock` records the active node with `router.replace(?node=…)`. That makes an RSC request for the dynamic page (no `staleTimes` is set), which re-runs `getContentPage` and all the Paths preloads, and throws the results away. Use `window.history.replaceState`, which Next syncs with `useSearchParams`.
2. **The settings panel outcome is computed on every page.** `preloadSettingsPanel` preloads `GET_INSTANCE_GOAL_OUTCOME` for every page in `(with-layout-elements)`. `SettingsPanelFull` starts in `MODE.MD`, so the server renders `GoalOutcomeBar` and waits for the data. After hydration, a page without Paths content hides the panel. Preload only when the page shows the panel: it has Paths content, or the theme doesn't allow hiding it (`allowHidingSettingsPanel`). Start in the matching mode, so server and browser agree.
3. **Two Paths requests block every plan layout, one after the other.** `getPathsClient` awaits `getPathsLocale`, which runs an uncached `GetInstanceLanguages` before `GetInstanceContext` can start. The languages rarely change: cache them across requests (`'use cache'` with a revalidation time, or `unstable_cache`).
4. **The removed impact sort still costs renders.** `CategoryTypeListBlock` only offers the `STANDARD` sort, but `handleCardLoaded` still stores each card's impact. Each `onLoaded` call (`ActionNodeSummary`, `InventoryNodeSummary`) replaces the array, which re-renders every `CategoryCard`. `handleCardLoaded` is a new function on every render, which defeats `memo` on `PathsNodeSummary`. Every `IndicatorSparkline` then rebuilds its chart, as its `option` isn't memoised. Remove `onLoaded`, `categoriesPathsData` and the impact branch, and memoise the sparkline `option`.
5. **`GetNodeContent` runs once per card and fetches fields nobody reads.** The summaries read `impactMetric.forecastValues`, `isEnabled`, `parameters`, units and, for inventory nodes, `metricDim`. These are unread:
   - `metric(goalId)`;
   - `impactMetric`'s historical and baseline values, and `yearlyCumulativeUnit`;
   - `group`, `color`, `targetYearGoal`, `quantity` and `isVisible`;
   - `inputNodes`, `outputNodes` and `shortDescription`.

   Trim the `CausalGridNode` fragment first. Batching the cards of a block into one query is a bigger change; do it only if the trimmed queries are still slow.

6. **`OutcomeNodeFields` fetches unread fields for every upstream node:** `upstreamActions` (with parameters and group), `goals(activeGoal)`, `targetYearGoal`, `quantity`, the node `unit` and `inputNodes.name`. Drop them.
7. **The sparkline query is far bigger than the sparkline.** `GET_INDICATOR_GRAPH_DATA` fetches scenarios, dimensional values, dimensions and every linked indicator's series. The sparkline reads name, unit, min/max, goals, reference value, and the values' dates and values. Give it its own query.
8. **Smaller:**
   - The node page starts its metric preload only after the node lookup; start both at once, with the decoded id.
   - `PathsOutcomeBlock` builds a new node `Map` on every render, which defeats the memos in `OutcomeCardSet` and below it. `useMemo` it on the data and the active node.
   - `DataTable` sets its slice config in an effect, which costs an extra render with a stale config on every goal change. Derive it with `useMemo`.
   - `NormalizationWidget` fetches all instance parameters only to check for null; the normalisations are in the instance context already.
   - `ParameterWidget`'s `onCompleted` sets `activeScenarioVar` to a copy, which re-renders every scenario consumer; `ScenarioSelector`'s refetch updates it already.

## Step 3: dead code

- **Unused query and fragment:** `GET_PAGE` in `get-paths-page.ts`, and `dimensionalNodePlotFragment`, which exists only for its generated type (use `DimensionalMetricFragment`).
- **Unused methods:** `PathsActionNode`'s `getId`, `getName`, `getCumulativeImpact` (which reads a field never fetched), `getTotalImpactUntil` and `getAverageImpact`.
- **Unread fields:**
  - `GetInstanceContext`: `name`, `themeIdentifier`, `owner`, `maximumHistoricalYear`, `goals.outcomeNode` and `features.showAccumulatedEffects`;
  - `GetInstanceGoalOutcome`: `isInterpolated`;
  - `PathsOutcomeBlock`: `helpText`;
  - `PathsNodeSummaryBlock`: `heading`.

  Check paths-ui's needs before trimming the instance context fields, in case step 4 shares the query.

- **Branches that never run:**
  - `PathsNodeSummary`: `displayAllGoals` is always true;
  - `ScenarioSelector`: `hideBaseScenario` is always false;
  - `CategoryCard`: a condition with `&& false`;
  - `ActionParameters`: a check on a spread object, which is always truthy;
  - `MediumSettings`: a `yearRange` check after `??`;
  - `NormalizationWidget`: an error branch after the spinner's early return.
- **Unused props and locals:**
  - `NormalizationWidget`'s `availableNormalizations`, and its unused `refetch`, `mutationData` and `mutationError`;
  - `MediumSettings`' `hidden`, which is never passed;
  - `ParameterWidget`'s `WidgetWrapper`, which is never passed;
  - `OutcomeCard`'s `positiveTotal` and `hideForecast`, and what feeds them in `OutcomeCardSet`;
  - `ProportionBar`'s `offset` and `CardSet`'s `$color`;
  - the `Bar`, `Segment` and `BarSeparator` styled components in `OutcomeCardSet`;
  - `mutationError` in `ScenarioSelector` and `ParameterWidget`;
  - the `referenceValue` cast in `IndicatorSparkline`.
- **Config never read:** `outcomeDisclaimers[].year`, as disclaimers match on node and goal only.

## Step 4: sharing with paths-ui (deferred)

paths-ui's translations mostly match Watch's: of the 121 keys in Watch's `locales/en/paths.json`, 116 exist in paths-ui's `common` namespace. Shared components can take a labels object or a namespace-bound `t`, as the node visualisation does.

| What                                                                   | Now                                                                                                                                                                                              | Effort |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| paths-ui's Apollo config (`src/common/apollo-config.ts`)               | Same logic as kausal_common's `apollo/paths-client.ts`, which paths-ui doesn't import. Its header names repeat `@common/constants/headers.mjs`                                                   | S      |
| Reactive vars                                                          | paths-ui has its own `yearRangeVar` and `activeScenarioVar`; only `activeGoalVar` is shared. Common's `PathsScenario` lacks `isUserSelected`, `isSelectable`, `kind` and `actualHistoricalYears` | S      |
| Number formatting                                                      | `useAxisLabelFormatter` is identical in both apps; `useNumberFormatter` repeats `makeInstanceFormatter`. Fixes step 1.1 for good                                                                 | S      |
| Metric accessors                                                       | paths-ui's `src/common/preprocess.ts` repeats `getMetricValue`, `getMetricChange` and `getOutcomeTotal`                                                                                          | S      |
| Paths GraphQL proxy                                                    | Watch's `/api/graphql-paths` route is hand-written; paths-ui uses `@common/graphql/proxy`. Check what extra headers that forwards to Paths                                                       | S      |
| Settings widgets: scenario, goal, parameter, normalisation, year range | Watch has older Bootstrap versions, paths-ui newer MUI ones. Needs the shared reactive vars, and Watch's Paths client hooks moved to kausal_common                                               | M–L    |
| GraphQL fragments                                                      | Small field differences; both apps' codegen configs need to include a common directory                                                                                                           | M      |
| Outcome card family                                                    | Same idea, about 300 lines of drift per file. `ScenarioBadge` is the easy start                                                                                                                  | L      |
| Small duplicates                                                       | Initial goal, scenario and year range settings; the visualisation labels hook; `NodeLinks`; the Zürich footer                                                                                    | S each |

Inside kausal_common, decide on one way to bridge app differences before moving more components. `DimensionalPieGraph` takes `t` and reads `activeGoalVar` itself, while `DimensionalNodeVisualisation` takes `labels` and `activeGoal` as props. Watch's `DataTable` also builds its own download menu where `ToolsMenu` could be used.

## Done when

- Step 1: both apps format chart values the same way; goal order follows the active goal everywhere.
- Step 2: an outcome card click makes no server request; a page without Paths content makes no Paths model request; the plan layout makes at most one uncached Paths request.
- Step 3: the listed items are gone, and `pnpm typecheck`, `pnpm exec eslint src` and `pnpm test` pass.
