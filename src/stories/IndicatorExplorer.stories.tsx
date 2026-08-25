import {
  type FormEvent,
  type ReactNode,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider, useQuery } from '@apollo/client/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';
import IndicatorVisualizationBlock, {
  type IndicatorVisualizationBlockData,
} from '@/components/indicators/IndicatorVisualizationBlock';
import PlanProvider from '@/components/providers/PlanProvider';
import { MOCK_PLAN } from '@/stories/mocks/plan.mocks';

/**
 * A developer tool for comparing the legacy (Plotly) and new (ECharts)
 * IndicatorGraph components side by side with real data from any plan,
 * independent of the URL-based plan resolution used by the app. It talks
 * directly to the backend GraphQL API (which allows CORS from any origin),
 * so no Next.js proxy is needed. Each row renders the production
 * IndicatorVisualisation pipeline twice: legacy graph left, new graph right.
 *
 * If a gitignored `.env.instances.local.json` exists at the repo root
 * (see `loadLocalInstances()` in .storybook/main.ts for the shape), the
 * header shows instance + plan selects populated from it; otherwise it
 * falls back to a free-text plan identifier input against the `apiUrl` arg.
 */

const DEFAULT_API_URL = 'https://api.watch.kausal.tech';

interface LocalInstance {
  name: string;
  apiUrl: string;
  plans: string[];
}

function getLocalInstances(): LocalInstance[] {
  try {
    return JSON.parse(process.env.LOCAL_INSTANCES ?? 'null') ?? [];
  } catch {
    return [];
  }
}

function toGraphqlEndpoint(apiUrl: string) {
  return `${apiUrl.replace(/\/+$/, '')}/v1/graphql/`;
}

// All themes known to Storybook, keyed by theme identifier
// (injected by .storybook/main.ts, same data the theme toolbar uses).
function getThemes(): Record<string, Record<string, unknown>> {
  try {
    return JSON.parse(process.env.THEMES ?? 'null') ?? {};
  } catch {
    return {};
  }
}

const GET_PLAN_INDICATORS = gql`
  query StorybookIndicatorExplorer($plan: ID!) {
    plan(id: $plan) {
      id
      name
      themeIdentifier
      viewUrl
      organization {
        name
      }
    }
    planIndicators(plan: $plan) {
      id
      name
      level(plan: $plan)
      timeResolution
      unit {
        name
        shortName
      }
      latestValue {
        date
        value
      }
      description
      values(includeDimensions: true) {
        id
        value
        date
        categories {
          id
        }
      }
      goals {
        id
        value
        date
      }
      minValue
      maxValue
      ticksCount
      ticksRounding
      valueRounding
      desiredTrend
      showTrendline
      showTotalLine
      dataCategoriesAreStackable
      nonQuantifiedGoal
      nonQuantifiedGoalDate
      quantity {
        name
      }
      referenceValue {
        value
        date
      }
      defaultVisualization {
        __typename
        ... on IndicatorDefaultBarChart {
          dimension {
            id
            name
          }
          barType
        }
        ... on IndicatorDefaultLineChart {
          dimension {
            id
            name
          }
        }
        ... on IndicatorDefaultAreaChart {
          dimension {
            id
            name
          }
        }
        ... on IndicatorDefaultPieChart {
          dimension {
            id
            name
          }
          year
        }
      }
      dimensions {
        dimension {
          id
          name
          categories {
            id
            name
            defaultColor
          }
        }
      }
    }
  }
`;

interface ExplorerQueryData {
  plan: {
    id: string;
    name: string;
    themeIdentifier: string | null;
    viewUrl: string | null;
    organization: { name: string };
  } | null;
  planIndicators:
    | {
        id: string;
        name: string;
        level: string | null;
        timeResolution: string;
        unit: { name: string; shortName: string | null } | null;
        latestValue: { date: string; value: number } | null;
        description: string | null;
        values: {
          id: string;
          value: number;
          date: string | null;
          categories: { id: string }[];
        }[];
        goals: { id: string; value: number; date: string | null }[] | null;
        minValue: number | null;
        maxValue: number | null;
        ticksCount: number | null;
        ticksRounding: number | null;
        valueRounding: number | null;
        desiredTrend: string | null;
        showTrendline: boolean;
        showTotalLine: boolean;
        dataCategoriesAreStackable: boolean;
        nonQuantifiedGoal: string | null;
        nonQuantifiedGoalDate: string | null;
        quantity: { name: string } | null;
        referenceValue: { value: number; date: string | null } | null;
        defaultVisualization: {
          __typename: string;
          dimension?: { id: string; name: string } | null;
          barType?: string | null;
          year?: number | null;
        } | null;
        dimensions: {
          dimension: {
            id: string;
            name: string;
            categories: { id: string; name: string; defaultColor: string }[];
          };
        }[];
      }[]
    | null;
}

