import styled from '@emotion/styled';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import {
  IndicatorDesiredTrend,
  type IndicatorDetailsQuery,
  IndicatorNonQuantifiedGoal,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';
import IndicatorValueSummary, {
  type ValueSummaryOptions,
} from '@/components/indicators/IndicatorValueSummary';

type Indicator = NonNullable<IndicatorDetailsQuery['indicator']>;

// The summary fills the width of the modal content block or hero card it
// lives in; give it a comparable column to sit in.
const Column = styled.div`
  max-width: 720px;
  padding: ${({ theme }) => theme.spaces.s200};
  background-color: ${({ theme }) => theme.themeColors.white};
`;

const values = (series: Array<[string, number]>): Indicator['values'] =>
  series.map(([date, value], idx) => ({
    __typename: 'IndicatorValue',
    id: `value-${idx}`,
    date,
    value,
  }));

const goals = (series: Array<[string, number]>): Indicator['goals'] =>
  series.map(([date, value], idx) => ({
    __typename: 'IndicatorGoal',
    id: `goal-${idx}`,
    date,
    value,
    scenario: null,
  }));

const unit = (name: string, shortName: string | null = null): Indicator['unit'] => ({
  __typename: 'Unit',
  id: `unit-${name}`,
  name,
  shortName,
  verboseName: name,
  verboseNamePlural: name,
});

/** Display options as the value summary content block builds them, all blocks on. */
const blockOptions = (overrides: Partial<ValueSummaryOptions> = {}): ValueSummaryOptions => ({
  referenceValue: { show: true, year: null, defaultReferenceValue: null },
  currentValue: { show: true },
  goalValue: { show: true, defaultGoalYear: null },
  goalGap: { show: true },
  nonQuantifiedGoal: { trend: null, date: null },
  valueRounding: 3,
  ...overrides,
});

const EMISSIONS = values([
  ['2019-12-31', 512],
  ['2020-12-31', 478],
  ['2021-12-31', 466],
  ['2022-12-31', 431],
  ['2023-12-31', 405],
  ['2024-12-31', 389],
]);

const meta = {
  title: 'Indicators/IndicatorValueSummary',
  component: IndicatorValueSummary,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Column>
        <Story />
      </Column>
    ),
  ],
  tags: ['autodocs'],
  args: {
    timeResolution: IndicatorTimeResolution.Year,
    values: EMISSIONS,
    goals: goals([['2035-12-31', 150]]),
    unit: unit('kilotonne CO₂e', 'kt CO₂e'),
    desiredTrend: IndicatorDesiredTrend.Decreasing,
  },
} satisfies Meta<typeof IndicatorValueSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Without `options`, as the legacy indicator hero renders it: the first value
 * as the reference, the gap to the next upcoming goal and the goal itself.
 */
export const Legacy: Story = {};

/** All four blocks, as a value summary content block with everything enabled. */
export const AllBlocks: Story = {
  args: {
    options: blockOptions(),
  },
};

/**
 * The reference value comes from the indicator's own reference value when it
 * has one, otherwise from the configured reference year.
 */
export const ReferenceYear: Story = {
  args: {
    options: blockOptions({
      referenceValue: { show: true, year: 2021, defaultReferenceValue: null },
    }),
  },
};

const latestValueOnly = blockOptions({
  referenceValue: { show: false, year: null, defaultReferenceValue: null },
  goalValue: { show: false, defaultGoalYear: null },
  goalGap: { show: false },
});

/**
 * Only the latest value. With the reference value hidden it shows the change
 * from the previous value, green when it moves in the desired direction.
 */
export const LatestValueWithDesirableChange: Story = {
  args: {
    options: latestValueOnly,
  },
};

/** The same, with the latest change going against the desired trend. */
export const LatestValueWithUndesirableChange: Story = {
  args: {
    values: values([
      ['2022-12-31', 431],
      ['2023-12-31', 405],
      ['2024-12-31', 418],
    ]),
    options: latestValueOnly,
  },
};

/** Latest value, gap and goal, without a reference value. */
export const LatestValueAndGoal: Story = {
  args: {
    options: blockOptions({
      referenceValue: { show: false, year: null, defaultReferenceValue: null },
    }),
  },
};

/**
 * With several goals, `defaultGoalYear` picks the one shown and measured
 * against; here 2030 out of 2030, 2035 and 2045.
 */
export const DefaultGoalYear: Story = {
  args: {
    goals: goals([
      ['2030-12-31', 300],
      ['2035-12-31', 150],
      ['2045-12-31', 0],
    ]),
    options: blockOptions({
      goalValue: { show: true, defaultGoalYear: 2030 },
    }),
  },
};

/** The latest value already beats the goal in the desired direction. */
export const GoalExceeded: Story = {
  args: {
    goals: goals([['2030-12-31', 400]]),
    options: blockOptions(),
  },
};

/** An increasing indicator. */
export const IncreasingTrend: Story = {
  args: {
    values: values([
      ['2021-12-31', 1520],
      ['2022-12-31', 1810],
      ['2023-12-31', 2105],
    ]),
    goals: goals([['2030-12-31', 3000]]),
    unit: unit('kilometre', 'km'),
    desiredTrend: IndicatorDesiredTrend.Increasing,
    options: blockOptions(),
  },
};

/**
 * Percentage units measure the gap in percentage points, with an explainer
 * popover next to the unit.
 */
export const PercentageUnit: Story = {
  args: {
    values: values([
      ['2021-12-31', 18.4],
      ['2022-12-31', 21.9],
      ['2023-12-31', 24.6],
    ]),
    goals: goals([['2030-12-31', 45]]),
    unit: unit('%', '%'),
    desiredTrend: IndicatorDesiredTrend.Increasing,
    options: blockOptions(),
  },
};

/**
 * A non-quantified goal replaces the goal value with the desired direction.
 * Without a numeric goal there is no gap to show.
 */
export const NonQuantifiedGoal: Story = {
  args: {
    goals: [],
    options: blockOptions({
      nonQuantifiedGoal: {
        trend: IndicatorNonQuantifiedGoal.Decrease,
        date: '2035-12-31',
      },
    }),
  },
};

/** A long unit wraps within its column instead of widening the summary. */
export const LongUnit: Story = {
  args: {
    unit: unit('tonnes of carbon dioxide equivalent per resident per year'),
    options: blockOptions({
      referenceValue: { show: false, year: null, defaultReferenceValue: null },
    }),
  },
};

/** In a narrow column (e.g. the indicator page aside), the blocks wrap onto new rows. */
export const NarrowColumn: Story = {
  args: {
    options: blockOptions(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

/** Monthly values are dated by day instead of year. */
export const MonthlyResolution: Story = {
  args: {
    timeResolution: IndicatorTimeResolution.Month,
    values: values([
      ['2025-06-30', 64],
      ['2025-07-31', 61],
      ['2025-08-31', 57],
    ]),
    goals: goals([['2028-12-31', 40]]),
    unit: unit('gigawatt hour', 'GWh'),
    options: blockOptions({
      referenceValue: { show: false, year: null, defaultReferenceValue: null },
    }),
  },
};
