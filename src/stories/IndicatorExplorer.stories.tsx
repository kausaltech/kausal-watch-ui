import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider, useQuery } from '@apollo/client/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { addons } from 'storybook/preview-api';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';
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
      values(includeDimensions: true) {
        id
      }
      goals {
        id
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
      }
      dimensions {
        dimension {
          name
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
        values: { id: string }[];
        goals: { id: string }[] | null;
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
        defaultVisualization: { __typename: string } | null;
        dimensions: { dimension: { name: string } }[];
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
    ['nonQuantifiedGoal', indicator.nonQuantifiedGoal],
    ['nonQuantifiedGoalDate', indicator.nonQuantifiedGoalDate],
    [
      'referenceValue',
      indicator.referenceValue &&
        `${indicator.referenceValue.value} (${indicator.referenceValue.date ?? 'no date'})`,
    ],
    ['defaultVisualization', indicator.defaultVisualization?.__typename],
    [
      'dimensions',
      indicator.dimensions.length
        ? indicator.dimensions.map((d) => d.dimension.name).join(', ')
        : null,
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
                <td>{formatSettingValue(value)}</td>
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

    > h4 {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #666;
      margin: 0 0 0.5rem;
    }
  }
`;

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

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}

function IndicatorComparisonList({ plan }: { plan: string }) {
  const themes = useMemo(getThemes, []);
  const { data, loading, error } = useQuery<ExplorerQueryData, ExplorerQueryVariables>(
    GET_PLAN_INDICATORS,
    { variables: { plan } }
  );

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

  if (loading) return <Message>Loading indicators for “{plan}”…</Message>;
  if (error) return <Message>Error: {error.message}</Message>;
  if (!data?.plan) return <Message>No plan found with identifier “{plan}”.</Message>;

  const indicators = data.planIndicators ?? [];

  return (
    <>
      <h2>
        {data.plan.name}{' '}
        <small>
          ({data.plan.organization.name} · {indicators.length} indicators · theme:{' '}
          {themeFound ? themeKey : `${themeKey} not found locally, using toolbar theme`})
        </small>
      </h2>
      {indicators.length === 0 && <Message>This plan has no indicators.</Message>}
      {indicators.map((indicator) => (
        <ComparisonRow key={indicator.id}>
          <header>
            <h3>{indicator.name}</h3>
            <small>#{indicator.id}</small>
            {indicator.level && <LevelBadge>{indicator.level}</LevelBadge>}
            <small>
              {indicator.unit?.shortName ?? indicator.unit?.name}
              {' · '}
              {indicator.timeResolution.toLowerCase()}
              {` · ${indicator.values.length} data points`}
              {(indicator.goals?.length ?? 0) > 0 && ` · ${indicator.goals!.length} goals`}
              {indicator.latestValue && ` · latest ${indicator.latestValue.date}`}
            </small>
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
              <div>
                <h4>New (ECharts)</h4>
                <IndicatorVisualisation
                  indicatorId={indicator.id}
                  useLegacyGraph={false}
                  showTable={false}
                />
              </div>
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
