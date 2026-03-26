import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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

const phases = MOCK_PLAN.actionImplementationPhases;

export const Default: Story = {
  args: {
    phases,
    activePhase: {
      id: '16',
      identifier: 'implementation',
      name: 'Implementation',
      __typename: 'ActionImplementationPhase',
    },
  },
};

export const NotContinousComplete: Story = {
  args: {
    phases,
    activePhase: MOCK_ACTIONS[24].implementationPhase,
    isContinuous: false,
  },
};

export const ContinousComplete: Story = {
  args: {
    phases,
    activePhase: MOCK_ACTIONS[24].implementationPhase,
    isContinuous: true,
  },
};

export const ContinousIncomplete: Story = {
  args: {
    phases,
    activePhase: MOCK_ACTIONS[16].implementationPhase,
    isContinuous: true,
  },
};
