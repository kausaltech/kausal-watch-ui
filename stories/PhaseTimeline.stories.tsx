import type { Meta, StoryObj } from '@storybook/nextjs';

import { PhaseTimeline } from '@/components/actions/PhaseTimeline';

import { MOCK_ACTIONS } from './mocks/actions.mocks';
import { MOCK_PLAN } from './mocks/plan.mocks';

const meta = {
  title: 'Actions/PhaseTimeline',
  component: PhaseTimeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof PhaseTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_PHASES = MOCK_PLAN.actionImplementationPhases;

export const Default: Story = {
  args: {
    activePhase: {
      id: '16',
      identifier: 'implementation',
      name: 'Implementation',
      __typename: 'ActionImplementationPhase',
    },
    phases: MOCK_PHASES,
  },
};

export const NotContinousComplete: Story = {
  args: {
    activePhase: MOCK_ACTIONS[24].implementationPhase!,
    isContinuous: false,
    phases: MOCK_PHASES,
  },
};

export const ContinousComplete: Story = {
  args: {
    activePhase: MOCK_ACTIONS[24].implementationPhase!,
    isContinuous: true,
    phases: MOCK_PHASES,
  },
};

export const ContinousIncomplete: Story = {
  args: {
    activePhase: MOCK_ACTIONS[16].implementationPhase!,
    isContinuous: true,
    phases: MOCK_PHASES,
  },
};
