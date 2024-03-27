import type { Meta, StoryObj } from '@storybook/react';
import ActionAttribute from '@/components/common/ActionAttribute';

const meta = {
  title: 'Actions/ActionAttribute',
  component: ActionAttribute,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ActionAttribute>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeNumericValue',
      id: '278',
      type: {
        id: '207',
        identifier: 'estimated-level-of-completion',
        name: 'Estimated level of completion (%)',
        unit: {
          id: '55',
          name: '%',
          shortName: '%',
          __typename: 'Unit',
        },
        format: 'NUMERIC',
        __typename: 'AttributeType',
      },
      numericValue: 95,
    },
  },
};

export const AttributeChoice: Story = {
  parameters: {},
  args: {
    attributeType: {
      __typename: 'AttributeType',
      id: '261',
      format: 'ORDERED_CHOICE',
      name: 'Kosten',
      identifier: 'kosten',
      helpText:
        'Die Bewertung der Sach- und Personalkosten (aufaddiert bis zum Jahr 2035).',
      choiceOptions: [
        {
          id: '479',
          identifier: 'bis-500000-eur',
          __typename: 'AttributeTypeChoiceOption',
        },
        {
          id: '480',
          identifier: '500000-eur-bis-1-mio-eur',
          __typename: 'AttributeTypeChoiceOption',
        },
        {
          id: '481',
          identifier: '1-mio-eur-bis-2-mio-eur',
          __typename: 'AttributeTypeChoiceOption',
        },
        {
          id: '482',
          identifier: '2-mio-eur-bis-10-mio-eur',
          __typename: 'AttributeTypeChoiceOption',
        },
        {
          id: '483',
          identifier: 'mehr-als-10-mio-eur',
          __typename: 'AttributeTypeChoiceOption',
        },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
      meta: {
        restricted: false,
        hidden: false,
        __typename: 'FieldBlockMetaData',
      },
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C22322',
      type: {
        id: '261',
        identifier: 'kosten',
        name: 'Kosten',
        unit: null,
        format: 'ORDERED_CHOICE',
        __typename: 'AttributeType',
      },
      choice: {
        id: '481',
        name: '1 Mio. € bis 2 Mio. €',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: null,
    },
  },
};
