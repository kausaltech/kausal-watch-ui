import type { Meta, StoryObj } from '@storybook/react';

import ActionHero from '@/components/actions/ActionHero';

const meta = {
  title: 'Actions/ActionHero',
  component: ActionHero,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    categories: [],
    previousAction: undefined,
    nextAction: undefined,
    identifier: 'AC1',
    name: 'Amend the land development code to include a new zoning district for the area surrounding the new transit station',
    imageUrl: 'https://picsum.photos/1600/600',
    imageAlign: 'top',
    altText: 'string',
    imageCredit: 'Picsum',
    imageTitle: 'Image title',
    hideActionIdentifiers: false,
    primaryOrg: undefined,
    state: undefined,
  },
} satisfies Meta<typeof ActionHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {},
  args: {},
};

export const LongIdentifier: Story = {
  parameters: {},
  args: {
    identifier: 'SE-12-b-2024',
  },
};

export const Draft: Story = {
  parameters: {},
  args: {
    state: 'draft',
  },
};
