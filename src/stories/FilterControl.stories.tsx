import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import FilterControl, { type FilterField } from '@/components/common/FilterControl';

const MOCK_FIELDS: FilterField[] = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'transport', label: 'Transport' },
      { id: 'energy', label: 'Energy' },
      { id: 'food', label: 'Food & Agriculture' },
      { id: 'buildings', label: 'Buildings' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'completed', label: 'Completed' },
      { id: 'late', label: 'Late' },
    ],
  },
  {
    id: 'phase',
    label: 'Phase',
    options: [
      { id: 'planning', label: 'Planning' },
      { id: 'implementation', label: 'Implementation' },
      { id: 'monitoring', label: 'Monitoring' },
    ],
  },
];

const meta = {
  title: 'Common/FilterControl',
  component: FilterControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    onChange: () => {},
  },
  argTypes: {
    fields: { control: false },
    activeFilters: { control: false },
  },
} satisfies Meta<typeof FilterControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoActiveFilters: Story = {
  args: {
    fields: MOCK_FIELDS,
    activeFilters: {},
  },
};

export const WithActiveFilters: Story = {
  args: {
    fields: MOCK_FIELDS,
    activeFilters: {
      category: ['transport', 'energy'],
      status: ['active'],
    },
  },
};

export const SingleField: Story = {
  args: {
    fields: [MOCK_FIELDS[0]],
    activeFilters: {},
  },
};

export const ManyOptions: Story = {
  args: {
    fields: [
      {
        id: 'tags',
        label: 'Tags',
        options: Array.from({ length: 20 }, (_, index) => ({
          id: `tag-${index}`,
          label: `Tag ${index + 1}`,
        })),
      },
    ],
    activeFilters: {},
  },
};
