import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ActionCard from '@/components/actions/ActionCard';

import { MOCK_ACTIONS } from './mocks/actions.mocks';

const MOCK_PROPS: Story['args'] = {
  action: MOCK_ACTIONS[0],
};

// Status colors from the backend can be hex values instead of theme graphColors keys
const HEX_STATUS_COLOR = '#1044e0';
const MOCK_PROPS_HEX_STATUS: Story['args'] = {
  action: {
    ...MOCK_ACTIONS[0],
    color: HEX_STATUS_COLOR,
    status: MOCK_ACTIONS[0].status && { ...MOCK_ACTIONS[0].status, color: HEX_STATUS_COLOR },
  },
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

export const HexStatusColor: Story = {
  args: MOCK_PROPS_HEX_STATUS,
};

// TODO: Add action dependency data to mock actions
export const WithActionDependencies: Story = {
  args: { ...MOCK_PROPS },
};
