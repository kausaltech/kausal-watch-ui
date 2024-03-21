import type { Meta, StoryObj } from '@storybook/react';

import Timeline from '@/components/graphs/Timeline';

const meta = {
  title: 'Actions/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startDate: '2023-01-12T20:31:54.248974+00:00',
    endDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: false,
  },
};

export const OnlyStartDate: Story = {
  args: {
    startDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: false,
  },
};

export const OnlyEndDate: Story = {
  args: {
    endDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: false,
  },
};

export const ContinousWithStartDate: Story = {
  args: {
    startDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: true,
  },
};

export const ContinousWithEndDate: Story = {
  args: {
    endDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: true,
  },
};

export const ContinousWithStartAndEndDate: Story = {
  args: {
    startDate: '2023-01-12T20:31:54.248974+00:00',
    endDate: '2023-01-12T20:31:54.248974+00:00',
    continuous: true,
  },
};
