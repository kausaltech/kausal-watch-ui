import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  type ActionCardFragment,
  ActionStatusSummaryIdentifier,
  type PlanContextFragment,
} from '@/common/__generated__/graphql';
import ActionColorLegend from '@/components/actions/ActionColorLegend';
import PlanProvider from '@/components/providers/PlanProvider';

import { MOCK_ACTIONS } from './mocks/actions.mocks';
import { MOCK_PLAN } from './mocks/plan.mocks';

const PHASE_COLORS: Record<string, string> = {
  not_started: 'grey030',
  planning: 'blue030',
  implementation: 'green050',
  completed: 'green090',
};

// A plan whose implementation phases have colors, so the phase color wins
// over the status summary's default
const PLAN_WITH_PHASE_COLORS: PlanContextFragment = {
  ...MOCK_PLAN,
  actionImplementationPhases: MOCK_PLAN.actionImplementationPhases.map((phase) => ({
    ...phase,
    color: PHASE_COLORS[phase.identifier],
  })),
};

const BASE_ACTION = MOCK_ACTIONS[0];

// Default colors of the matching status summaries
const STATUS_COLORS: Record<string, string> = {
  completed: 'green090',
  on_time: 'green050',
  late: 'yellow050',
};

const withStatus = (statusIndex: number): ActionCardFragment => {
  const status = MOCK_PLAN.actionStatuses[statusIndex];
  const color = STATUS_COLORS[status.identifier];
  return {
    ...BASE_ACTION,
    color,
    scheduleContinuous: false,
    status: { ...BASE_ACTION.status!, ...status, color },
    statusSummary: {
      ...BASE_ACTION.statusSummary,
      identifier: status.identifier.toUpperCase() as ActionStatusSummaryIdentifier,
    },
    implementationPhase: null,
  };
};

const withPhase = (phaseIndex: number): ActionCardFragment => {
  const phase = PLAN_WITH_PHASE_COLORS.actionImplementationPhases[phaseIndex];
  return {
    ...BASE_ACTION,
    color: phase.color,
    scheduleContinuous: false,
    implementationPhase: {
      ...BASE_ACTION.implementationPhase!,
      id: phase.id,
      identifier: phase.identifier,
      name: phase.name,
    },
  };
};

const WITHOUT_STATUS: ActionCardFragment = {
  ...BASE_ACTION,
  color: 'grey010',
  scheduleContinuous: false,
  status: null,
  statusSummary: {
    ...BASE_ACTION.statusSummary,
    identifier: ActionStatusSummaryIdentifier.Undefined,
  },
  implementationPhase: null,
};

const CONTINUOUS: ActionCardFragment = {
  ...withStatus(0),
  scheduleContinuous: true,
};

const STATUS_ACTIONS = [withStatus(0), withStatus(1), withStatus(2)];
const PHASE_ACTIONS = PLAN_WITH_PHASE_COLORS.actionImplementationPhases.map((_, i) => withPhase(i));

const meta = {
  title: 'Actions/ActionColorLegend',
  component: ActionColorLegend,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    actions: STATUS_ACTIONS,
  },
} satisfies Meta<typeof ActionColorLegend>;

export default meta;

type Story = StoryObj<typeof meta>;

const withPhaseColorPlan: NonNullable<Story['decorators']> = [
  (Story) => (
    <PlanProvider plan={PLAN_WITH_PHASE_COLORS}>
      <Story />
    </PlanProvider>
  ),
];

/** Card colors come from the action statuses */
export const Statuses: Story = {};

/** Actions without a status are listed last */
export const StatusesWithUnset: Story = {
  args: { actions: [WITHOUT_STATUS, ...STATUS_ACTIONS] },
};

/** Continuous actions that are completed get their own color */
export const StatusesWithContinuous: Story = {
  args: { actions: [...STATUS_ACTIONS, CONTINUOUS] },
};

/** Card colors come from the implementation phases */
export const Phases: Story = {
  args: { actions: PHASE_ACTIONS },
  decorators: withPhaseColorPlan,
};

/** An action without a phase falls back to its status, so the heading becomes "Progress" */
export const PhasesAndStatuses: Story = {
  args: { actions: [...PHASE_ACTIONS, withStatus(2), WITHOUT_STATUS] },
  decorators: withPhaseColorPlan,
};

/** Nothing to explain, so nothing is rendered */
export const Empty: Story = {
  args: { actions: [] },
};

/** Left-aligned, as on the action list page */
export const AlignedStart: Story = {
  args: { actions: [WITHOUT_STATUS, ...STATUS_ACTIONS], align: 'start' },
};
