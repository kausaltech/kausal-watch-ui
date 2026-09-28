# Unifying IndicatorGraph and the indicator chart blocks

Feasibility assessment (September 2026) for rendering the default indicator
graph and the configured line chart block with one component.

## Verdict

Feasible, and the code is already more than halfway there. Make
`src/components/graphs/IndicatorGraph.tsx` the single renderer and turn
`src/components/contentblocks/indicator-chart/DashboardIndicatorLineChartBlock.tsx`
into a thin data adapter in front of it. Going the other way would lose
features.

## Current state

Two renderers draw indicator time series:

- **IndicatorGraph** (generic). Fed by `deriveIndicatorGraphModel` in
  `src/components/indicators/indicator-graph-model.ts`, which builds an
  n-dimensional cube from `indicator.values` and flattens it to `ChartTrace`s.
  Used by `IndicatorVisualisation`, `FactorCharts`, and the indicator modal.
- **DashboardIndicatorLineChartBlock** (block). Fed by the backend's
  `chartSeries`: one series per category of a single dimension plus a
  null-category aggregate. Used by dashboard rows and, since configured
  defaults route through `IndicatorVisualizationBlock`, also by
  `IndicatorVisualisation` when the indicator has a default visualization.

`IndicatorVisualisation` falls back to the generic graph whenever comparison
or population normalization is active, and, via `blockCanRepresent` in
`visualization-capabilities.ts`, whenever the indicator carries a reference
value or a non-quantified goal that the time-series blocks cannot draw yet.
So the chart style flips when a user toggles either select, and some
configured defaults are never shown at all. The TODO in that file describes the unification and
names normalization and comparison as the blocker.

## Why the generic graph should survive

- **Feature superset.** IndicatorGraph has a true time axis, category axes,
  reference-value and non-quantified goal markers, a resolved y range that
  includes goal and trend bounds, tick rounding, theme marker symbols, the
  area-graph theme setting, x-axis range sync with FactorCharts, single-year
  layout, and the `indicator_graph_ready` embed event. The line block has
  only goals and a trend on top of its lines.
- **Shared code already exists.** The block delegates tooltip, toolbox,
  download filename, palette and aria description to the generic utilities in
  `indicator-graph.utils.ts`. For aria it converts its series into the generic
  trace shape (`buildBlockAriaDescription` in `indicator-charts-utility.ts`).
  That converter is essentially the adapter the unification needs.
- **The data shapes convert both ways.** The Storybook explorer
  (`src/stories/IndicatorExplorer.stories.tsx`, `buildChartSeries`) already
  builds `chartSeries` from raw indicator data. The reverse is simpler:
  category series become time traces carrying their editor color, the
  null-category series becomes a `dataType: 'total'` trace.
- **It removes the style flip.** The generic renderer already supports
  comparison and normalization, so the blocker in the TODO disappears once it
  is the renderer.
- **Table data dedupes.** The traces the adapter produces are what
  `src/components/indicators/visualization-table-data.ts` rebuilds separately
  for the accessible table.

## Behavioural differences to decide

Small individually, but product decisions rather than mechanical work.

| Aspect       | Block today                                                            | Generic today                                                         |
| ------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| X axis       | Category axis of formatted date keys; irregular years equally spaced   | True time axis                                                        |
| Y axis       | ECharts auto-scale; honors min, max, tick count only                   | Padded and rounded range incl. goal/trend extents; tick rounding      |
| Trend        | Last 10 points, needs 2, any resolution                                | Needs 5 yearly points, YEAR only                                      |
| Area setting | Ignored                                                                | Theme `areaGraphs` turns lines into areas; needs a per-chart override |
| Layout       | Fixed 400px, bottom-right legend, dimension heading, no in-chart title | 450px default, in-chart title, legend-hiding heuristic                |
| Goal names   | Scenario names inline in the fragment                                  | Scenario ids resolved against plan scenarios                          |
| Aria         | Delegates to the generic builder                                       | Same builder; identical output                                        |

## Suggested route

1. **Adapter.** Map a line-chart fragment to the generic props: traces, goal
   traces, trend trace, y range via `resolveYAxisRange`, specification and
   time resolution. Reuse the block's `buildDimSeries` and `buildTotalSeries`
   internally. Unit test against the fixtures in
   `visualization-table-data.test.ts`.
2. **Render through IndicatorGraph.** Add the few layout props it lacks
   (legend placement, area override), then have the line block render
   IndicatorGraph via the adapter, keeping its dimension heading. The block
   shrinks from about 240 lines to a heading plus one call, and the
   `VisualizationReadySignal` wrapper in `IndicatorVisualisation` becomes
   unnecessary.
3. **Table builder.** Point the line branch of `visualization-table-data.ts`
   at the same adapter and delete the duplicate.
4. **Area next, bar and pie later.** Area is the same adapter plus the area
   flag. Bar needs a time-axis bar mode the generic graph does not have. Pie
   is a different chart. Both can stay as blocks.

## Verification

The Storybook explorer renders the generic graph and the block side by side
with live data. Use it before and after each step to catch visual
regressions. Rough size for line and area is one to two days including visual
checks; most of the work is deleting code.
