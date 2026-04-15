import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { AttributeTypeFormat } from '@/common/__generated__/graphql';
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

// --- Numeric ---

export const Numeric: Story = {
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
        format: AttributeTypeFormat.Numeric,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      numericValue: 95,
    },
    attributeType: null,
  },
};

export const NumericWithUnit: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeNumericValue',
      id: '301',
      type: {
        id: '208',
        identifier: 'co2-reduction',
        name: 'CO₂ reduction',
        unit: {
          id: '12',
          name: 'tonnes CO₂e/year',
          shortName: 'tCO₂e/a',
          __typename: 'Unit',
        },
        format: AttributeTypeFormat.Numeric,
        helpText: 'Annual CO₂ equivalent reduction achieved by this action.',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      numericValue: 1450.5,
    },
    attributeType: null,
  },
};

export const NumericChip: Story = {
  parameters: {},
  args: {
    variant: 'chip',
    attribute: {
      __typename: 'AttributeNumericValue',
      id: '278',
      type: {
        id: '207',
        identifier: 'estimated-level-of-completion',
        name: 'Completion',
        unit: {
          id: '55',
          name: '%',
          shortName: '%',
          __typename: 'Unit',
        },
        format: AttributeTypeFormat.Numeric,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      numericValue: 95,
    },
    attributeType: null,
  },
};

// --- OrderedChoice ---

export const OrderedChoice: Story = {
  parameters: {},
  args: {
    fontSize: 'fontSizeBase',
    attributeType: {
      __typename: 'AttributeType',
      id: '261',
      format: AttributeTypeFormat.OrderedChoice,
      name: 'Kosten',
      identifier: 'kosten',
      helpText: 'Die Bewertung der Sach- und Personalkosten (aufaddiert bis zum Jahr 2035).',
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
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C22322',
      type: {
        id: '261',
        identifier: 'kosten',
        name: 'Kosten',
        unit: null,
        format: AttributeTypeFormat.OrderedChoice,
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

export const OrderedChoiceFirst: Story = {
  parameters: {},
  args: {
    attributeType: {
      __typename: 'AttributeType',
      id: '261',
      format: AttributeTypeFormat.OrderedChoice,
      name: 'Priority',
      identifier: 'priority',
      helpText: 'The priority level of this action.',
      choiceOptions: [
        { id: '10', identifier: 'low', __typename: 'AttributeTypeChoiceOption' },
        { id: '11', identifier: 'medium', __typename: 'AttributeTypeChoiceOption' },
        { id: '12', identifier: 'high', __typename: 'AttributeTypeChoiceOption' },
        { id: '13', identifier: 'critical', __typename: 'AttributeTypeChoiceOption' },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C100',
      type: {
        id: '261',
        identifier: 'priority',
        name: 'Priority',
        unit: null,
        format: AttributeTypeFormat.OrderedChoice,
        __typename: 'AttributeType',
      },
      choice: {
        id: '10',
        name: 'Low',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: null,
    },
  },
};

// --- UnorderedChoice ---

export const UnorderedChoice: Story = {
  parameters: {},
  args: {
    attributeType: {
      __typename: 'AttributeType',
      id: '310',
      format: AttributeTypeFormat.UnorderedChoice,
      name: 'Implementation sector',
      identifier: 'implementation-sector',
      helpText: 'Which sector is primarily responsible for implementing this action.',
      choiceOptions: [
        { id: '20', identifier: 'transport', __typename: 'AttributeTypeChoiceOption' },
        { id: '21', identifier: 'buildings', __typename: 'AttributeTypeChoiceOption' },
        { id: '22', identifier: 'energy', __typename: 'AttributeTypeChoiceOption' },
        { id: '23', identifier: 'waste', __typename: 'AttributeTypeChoiceOption' },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C400',
      type: {
        id: '310',
        identifier: 'implementation-sector',
        name: 'Implementation sector',
        unit: null,
        format: AttributeTypeFormat.UnorderedChoice,
        __typename: 'AttributeType',
      },
      choice: {
        id: '22',
        name: 'Energy',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: null,
    },
  },
};

export const UnorderedChoiceChip: Story = {
  parameters: {},
  args: {
    variant: 'chip',
    attributeType: {
      __typename: 'AttributeType',
      id: '310',
      format: AttributeTypeFormat.UnorderedChoice,
      name: 'Sector',
      identifier: 'sector',
      helpText: '',
      choiceOptions: [
        { id: '20', identifier: 'transport', __typename: 'AttributeTypeChoiceOption' },
        { id: '21', identifier: 'buildings', __typename: 'AttributeTypeChoiceOption' },
        { id: '22', identifier: 'energy', __typename: 'AttributeTypeChoiceOption' },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C401',
      type: {
        id: '310',
        identifier: 'sector',
        name: 'Sector',
        unit: null,
        format: AttributeTypeFormat.UnorderedChoice,
        __typename: 'AttributeType',
      },
      choice: {
        id: '20',
        name: 'Transport',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: null,
    },
  },
};

// --- OptionalChoice ---

export const OptionalChoiceWithText: Story = {
  parameters: {},
  args: {
    attributeType: {
      __typename: 'AttributeType',
      id: '320',
      format: AttributeTypeFormat.OptionalChoice,
      name: 'Feasibility',
      identifier: 'feasibility',
      helpText: 'Assessment of how feasible it is to implement this action.',
      choiceOptions: [
        { id: '30', identifier: 'low', __typename: 'AttributeTypeChoiceOption' },
        { id: '31', identifier: 'medium', __typename: 'AttributeTypeChoiceOption' },
        { id: '32', identifier: 'high', __typename: 'AttributeTypeChoiceOption' },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C500',
      type: {
        id: '320',
        identifier: 'feasibility',
        name: 'Feasibility',
        unit: null,
        format: AttributeTypeFormat.OptionalChoice,
        __typename: 'AttributeType',
      },
      choice: {
        id: '31',
        name: 'Medium',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: '<p>Implementation requires coordination between multiple departments and moderate budget allocation. Expected timeline is 2–3 years.</p>',
    },
  },
};

export const OptionalChoiceNoText: Story = {
  parameters: {},
  args: {
    attributeType: {
      __typename: 'AttributeType',
      id: '320',
      format: AttributeTypeFormat.OptionalChoice,
      name: 'Feasibility',
      identifier: 'feasibility',
      helpText: '',
      choiceOptions: [
        { id: '30', identifier: 'low', __typename: 'AttributeTypeChoiceOption' },
        { id: '31', identifier: 'medium', __typename: 'AttributeTypeChoiceOption' },
        { id: '32', identifier: 'high', __typename: 'AttributeTypeChoiceOption' },
      ],
      unit: null,
      showChoiceNames: true,
      hasZeroOption: false,
    },
    attribute: {
      __typename: 'AttributeChoice',
      id: 'C501',
      type: {
        id: '320',
        identifier: 'feasibility',
        name: 'Feasibility',
        unit: null,
        format: AttributeTypeFormat.OptionalChoice,
        __typename: 'AttributeType',
      },
      choice: {
        id: '32',
        name: 'High',
        __typename: 'AttributeTypeChoiceOption',
      },
      text: null,
    },
  },
};

// --- RichText ---

export const RichText: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeRichText',
      id: '600',
      type: {
        id: '330',
        identifier: 'background',
        name: 'Background',
        unit: null,
        format: AttributeTypeFormat.RichText,
        helpText: 'Provide context and background information for this action.',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value:
        '<p>This action addresses the need to <strong>reduce emissions</strong> from the transport sector by expanding cycling infrastructure across the city.</p><ul><li>New cycle lanes on main arterial roads</li><li>Secure parking at transit hubs</li><li>Integration with public transport network</li></ul>',
    },
    attributeType: null,
  },
};

export const RichTextMinimized: Story = {
  parameters: {},
  args: {
    variant: 'minimized',
    attribute: {
      __typename: 'AttributeRichText',
      id: '601',
      type: {
        id: '330',
        identifier: 'background',
        name: 'Background',
        unit: null,
        format: AttributeTypeFormat.RichText,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value:
        '<p>This action addresses the need to reduce emissions from the transport sector by expanding cycling infrastructure across the city centre and surrounding districts.</p>',
    },
    attributeType: null,
  },
};

export const RichTextChip: Story = {
  parameters: {},
  args: {
    variant: 'chip',
    attribute: {
      __typename: 'AttributeRichText',
      id: '602',
      type: {
        id: '330',
        identifier: 'background',
        name: 'Background',
        unit: null,
        format: AttributeTypeFormat.RichText,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value: '<p>Expanding cycling infrastructure across the city.</p>',
    },
    attributeType: null,
  },
};

// --- Text ---

export const Text: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeText',
      id: '700',
      type: {
        id: '340',
        identifier: 'responsible-party',
        name: 'Responsible party',
        unit: null,
        format: AttributeTypeFormat.Text,
        helpText: 'The organisation or department responsible for this action.',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value: 'Department of Urban Mobility, in cooperation with the Public Works Office.',
    },
    attributeType: null,
  },
};

export const TextMinimized: Story = {
  parameters: {},
  args: {
    variant: 'minimized',
    attribute: {
      __typename: 'AttributeText',
      id: '701',
      type: {
        id: '340',
        identifier: 'responsible-party',
        name: 'Responsible party',
        unit: null,
        format: AttributeTypeFormat.Text,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value:
        'Department of Urban Mobility, in cooperation with the Public Works Office and the City Planning Department.',
    },
    attributeType: null,
  },
};

export const TextChip: Story = {
  parameters: {},
  args: {
    variant: 'chip',
    attribute: {
      __typename: 'AttributeText',
      id: '702',
      type: {
        id: '340',
        identifier: 'responsible-party',
        name: 'Responsible party',
        unit: null,
        format: AttributeTypeFormat.Text,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      value: 'Department of Urban Mobility',
    },
    attributeType: null,
  },
};

// --- CategoryChoice ---

const categoryType = {
  __typename: 'CategoryType' as const,
  id: 'ct-1',
  name: 'Theme',
  identifier: 'theme',
  helpText: '',
  hideCategoryIdentifiers: false,
  levels: [
    {
      id: 'cl-1',
      order: 1,
      name: 'Theme',
      namePlural: 'Themes',
      __typename: 'CategoryLevel' as const,
    },
  ],
};

const makeCategory = (id: string, identifier: string, name: string, color: string) => ({
  __typename: 'Category' as const,
  id,
  identifier,
  name,
  leadParagraph: '',
  order: 1,
  kausalPathsNodeUuid: '',
  color,
  iconSvgUrl: null,
  helpText: '',
  level: { id: 'cl-1', name: 'Theme', namePlural: 'Themes', __typename: 'CategoryLevel' as const },
  image: null,
  indicators: [],
  indicatorRelationships: [],
  iconImage: null,
  categoryPage: null,
  type: categoryType,
  attributes: [],
  parent: null,
});

export const CategoryChoice: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeCategoryChoice',
      id: '800',
      type: {
        id: 'ct-1',
        identifier: 'theme',
        name: 'Theme',
        unit: null,
        format: AttributeTypeFormat.CategoryChoice,
        helpText: 'The thematic area this action belongs to.',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      categories: [makeCategory('cat-1', '1', 'Sustainable mobility', '#2e7d32')],
    },
    attributeType: null,
  },
};

export const CategoryChoiceMultiple: Story = {
  parameters: {},
  args: {
    attribute: {
      __typename: 'AttributeCategoryChoice',
      id: '801',
      type: {
        id: 'ct-1',
        identifier: 'theme',
        name: 'Theme',
        unit: null,
        format: AttributeTypeFormat.CategoryChoice,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      categories: [
        makeCategory('cat-1', '1', 'Sustainable mobility', '#2e7d32'),
        makeCategory('cat-2', '2', 'Energy efficiency', '#1565c0'),
        makeCategory('cat-3', '3', 'Biodiversity', '#6a1b9a'),
      ],
    },
    attributeType: null,
  },
};

export const CategoryChoiceChip: Story = {
  parameters: {},
  args: {
    variant: 'chip',
    attribute: {
      __typename: 'AttributeCategoryChoice',
      id: '802',
      type: {
        id: 'ct-1',
        identifier: 'theme',
        name: 'Theme',
        unit: null,
        format: AttributeTypeFormat.CategoryChoice,
        helpText: '',
        showChoiceNames: false,
        hasZeroOption: false,
        choiceOptions: [],
        __typename: 'AttributeType',
      },
      categories: [
        makeCategory('cat-1', '1', 'Sustainable mobility', '#2e7d32'),
        makeCategory('cat-2', '2', 'Energy efficiency', '#1565c0'),
      ],
    },
    attributeType: null,
  },
};
