import type { Meta, StoryObj } from '@storybook/react';

import RestrictedBlockWrapper from '../components/actions/blocks/RestrictedBlockWrapper';

const meta = {
  title: 'Blocks/RestrictedBlockWrapper',
  component: RestrictedBlockWrapper,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof RestrictedBlockWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isHidden: false,
    isRestricted: true,
    children: (
      <>
        <h4>This is a restricted block</h4>
        <p>
          Restricted blocks are used to indicate that content is hidden from the public UI to
          unauthenticated users.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </>
    ),
  },
};
