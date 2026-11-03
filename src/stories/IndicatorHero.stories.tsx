import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { IndicatorDesiredTrend, IndicatorTimeResolution } from '@/common/__generated__/graphql';
import IndicatorHero from '@/components/indicators/IndicatorHero';

type Indicator = Parameters<typeof IndicatorHero>[0]['indicator'];

const indicator = {
  id: '1',
  name: 'Greenhouse gas emissions of buildings heated with district heating',
  level: 'strategic',
  timeResolution: IndicatorTimeResolution.Year,
  desiredTrend: IndicatorDesiredTrend.Decreasing,
  valueRounding: null,
  unit: { name: 't CO₂e', shortName: 't CO₂e' },
  values: [
    { id: 'v1', date: '2015-12-31', value: 120000 },
    { id: 'v2', date: '2023-12-31', value: 95000 },
  ],
} as unknown as Indicator;

const goals = [
  { id: 'g1', date: '2035-12-31', value: 40000, scenario: null },
] as unknown as Parameters<typeof IndicatorHero>[0]['goals'];

const meta = {
  title: 'Indicators/IndicatorHero',
  component: IndicatorHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    indicator,
    orgs: null,
    goals: [],
    legacyMode: false,
  },
} satisfies Meta<typeof IndicatorHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layout: 'overlay',
  },
};

export const Legacy: Story = {
  args: {
    layout: 'overlay',
    legacyMode: true,
    goals,
  },
};

export const Contained: Story = {
  args: {
    layout: 'contained',
  },
};

export const ContainedLegacy: Story = {
  args: {
    layout: 'contained',
    legacyMode: true,
    goals,
  },
};
