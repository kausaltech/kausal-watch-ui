import type { Meta, StoryObj } from '@storybook/react';

import PlanChip from '@/components/plans/PlanChip';

const ThemeableBackgrounds = (Story, context) => {
  const theme = context.args?.activeTheme;
  return (
    <div style={{ backgroundColor: theme.brandDark, padding: '20px' }}>
      <Story {...context} />
    </div>
  );
};

const meta = {
  title: 'Plans/PlanChip',
  component: PlanChip,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    planShortName: 'Plan Name',
    organization: 'Organization',
  },
} satisfies Meta<typeof PlanChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Negative: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    negative: true,
    planImage: 'https://picsum.photos/200/300',
    size: 'lg',
  },
  decorators: [ThemeableBackgrounds],
};
