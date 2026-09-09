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
import type { AriaDetail } from '@/components/graphs/indicator-graph.utils';

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
}

const IndicatorVisualizationBlock = ({ block, ariaDetail }: Props) => {
  switch (block.__typename) {
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorBarChartBlock {...rest} ariaDetail={ariaDetail} />;
    }
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorLineChartBlock {...rest} ariaDetail={ariaDetail} />;
    }
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorAreaChartBlock {...rest} ariaDetail={ariaDetail} />;
    }
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorPieChartBlock {...rest} ariaDetail={ariaDetail} />;
    }
    case 'DashboardIndicatorSummaryBlock':
    case 'IndicatorDefaultSummary':
      return <DashboardIndicatorSummaryBlock indicator={block.indicator} />;
    default:
      return null;
  }
};

export default IndicatorVisualizationBlock;
