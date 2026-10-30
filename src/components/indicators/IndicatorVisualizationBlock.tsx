import type { Ref } from 'react';

import type { ChartHandle } from '@common/components/Chart';

import type {
  AreaChartVisualizationFragment,
  BarChartVisualizationFragment,
  LineChartVisualizationFragment,
  PieChartVisualizationFragment,
  SummaryVisualizationFragment,
} from '@/common/__generated__/graphql';
import DashboardIndicatorSummaryBlock from '@/components/contentblocks/DashboardIndicatorSummaryBlock';
import DashboardIndicatorAreaChartBlock from '@/components/contentblocks/indicator-chart/DashboardIndicatorAreaChartBlock';
import DashboardIndicatorBarChartBlock from '@/components/contentblocks/indicator-chart/DashboardIndicatorBarChartBlock';
import DashboardIndicatorLineChartBlock from '@/components/contentblocks/indicator-chart/DashboardIndicatorLineChartBlock';
import DashboardIndicatorPieChartBlock from '@/components/contentblocks/indicator-chart/DashboardIndicatorPieChartBlock';
import type { AriaDetail } from '@/components/graphs/indicator-graph-aria';

export type IndicatorVisualizationBlockData =
  | BarChartVisualizationFragment
  | LineChartVisualizationFragment
  | AreaChartVisualizationFragment
  | PieChartVisualizationFragment
  | SummaryVisualizationFragment;

interface Props {
  block: IndicatorVisualizationBlockData;
  /** 'summary' when a data table is rendered beside the chart */
  ariaDetail?: AriaDetail;
  /** For exporting the chart, e.g. as a PNG */
  chartRef?: Ref<ChartHandle>;
}

/** Whether the block draws a chart; a summary block draws only text */
export function blockHasChart(block: IndicatorVisualizationBlockData): boolean {
  // Exhaustive, so a new block type fails the typecheck until it's added here
  switch (block.__typename) {
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart':
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart':
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart':
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart':
      return true;
    case 'DashboardIndicatorSummaryBlock':
    case 'IndicatorDefaultSummary':
      return false;
  }
}

const IndicatorVisualizationBlock = ({ block, ariaDetail, chartRef }: Props) => {
  switch (block.__typename) {
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart': {
      const { __typename, ...rest } = block;
      return (
        <DashboardIndicatorBarChartBlock {...rest} ariaDetail={ariaDetail} chartRef={chartRef} />
      );
    }
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart': {
      const { __typename, ...rest } = block;
      return (
        <DashboardIndicatorLineChartBlock {...rest} ariaDetail={ariaDetail} chartRef={chartRef} />
      );
    }
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart': {
      const { __typename, ...rest } = block;
      return (
        <DashboardIndicatorAreaChartBlock {...rest} ariaDetail={ariaDetail} chartRef={chartRef} />
      );
    }
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart': {
      const { __typename, ...rest } = block;
      return (
        <DashboardIndicatorPieChartBlock {...rest} ariaDetail={ariaDetail} chartRef={chartRef} />
      );
    }
    case 'DashboardIndicatorSummaryBlock':
    case 'IndicatorDefaultSummary':
      return <DashboardIndicatorSummaryBlock indicator={block.indicator} />;
    default:
      return null;
  }
};

export default IndicatorVisualizationBlock;
