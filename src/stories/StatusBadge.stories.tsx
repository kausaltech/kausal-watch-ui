import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ActionStatusSummaryIdentifier } from '@/common/__generated__/graphql';
import StatusBadge from '@/components/common/StatusBadge';

import { MOCK_PLAN } from './mocks/plan.mocks';

const meta = {
  title: 'Common/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    plan: MOCK_PLAN,
    statusName: 'On time',
    action: {
      color: 'green050',
      status: { color: 'green050' },
      statusSummary: { identifier: ActionStatusSummaryIdentifier.OnTime },
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Status color given as a key of `theme.graphColors` */
export const Default: Story = {};

/** Status color given as a hex value by the backend */
export const HexStatusColor: Story = {
  args: {
    statusName: 'Late',
    action: {
      color: '#ea0b0b',
      status: { color: '#ea0b0b' },
      statusSummary: { identifier: ActionStatusSummaryIdentifier.Late },
    },
  },
};

export const Subtle: Story = {
  args: { subtle: true },
};

export const SubtleHexStatusColor: Story = {
  args: { ...HexStatusColor.args, subtle: true },
};

export const WithReason: Story = {
  args: {
    ...HexStatusColor.args,
    reason: 'Funding for the second phase has not yet been approved.',
  },
};

/** Unknown theme keys fall back to the default grey */
export const UnknownColor: Story = {
  args: {
    statusName: 'Unknown',
    action: {
      color: 'notAThemeColor',
      statusSummary: { identifier: ActionStatusSummaryIdentifier.Undefined },
    },
  },
};
