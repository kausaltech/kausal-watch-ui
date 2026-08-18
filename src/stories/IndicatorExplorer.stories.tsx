import { type FormEvent, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 * A developer tool for inspecting the indicators of any plan (instance),
 * independent of the URL-based plan resolution used by the app. It talks
 * directly to the backend GraphQL API (which allows CORS from any origin),
 * so no Next.js proxy or PlanContext is needed.
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

const GET_PLAN_INDICATORS = gql`
  query StorybookIndicatorExplorer($plan: ID!) {
    plan(id: $plan) {
      id
      name
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
      organization {
        name
      }
    }
  }
`;

interface ExplorerQueryData {
  plan: {
    id: string;
    name: string;
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
        organization: { name: string } | null;
      }[]
    | null;
}

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

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.85rem;
  }

  th,
  td {
    text-align: left;
    padding: 0.4rem 0.75rem;
    border-bottom: 1px solid #e2e2e2;
    vertical-align: top;
  }

  th {
    background: #f4f4f4;
    position: sticky;
    top: 3.3rem;
  }

  td.numeric {
    text-align: right;
    white-space: nowrap;
  }
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

interface IndicatorExplorerProps {
  /** Fallback GraphQL API root when no .env.instances.local.json is present */
  apiUrl: string;
  /** Plan identifier to load on first render */
  initialPlanIdentifier?: string;
}

function IndicatorList({ client, plan }: { client: ApolloClient; plan: string }) {
  const { data, loading, error } = useQuery<ExplorerQueryData, ExplorerQueryVariables>(
    GET_PLAN_INDICATORS,
    { client, variables: { plan } }
  );

  if (loading) return <Message>Loading indicators for “{plan}”…</Message>;
  if (error) return <Message>Error: {error.message}</Message>;
  if (!data?.plan) return <Message>No plan found with identifier “{plan}”.</Message>;

  const indicators = data.planIndicators ?? [];
  const numberFormat = new Intl.NumberFormat();

  return (
    <>
      <h2>
        {data.plan.name}{' '}
        <small>
          ({data.plan.organization.name} · {indicators.length} indicators)
        </small>
      </h2>
      {indicators.length === 0 ? (
        <Message>This plan has no indicators.</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>Latest value</th>
              <th>Unit</th>
              <th>Resolution</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator) => (
              <tr key={indicator.id}>
                <td>{indicator.id}</td>
                <td>{indicator.name}</td>
                <td>{indicator.level && <LevelBadge>{indicator.level}</LevelBadge>}</td>
                <td className="numeric">
                  {indicator.latestValue &&
                    `${numberFormat.format(indicator.latestValue.value)} (${
                      indicator.latestValue.date
                    })`}
                </td>
                <td>{indicator.unit?.shortName ?? indicator.unit?.name}</td>
                <td>{indicator.timeResolution.toLowerCase()}</td>
                <td>{indicator.organization?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

function InstanceSelector({
  instances,
  initialPlanIdentifier,
  onChange,
}: {
  instances: LocalInstance[];
  initialPlanIdentifier?: string;
  onChange: (apiUrl: string, plan: string) => void;
}) {
  const initialInstance =
    (initialPlanIdentifier &&
      instances.find((instance) => instance.plans.includes(initialPlanIdentifier))) ||
    instances[0];
  const [instanceName, setInstanceName] = useState(initialInstance.name);
  const [plan, setPlan] = useState(
    initialPlanIdentifier && initialInstance.plans.includes(initialPlanIdentifier)
      ? initialPlanIdentifier
      : ''
  );
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

function IndicatorExplorer({ apiUrl, initialPlanIdentifier = '' }: IndicatorExplorerProps) {
  const instances = useMemo(getLocalInstances, []);
  const hasInstances = instances.length > 0;
  const [selection, setSelection] = useState(() => ({
    apiUrl: hasInstances
      ? (instances.find((i) => i.plans.includes(initialPlanIdentifier)) ?? instances[0]).apiUrl
      : apiUrl,
    plan:
      hasInstances && !instances.some((i) => i.plans.includes(initialPlanIdentifier))
        ? ''
        : initialPlanIdentifier,
  }));

  const endpoint = toGraphqlEndpoint(hasInstances ? selection.apiUrl : apiUrl);
  const client = useMemo(
    () =>
      new ApolloClient({
        link: new HttpLink({ uri: endpoint }),
        cache: new InMemoryCache(),
      }),
    [endpoint]
  );

  return (
    <Page>
      <Header>
        <h1>Indicator explorer</h1>
        {hasInstances ? (
          <InstanceSelector
            instances={instances}
            initialPlanIdentifier={initialPlanIdentifier}
            onChange={(newApiUrl, plan) => setSelection({ apiUrl: newApiUrl, plan })}
          />
        ) : (
          <PlanIdentifierInput
            initialPlanIdentifier={initialPlanIdentifier}
            onSubmit={(plan) => setSelection((prev) => ({ ...prev, plan }))}
          />
        )}
      </Header>
      <Content>
        {selection.plan ? (
          <IndicatorList client={client} plan={selection.plan} />
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
