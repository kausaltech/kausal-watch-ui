import type { Meta, StoryObj } from '@storybook/nextjs';

import Button from '@/components/common/Button';

const meta = {
  title: 'Basic/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    outline: false,
    size: 'sm',
    color: 'primary',
    children: 'Button',
  },
};