type ExplorerIndicator = NonNullable<ExplorerQueryData['planIndicators']>[number];

interface ExplorerQueryVariables {
  plan: string;
}

const Page = styled.div`
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    sans-serif;
  color: #1a1a1a;
  min-height: 100vh;
  background: #fff;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: #103c3a;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;

  h1 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 1rem 0 0;
    white-space: nowrap;
    color: inherit;
  }

  form,
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  input,
  select {
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
    border: none;
    border-radius: 4px;
    background: #fff;
    color: #1a1a1a;
  }

  input {
    min-width: 16rem;
  }

  button {
    font-size: 0.9rem;
    padding: 0.4rem 0.9rem;
    border: none;
    border-radius: 4px;
    background: #2ba0a0;
    color: #fff;
    cursor: pointer;
  }
`;

const Content = styled.main`
  padding: 1.5rem;
`;

const Message = styled.p`
  color: #555;
  font-size: 0.95rem;
`;

const LevelBadge = styled.span`
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background: #e8f0ef;
  color: #103c3a;
  text-transform: capitalize;
`;

const ComparisonRow = styled.section`
  margin-bottom: 2.5rem;
  border: 1px solid #e2e2e2;
  border-radius: 6px;

  > header {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    background: #f4f4f4;
    border-bottom: 1px solid #e2e2e2;
    font-size: 0.9rem;

    h3 {
      font-size: 1rem;
      margin: 0;

      a {
        color: inherit;
        text-decoration: none;

        &:hover {
          color: #2ba0a0;
          text-decoration: underline;
        }
      }
    }

    small {
      color: #666;
    }
  }
`;

const SettingsDetails = styled.details`
  position: relative;
  margin-left: auto;
  font-size: 0.75rem;

  summary {
    cursor: pointer;
    color: #2ba0a0;
    user-select: none;
    white-space: nowrap;
  }

  > div {
    position: absolute;
    right: 0;
    z-index: 20;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 0.1rem 0 0.1rem 0.75rem;
    white-space: nowrap;
    text-align: left;

    &:first-of-type {
      color: #666;
      padding-left: 0;
    }
  }
`;

function formatSettingValue(value: unknown): string {
  if (value == null || value === '') return '–';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return String(value);
}

/** Collapsible listing of the indicator's own visualisation-affecting
 *  settings, which override theme defaults in the graph components. */
function VisualisationSettings({ indicator }: { indicator: ExplorerIndicator }) {
  const entries: [string, unknown][] = [
    ['quantity', indicator.quantity?.name],
    ['minValue', indicator.minValue],
    ['maxValue', indicator.maxValue],
    ['ticksCount', indicator.ticksCount],
    ['ticksRounding', indicator.ticksRounding],
    ['valueRounding', indicator.valueRounding],
    ['desiredTrend', indicator.desiredTrend],
    ['showTrendline', indicator.showTrendline],
    ['showTotalLine', indicator.showTotalLine],
    ['stackable', indicator.dataCategoriesAreStackable],
    [
      'nonQuantifiedGoal',
      indicator.nonQuantifiedGoal &&
        `${indicator.nonQuantifiedGoal} (${indicator.nonQuantifiedGoalDate ?? 'no date'})`,
    ],
    [
      'referenceValue',
      indicator.referenceValue &&
        `${indicator.referenceValue.value} (${indicator.referenceValue.date ?? 'no date'})`,
    ],
    ['defaultVisualization', indicator.defaultVisualization?.__typename],
    ['groupingDimension', indicator.defaultVisualization?.dimension?.name],
    ['barType', indicator.defaultVisualization?.barType],
    ['pieChartYear', indicator.defaultVisualization?.year],
    [
      'dimensions',
      indicator.dimensions.length ? (
        <>
          {indicator.dimensions.map(({ dimension }) => (
            <div key={dimension.id}>
              {dimension.name}:{' '}
              {dimension.categories.map((cat) => (
                <Swatch
                  key={cat.id}
                  style={{ background: cat.defaultColor || 'transparent' }}
                  title={`${cat.name}: ${cat.defaultColor || 'no color'}`}
                />
              ))}
            </div>
          ))}
        </>
      ) : null,
    ],
  ];
  const setCount = entries.filter(
    ([, value]) => value != null && value !== false && value !== ''
  ).length;

  return (
    <SettingsDetails>
      <summary>settings ({setCount} set)</summary>
      <div>
        <table>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key} style={value == null ? { opacity: 0.5 } : undefined}>
                <td>{key}</td>
                <td>{isValidElement(value) ? value : formatSettingValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsDetails>
  );
}

const GraphColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div {
    padding: 0.75rem;
    min-width: 0;

    &:first-of-type {
      border-right: 1px solid #e2e2e2;
    }

    h4 {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #666;
      margin: 0 0 0.5rem;
    }
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  h4 {
    margin: 0 !important;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #666;
  }

  select {
    font-size: 0.8rem;
    padding: 0.15rem 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: #1a1a1a;
  }
`;

const VISUALIZATION_KINDS = ['default', 'bar', 'line', 'area', 'pie', 'summary'] as const;
type VisualizationKind = (typeof VISUALIZATION_KINDS)[number];

/** Replicate the backend's DashboardIndicatorChartBaseBlock.chart_series:
 *  one series per category of the chosen dimension containing the values
 *  tagged with that category, or a single dimensionless series of the
 *  values that have no categories. */
function buildChartSeries(indicator: ExplorerIndicator) {
  const dimension = indicator.dimensions[0]?.dimension ?? null;
  const sortedValues = [...indicator.values].sort((a, b) =>
    (a.date ?? '').localeCompare(b.date ?? '')
  );
  const categories = dimension ? dimension.categories : [null];
  const chartSeries = categories.map((category) => ({
    __typename: 'DashboardIndicatorChartSeries' as const,
    dimensionCategory: category,
    values: sortedValues.filter((value) =>
      category ? value.categories.some((c) => c.id === category.id) : value.categories.length === 0
    ),
  }));
  return { dimension, chartSeries };
}

/** Build the same block data shape the backend would return in
 *  `defaultVisualization` if the given visualization kind were configured
 *  on the indicator, so any kind can be previewed with live data even
 *  though the API only serves the one actually stored. */
function synthesizeVisualization(
  indicator: ExplorerIndicator,
  kind: Exclude<VisualizationKind, 'default'>
): IndicatorVisualizationBlockData {
  const blockIndicator = {
    __typename: 'Indicator' as const,
    id: indicator.id,
    name: indicator.name,
    description: indicator.description,
    showTrendline: indicator.showTrendline,
    valueRounding: indicator.valueRounding,
    minValue: indicator.minValue,
    maxValue: indicator.maxValue,
    ticksCount: indicator.ticksCount,
    ticksRounding: indicator.ticksRounding,
    timeResolution: indicator.timeResolution,
    latestValue: indicator.latestValue,
    dataCategoriesAreStackable: indicator.dataCategoriesAreStackable,
    goals: indicator.goals,
    unit: indicator.unit,
    desiredTrend: indicator.desiredTrend,
  };

  if (kind === 'summary') {
    return {
      __typename: 'IndicatorDefaultSummary',
      indicator: blockIndicator,
    } as unknown as IndicatorVisualizationBlockData;
  }

  const { dimension, chartSeries } = buildChartSeries(indicator);
  const common = { indicator: blockIndicator, dimension, chartSeries };

  switch (kind) {
    case 'bar':
      return {
        __typename: 'IndicatorDefaultBarChart',
        ...common,
        // When the indicator's configured default visualization is a bar
        // chart, preview with the backend-resolved barType (which overrides
        // the indicator's stackable setting). Otherwise leave unset so the
        // stackable setting decides.
        barType:
          indicator.defaultVisualization?.__typename === 'IndicatorDefaultBarChart'
            ? (indicator.defaultVisualization.barType ?? null)
            : null,
      } as unknown as IndicatorVisualizationBlockData;
    case 'line':
    case 'area':
      return {
        __typename: kind === 'line' ? 'IndicatorDefaultLineChart' : 'IndicatorDefaultAreaChart',
        ...common,
        showTotalLine: indicator.showTotalLine,
      } as unknown as IndicatorVisualizationBlockData;
    case 'pie': {
      const years = chartSeries
        .flatMap((series) => series.values)
        .map((value) => (value.date ? new Date(value.date).getFullYear() : null))
        .filter((year): year is number => year != null);
      return {
        __typename: 'IndicatorDefaultPieChart',
        ...common,
        year: years.length ? Math.max(...years) : null,
      } as unknown as IndicatorVisualizationBlockData;
    }
  }
}

/** Right-hand column: the new ECharts rendering, with a selector for
 *  previewing the indicator as any of the visualization kinds an admin
 *  could configure as its defaultVisualization. */
const KIND_BY_DEFAULT_VISUALIZATION: Record<string, VisualizationKind> = {
  IndicatorDefaultBarChart: 'bar',
  IndicatorDefaultLineChart: 'line',
  IndicatorDefaultAreaChart: 'area',
  IndicatorDefaultPieChart: 'pie',
  IndicatorDefaultSummary: 'summary',
};

/** Tinted when previewing a specific visualization kind, so synthesized
 *  block previews are easy to tell apart from the app's default rendering. */
const PreviewColumn = styled.div<{ $active: boolean }>`
  background: ${({ $active, theme }) => ($active ? theme.graphColors.blue010 : 'transparent')};
`;

const BlockSettingsRow = styled.div`
  font-size: 0.75rem;
  color: #555;
  margin: -0.25rem 0 0.5rem;

  code {
    font-size: inherit;
  }
`;

/** The block-type-specific settings of the previewed visualization block,
 *  i.e. what an editor would configure on the Wagtail chart block. */
function getBlockSettings(block: IndicatorVisualizationBlockData): [string, unknown][] {
  switch (block.__typename) {
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart':
      return [
        ['dimension', block.dimension?.name],
        ['barType', block.barType],
      ];
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart':
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart':
      return [
        ['dimension', block.dimension?.name],
        ['showTotalLine', block.showTotalLine],
      ];
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart':
      return [
        ['dimension', block.dimension?.name],
        ['year', block.year],
      ];
    default:
      return [];
  }
}

const OverrideAlert = styled.div`
  font-size: 0.75rem;
  background: #fff3cd;
  border: 1px solid #ffe08a;
  border-radius: 4px;
  padding: 0.2rem 0.5rem;
  color: #7a5d00;
  margin: 0 0 0.5rem;
`;

/** Cases where a block setting overrides the indicator's own default,
 *  worth calling out when eyeballing renders. */
function getBlockOverrideWarnings(block: IndicatorVisualizationBlockData): string[] {
  const warnings: string[] = [];
  if (
    (block.__typename === 'DashboardIndicatorBarChartBlock' ||
      block.__typename === 'IndicatorDefaultBarChart') &&
    block.barType === 'stacked' &&
    block.indicator?.dataCategoriesAreStackable === false
  ) {
    warnings.push(
      'barType: stacked overrides the indicator setting stackable: false — bars are stacked'
    );
  }
  return warnings;
}

function EChartsPreviewColumn({ indicator }: { indicator: ExplorerIndicator }) {
  const [kind, setKind] = useState<VisualizationKind>(
    () =>
      (indicator.defaultVisualization &&
        KIND_BY_DEFAULT_VISUALIZATION[indicator.defaultVisualization.__typename]) ||
      'default'
  );
  const block = useMemo(
    () => (kind === 'default' ? null : synthesizeVisualization(indicator, kind)),
    [indicator, kind]
  );

  return (
    <PreviewColumn $active={kind !== 'default'}>
      <ColumnHeader>
        <h4>New (ECharts)</h4>
        <label>
          Preview as
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value as VisualizationKind)}
          >
            {VISUALIZATION_KINDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </ColumnHeader>
      {block && (
        <BlockSettingsRow>
          block settings:{' '}
          <code>
            {getBlockSettings(block)
              .map(([key, value]) => `${key}: ${formatSettingValue(value)}`)
              .join(' · ')}
          </code>
        </BlockSettingsRow>
      )}
      {block &&
        getBlockOverrideWarnings(block).map((warning) => (
          <OverrideAlert key={warning}>⚠️ {warning}</OverrideAlert>
        ))}
      {block ? (
        <IndicatorVisualizationBlock block={block} />
      ) : (
        <IndicatorVisualisation
          indicatorId={indicator.id}
          useLegacyGraph={false}
          showTable={false}
        />
      )}
    </PreviewColumn>
  );
}

/** Mount children only when scrolled near the viewport, to avoid rendering
 *  dozens of heavy Plotly/ECharts instances at once. */
function LazyRender({ children, minHeight = 500 }: { children: ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  // Keep minHeight as a permanent floor: the children start out as short
  // loading placeholders while their queries run, and letting the row
  // collapse below the placeholder height while scrolling makes the page
  // height yo-yo, which throws the scroll position back up the page.
  return (
    <div ref={ref} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}

const PlanHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
  }
`;

const Swatch = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-right: 3px;
  vertical-align: middle;
`;

const isColorValue = (value: unknown): value is string =>
  typeof value === 'string' &&
  (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl'));

function renderGraphSettingValue(value: unknown): ReactNode {
  if (value == null || (Array.isArray(value) && value.length === 0)) return '–';
  if (Array.isArray(value)) {
    if (value.every(isColorValue)) {
      return value.map((color, i) => (
        <Swatch key={i} style={{ background: color }} title={color} />
      ));
    }
    return value.map(String).join(', ');
  }
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (isColorValue(value)) {
    return (
      <>
        <Swatch style={{ background: value }} title={value} /> {value}
      </>
    );
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/** Collapsible listing of the active theme's `settings.graphs` variables
 *  (as the chart components see them via the Emotion theme), highlighting
 *  the ones that differ from the default theme. */
function GraphSettingsPanel({ defaultGraphs }: { defaultGraphs: Record<string, unknown> }) {
  const theme = useTheme();
  const activeGraphs: Record<string, unknown> = theme.settings?.graphs ?? {};
  const keys = Array.from(
    new Set([...Object.keys(defaultGraphs), ...Object.keys(activeGraphs)])
  ).sort();
  const rows = keys.map((key) => ({
    key,
    value: activeGraphs[key],
    defaultValue: defaultGraphs[key],
    differs: JSON.stringify(activeGraphs[key]) !== JSON.stringify(defaultGraphs[key]),
  }));
  const diffCount = rows.filter((row) => row.differs).length;

  return (
    <SettingsDetails>
      <summary>graph settings ({diffCount} differ from default)</summary>
      <div>
        <table>
          <thead>
            <tr style={{ fontWeight: 600 }}>
              <td />
              <td>value</td>
              <td>default</td>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} style={row.differs ? { background: '#fff3cd' } : undefined}>
                <td>{row.key}</td>
                <td>{renderGraphSettingValue(row.value)}</td>
                <td>{row.differs ? renderGraphSettingValue(row.defaultValue) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SettingsDetails>
  );
}

const plural = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`;

/** One-line summary of the indicator's data shape for the row header. */
function describeIndicator(indicator: ExplorerIndicator): string {
  const parts = [
    indicator.timeResolution.toLowerCase(),
    plural(indicator.values.length, 'data point'),
  ];
  if (indicator.dimensions.length > 0) {
    const catCounts = indicator.dimensions.map((d) => d.dimension.categories.length).join('/');
    parts.push(`${plural(indicator.dimensions.length, 'dim')} with ${catCounts} cats`);
  }
  if (indicator.goals?.length) {
    parts.push(plural(indicator.goals.length, 'goal'));
  }
  const defaultViz =
    indicator.defaultVisualization &&
    KIND_BY_DEFAULT_VISUALIZATION[indicator.defaultVisualization.__typename];
  if (defaultViz) {
    parts.push(`default viz: ${defaultViz}`);
  }
  return parts.join(' · ');
}

function IndicatorComparisonList({ plan }: { plan: string }) {
  const themes = useMemo(getThemes, []);
  const {
    data: currentData,
    previousData,
    loading,
    error,
  } = useQuery<ExplorerQueryData, ExplorerQueryVariables>(GET_PLAN_INDICATORS, {
    variables: { plan },
  });
  // Keep rendering the previous result if the query ever reloads (e.g. a
  // cache write from a row's own indicator query invalidating this one) —
  // unmounting the whole list would reset the scroll position and all
  // LazyRender states.
  const data = currentData ?? previousData;

  // Resolve the plan's theme the same way the app does (layout.tsx):
  // explicit themeIdentifier, falling back to the plan identifier.
  const themeKey = data?.plan ? data.plan.themeIdentifier || plan : undefined;
  const themeFound = themeKey != null && themeKey in themes;

  // Wire the resolved theme to the addon-themes toolbar: updating the
  // `theme` global makes the withKausalThemes decorator re-render the story
  // with the plan's theme (Emotion + MUI providers, global styles, and the
  // theme CSS file), and keeps the toolbar selector in sync. The toolbar can
  // still be used to override the theme afterwards.
  useEffect(() => {
    if (!themeFound) return;
    addons.getChannel().emit(UPDATE_GLOBALS, { globals: { theme: themeKey } });
  }, [themeFound, themeKey]);

  if (loading && !data) return <Message>Loading indicators for “{plan}”…</Message>;
  if (error) return <Message>Error: {error.message}</Message>;
  if (!data?.plan) {
    return loading ? (
      <Message>Loading indicators for “{plan}”…</Message>
    ) : (
      <Message>No plan found with identifier “{plan}”.</Message>
    );
  }

  const indicators = data.planIndicators ?? [];

  return (
    <>
      <PlanHeader>
        <h2>
          {data.plan.name}{' '}
          <small>
            ({data.plan.organization.name} · {indicators.length} indicators · theme:{' '}
            {themeFound ? themeKey : `${themeKey} not found locally, using toolbar theme`})
          </small>
        </h2>
        <GraphSettingsPanel
          defaultGraphs={
            (themes.default?.settings?.graphs ?? {}) as unknown as Record<string, unknown>
          }
        />
      </PlanHeader>
      {indicators.length === 0 && <Message>This plan has no indicators.</Message>}
      {indicators.map((indicator) => (
        <ComparisonRow key={indicator.id}>
          <header>
            <h3>
              {data.plan.viewUrl ? (
                <a
                  href={`${data.plan.viewUrl.replace(/\/+$/, '')}/indicators/${indicator.id}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Open the live indicator view"
                >
                  {indicator.name}
                </a>
              ) : (
                indicator.name
              )}
            </h3>
            <small>#{indicator.id}</small>
            {indicator.level && indicator.level.toLowerCase() !== 'unspecified' && (
              <LevelBadge>{indicator.level}</LevelBadge>
            )}
            <small>{describeIndicator(indicator)}</small>
            <VisualisationSettings indicator={indicator} />
          </header>
          <LazyRender>
            <GraphColumns>
              <div>
                <h4>Legacy (Plotly)</h4>
                <IndicatorVisualisation
                  indicatorId={indicator.id}
                  useLegacyGraph
                  showTable={false}
                />
              </div>
              <EChartsPreviewColumn indicator={indicator} />
            </GraphColumns>
          </LazyRender>
        </ComparisonRow>
      ))}
    </>
  );
}

function InstanceSelector({
  instances,
  value,
  onChange,
}: {
  instances: LocalInstance[];
  value: { apiUrl: string; plan: string };
  onChange: (apiUrl: string, plan: string) => void;
}) {
  const initialInstance =
    instances.find((instance) => instance.apiUrl === value.apiUrl) ?? instances[0];
  const [instanceName, setInstanceName] = useState(initialInstance.name);
  const [plan, setPlan] = useState(value.plan);
  const instance = instances.find((i) => i.name === instanceName) ?? instances[0];
  const sortedPlans = useMemo(() => [...instance.plans].sort(), [instance]);

  function handleInstanceChange(name: string) {
    setInstanceName(name);
    setPlan('');
    const newInstance = instances.find((i) => i.name === name);
    if (newInstance) onChange(newInstance.apiUrl, '');
  }

  function handlePlanChange(identifier: string) {
    setPlan(identifier);
    onChange(instance.apiUrl, identifier);
  }

  return (
    <>
      <label>
        Instance
        <select value={instanceName} onChange={(event) => handleInstanceChange(event.target.value)}>
          {instances.map((i) => (
            <option key={i.name} value={i.name}>
              {i.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Plan
        <select value={plan} onChange={(event) => handlePlanChange(event.target.value)}>
          <option value="">Select a plan… ({sortedPlans.length})</option>
          {sortedPlans.map((identifier) => (
            <option key={identifier} value={identifier}>
              {identifier}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

function PlanIdentifierInput({
  initialPlanIdentifier,
  onSubmit,
}: {
  initialPlanIdentifier?: string;
  onSubmit: (plan: string) => void;
}) {
  const [input, setInput] = useState(initialPlanIdentifier ?? '');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit(input.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Plan identifier, e.g. tampere-ilmasto"
        aria-label="Plan identifier"
      />
      <button type="submit">Load</button>
    </form>
  );
}

interface IndicatorExplorerProps {
  /** Fallback GraphQL API root when no .env.instances.local.json is present */
  apiUrl: string;
  /** Plan identifier to load on first render */
  initialPlanIdentifier?: string;
}

// Preserve the selection across story remounts (updating the theme global
// re-renders the story through the decorators).
let lastSelection: { apiUrl: string; plan: string } | undefined;

function IndicatorExplorer({ apiUrl, initialPlanIdentifier = '' }: IndicatorExplorerProps) {
  const instances = useMemo(getLocalInstances, []);
  const hasInstances = instances.length > 0;
  const [selection, setSelectionState] = useState(
    () =>
      lastSelection ?? {
        apiUrl: hasInstances
          ? (instances.find((i) => i.plans.includes(initialPlanIdentifier)) ?? instances[0]).apiUrl
          : apiUrl,
        plan:
          hasInstances && !instances.some((i) => i.plans.includes(initialPlanIdentifier))
            ? ''
            : initialPlanIdentifier,
      }
  );

  function setSelection(next: { apiUrl: string; plan: string }) {
    lastSelection = next;
    setSelectionState(next);
  }

  const endpoint = toGraphqlEndpoint(hasInstances ? selection.apiUrl : apiUrl);
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: endpoint }),
        cache: new InMemoryCache(),
      }),
    [endpoint]
  );

  // IndicatorVisualisation reads the plan identifier for its GraphQL query
  // from PlanContext, so override the decorator-provided mock plan with the
  // selected identifier (and disable features whose UI we don't want here).
  const contextPlan: PlanContextFragment = useMemo(
    () => ({
      ...MOCK_PLAN,
      identifier: selection.plan,
      features: { ...MOCK_PLAN.features, enableIndicatorComparison: false },
    }),
    [selection.plan]
  );

  return (
    <Page>
      <Header>
        <h1>Indicator explorer</h1>
        {hasInstances ? (
          <InstanceSelector
            instances={instances}
            value={selection}
            onChange={(newApiUrl, plan) => setSelection({ apiUrl: newApiUrl, plan })}
          />
        ) : (
          <PlanIdentifierInput
            initialPlanIdentifier={selection.plan}
            onSubmit={(plan) => setSelection({ apiUrl: selection.apiUrl, plan })}
          />
        )}
      </Header>
      <Content>
        {selection.plan ? (
          <ApolloProvider client={client}>
            <PlanProvider plan={contextPlan}>
              <IndicatorComparisonList plan={selection.plan} />
            </PlanProvider>
          </ApolloProvider>
        ) : (
          <Message>
            {hasInstances
              ? 'Pick an instance and a plan above.'
              : 'Type a plan identifier above and press Load.'}
          </Message>
        )}
      </Content>
    </Page>
  );
}

const meta = {
  title: 'Dev tools/IndicatorExplorer',
  component: IndicatorExplorer,
  parameters: {
    layout: 'fullscreen',
    // A dev tool rendering live, nondeterministic API data — not something
    // Chromatic can meaningfully snapshot.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof IndicatorExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    apiUrl: DEFAULT_API_URL,
    initialPlanIdentifier: 'tampere-ilmasto',
  },
};
