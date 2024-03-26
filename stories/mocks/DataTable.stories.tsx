import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from 'components/common/DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
};

export default meta;

const Template: StoryObj<Meta<typeof DataTable>> = {
  render: (args) => <DataTable {...args} />,
};

export const Default = {
  ...Template,
  args: {
    title: 'Budjetti',
    headers: ['EUR', '2025', '2026', '2027'],
    data: [
      ['Investinnit', '', '', ''],
      ['Tulot ja saastot', '-', '-', '-'],
      ['Menot', '1530000', '1530000', '1530000'],
      ['Kayttotalous', '', '', ''],
      ['Tulot', '-', '-', '-'],
      ['Menot', '123000', '123000', '123000'],
      ['Yhteensa', '1646000', '1646000', '1646000'],
    ],
  },
};
