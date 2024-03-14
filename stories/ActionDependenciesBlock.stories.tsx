import type { Meta, StoryObj } from '@storybook/react';

import { ActionDependenciesBlock } from '@/components/actions/blocks/action-dependencies/ActionDependenciesBlock';
import { MOCK_ACTIONS } from './mocks/actions.mocks';

const MOCK_PROPS: Story['args'] = {
  activeActionId: MOCK_ACTIONS[4].id,
  actionGroups: [
    {
      id: '1',
      title: 'Discovery',
      actions: MOCK_ACTIONS.slice(0, 3),
    },
    {
      id: '2',
      title: 'Implementation',
      actions: [MOCK_ACTIONS[4]],
    },
    {
      id: '3',
      title: 'Follow up',
      actions: MOCK_ACTIONS.slice(MOCK_ACTIONS.length - 2),
    },
  ],
};

const meta = {
  title: 'Actions/ActionDependenciesBlock',
  component: ActionDependenciesBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActionDependenciesBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_PROPS,
};

export const Small: Story = {
  args: { ...MOCK_PROPS, size: 'small' },
};
