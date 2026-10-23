import { useTheme } from '@emotion/react';

import type { Theme } from '@kausal/themes/types';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import StatusBarChart from '@/components/common/StatusBarChart';

type GraphColor = keyof Theme['graphColors'];

type Segment = { label: string; value: number; color: GraphColor };

type ActionStatusBarProps = {
  title: string;
  segments: Segment[];
};

/** StatusBarChart with colours from the selected theme's `graphColors` */
function ActionStatusBar({ title, segments }: ActionStatusBarProps) {
  const theme = useTheme();
  const values = segments.map((s) => s.value);
  return (
    <StatusBarChart
      title={title}
      data={{
        values,
        labels: segments.map((s) => s.label),
        colors: segments.map((s) => theme.graphColors[s.color]),
        good: 0,
        total: String(values.reduce((sum, value) => sum + value, 0)),
      }}
    />
  );
}

const meta = {
  title: 'Common/Action Status Bar',
  component: ActionStatusBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Actions by status',
    segments: [
      { label: 'Completed', value: 12, color: 'green090' },
      { label: 'On time', value: 40, color: 'green050' },
      { label: 'Late', value: 9, color: 'yellow050' },
      { label: 'Severely late', value: 4, color: 'red050' },
      { label: 'Not started', value: 15, color: 'grey030' },
    ],
  },
} satisfies Meta<typeof ActionStatusBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** One segment fills the bar */
export const SingleSegment: Story = {
  args: {
    segments: [
      { label: 'On time', value: 30, color: 'green050' },
      { label: 'Late', value: 0, color: 'yellow050' },
    ],
  },
};

/** Segments under 1 %: minimum width, "<1 %" labels */
export const TinySegments: Story = {
  args: {
    segments: [
      { label: 'On time', value: 400, color: 'green050' },
      { label: 'Late', value: 2, color: 'yellow050' },
      { label: 'Severely late', value: 1, color: 'red050' },
      { label: 'Cancelled', value: 1, color: 'grey050' },
      { label: 'Not started', value: 96, color: 'grey030' },
    ],
  },
};

/** Just under 100 %: ">99 %" */
export const AlmostAll: Story = {
  args: {
    segments: [
      { label: 'On time', value: 996, color: 'green050' },
      { label: 'Late', value: 4, color: 'yellow050' },
    ],
  },
};

/** Same colour: only the separators tell them apart */
export const SameColourNeighbours: Story = {
  args: {
    segments: [
      { label: 'Implementation', value: 20, color: 'green070' },
      { label: 'Planning', value: 15, color: 'green070' },
      { label: 'Completed', value: 10, color: 'green070' },
    ],
  },
};

/** White and very light segments */
export const LightSegments: Story = {
  args: {
    title: 'Actions by phases',
    segments: [
      { label: 'Implementation', value: 18, color: 'green070' },
      { label: 'Not started', value: 6, color: 'grey020' },
      { label: 'No phase set', value: 4, color: 'grey010' },
      { label: 'Inactive', value: 3, color: 'grey000' },
    ],
  },
};

export const ManySegments: Story = {
  args: {
    title: 'Actions by phases',
    segments: [
      { label: 'Continuous', value: 3, color: 'blue070' },
      { label: 'Completed', value: 5, color: 'green090' },
      { label: 'Implementation', value: 16, color: 'green070' },
      { label: 'Planning', value: 7, color: 'green050' },
      { label: 'Design', value: 4, color: 'green030' },
      { label: 'Approved', value: 2, color: 'green010' },
      { label: 'Not started', value: 4, color: 'grey030' },
      { label: 'No phase set', value: 1, color: 'grey010' },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    segments: [
      { label: 'Completed according to the original schedule', value: 10, color: 'green090' },
      { label: 'Ongoing, but behind the agreed schedule', value: 25, color: 'yellow050' },
      { label: 'Postponed until further funding decisions', value: 5, color: 'grey030' },
    ],
  },
};

/** Zero values are left out */
export const ZeroValues: Story = {
  args: {
    segments: [
      { label: 'Completed', value: 0, color: 'green090' },
      { label: 'On time', value: 20, color: 'green050' },
      { label: 'Late', value: 0, color: 'yellow050' },
      { label: 'Not started', value: 10, color: 'grey030' },
    ],
  },
};

/** All zero: title and an empty bar */
export const AllZero: Story = {
  args: {
    segments: [
      { label: 'On time', value: 0, color: 'green050' },
      { label: 'Late', value: 0, color: 'yellow050' },
    ],
  },
};

/** No data: nothing */
export const NoData: Story = {
  args: { segments: [] },
};
