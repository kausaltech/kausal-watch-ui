import type { ComponentType } from 'react';

import { useTheme } from '@emotion/react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PlanChip from '@/components/plans/PlanChip';

const ThemeableBackgrounds = (Story: ComponentType) => {
  const theme = useTheme();
  return (
    <div style={{ backgroundColor: theme.brandDark, padding: '20px' }}>
      <Story />
    </div>
  );
};

const meta = {
  title: 'Common/PlanChip',
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
