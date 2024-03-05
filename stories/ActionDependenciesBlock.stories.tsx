import type { Meta, StoryObj } from '@storybook/react';

import { Action } from '@/common/__generated__/graphql';
import { ActionDependenciesBlock } from '@/components/actions/blocks/action-dependencies/ActionDependenciesBlock';

function getMockAction(
  id: string = '1',
  name = 'Lorem ipsum sit dolor amet'
): Action {
  return {
    id,
    identifier: id,
    name,
    status: {
      color: '#ceadea',
      id: '1',
      identifier: 'COMPLETED',
      isCompleted: true,
      name: 'Completed',
    },
  };
}

const MOCK_PROPS: Story['args'] = {
  activeActionId: '2',
  actionGroups: [
    {
      id: '1',
      title: 'Discovery',
      actions: [getMockAction(), getMockAction()],
    },
    {
      id: '2',
      title: 'Implementation',
      actions: [
        getMockAction(
          '2',
          'Build a wall to prevent snakes from falling into the dam'
        ),
      ],
    },
    { id: '3', title: 'Follow up', actions: [getMockAction()] },
  ],
};

const meta = {
  title: 'Actions/ActionDependenciesBlock',
  component: ActionDependenciesBlock,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActionDependenciesBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_PROPS,
};
