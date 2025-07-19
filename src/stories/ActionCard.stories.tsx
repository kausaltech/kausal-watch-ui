import type { Meta, StoryObj } from '@storybook/react';

import ActionCard from '@/components/actions/ActionCard';

import { MOCK_ACTIONS } from './mocks/actions.mocks';

const MOCK_PROPS: Story['args'] = {
  action: MOCK_ACTIONS[0],
};

const meta = {
  title: 'Actions/ActionCard',
  component: ActionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ActionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_PROPS,
};

export const Highlighted: Story = {
  args: { ...MOCK_PROPS, isHighlighted: true },
};

export const WithoutLink: Story = {
  args: { ...MOCK_PROPS, isLink: false },
};

// TODO: Add action dependency data to mock actions
export const WithActionDependencies: Story = {
  args: { ...MOCK_PROPS },
};
