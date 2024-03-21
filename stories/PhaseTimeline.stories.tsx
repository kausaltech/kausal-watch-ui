import type { Meta, StoryObj } from '@storybook/react';

import { PhaseTimeline } from '@/components/actions/PhaseTimeline';
import { MOCK_ACTIONS } from './mocks/actions.mocks';

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

export const Default: Story = {
  args: {
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
    activePhase: MOCK_ACTIONS[24].implementationPhase,
    isContinuous: false,
  },
};

export const ContinousComplete: Story = {
  args: {
    activePhase: MOCK_ACTIONS[24].implementationPhase,
    isContinuous: true,
  },
};

export const ContinousIncomplete: Story = {
  args: {
    activePhase: MOCK_ACTIONS[16].implementationPhase,
    isContinuous: true,
  },
};
