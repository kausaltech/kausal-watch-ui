import type { Meta, StoryObj } from '@storybook/react';
import ThemeDesignTokens from '@/stories/components/ThemeDesignTokens';

const meta = {
  title: 'Themes/ThemeDesignTokens',
  component: ThemeDesignTokens,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ThemeDesignTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Negative: Story = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  args: {},
};
