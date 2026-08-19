import { MockedProvider } from '@apollo/client/testing/react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { ActionCardFragment } from '@/common/__generated__/graphql';
import { ActionDependenciesBlock } from '@/components/actions/blocks/action-dependencies/ActionDependenciesBlock';

import { MOCK_ACTIONS } from './mocks/actions.mocks';

type ActionProp = React.ComponentProps<typeof ActionDependenciesBlock>['action'];

// Role ids must match MOCK_PLAN.actionDependencyRoles (provided by the global
// plan decorator), which the component uses to name and order the groups.
const ROLES = {
  discovery: { id: 'role-discovery' },
  implementation: { id: 'role-implementation' },
  followUp: { id: 'role-follow-up' },
};

function toDependency(action: ActionCardFragment, role: { id: string }) {
  return { id: action.id, dependencyRole: role };
}

const ACTIVE_ACTION = MOCK_ACTIONS[4];

// The active action carries its dependency relationships inline, so the
// component renders the groups without fetching them over GraphQL.
const MOCK_ACTION = {
  ...ACTIVE_ACTION,
  dependencyRole: ROLES.implementation,
  allDependencyRelationships: [
    ...MOCK_ACTIONS.slice(0, 3).map((action) => ({
      preceding: toDependency(action, ROLES.discovery),
      dependent: toDependency(ACTIVE_ACTION, ROLES.implementation),
    })),
    ...MOCK_ACTIONS.slice(-2).map((action) => ({
      preceding: toDependency(ACTIVE_ACTION, ROLES.implementation),
      dependent: toDependency(action, ROLES.followUp),
    })),
  ],
} as unknown as ActionProp;

const MOCK_PROPS: Story['args'] = {
  action: MOCK_ACTION,
  activeActionId: ACTIVE_ACTION.id,
  getFullAction: (id: string) =>
    MOCK_ACTIONS.find((action) => action.id === id) as unknown as NonNullable<ActionProp>,
};

const meta = {
  title: 'Actions/ActionDependenciesBlock',
  component: ActionDependenciesBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    // The dependencies are passed in through the action prop, so the component
    // skips fetching them — but its useSuspenseQuery still requires an Apollo
    // client to be present in the context.
    (Story) => (
      <MockedProvider>
        <Story />
      </MockedProvider>
    ),
  ],
} satisfies Meta<typeof ActionDependenciesBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: MOCK_PROPS,
};

export const Small: Story = {
  args: { ...MOCK_PROPS, size: 'small' },
};
