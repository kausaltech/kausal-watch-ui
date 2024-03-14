import type { Meta, StoryObj } from '@storybook/react';
import ThemeAccessibilityTest from '@/stories/components/ThemeAccessibilityTest';

const meta = {
  title: 'Themes/ThemeAccessibilityTest',
  component: ThemeAccessibilityTest,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ThemeAccessibilityTest>;

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
