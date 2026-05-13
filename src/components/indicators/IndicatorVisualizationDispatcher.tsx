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

export type IndicatorVisualizationDispatcherData =
  | BarChartVisualizationFragment
  | LineChartVisualizationFragment
  | AreaChartVisualizationFragment
  | PieChartVisualizationFragment
  | SummaryVisualizationFragment;

interface Props {
  block: IndicatorVisualizationDispatcherData;
}

const IndicatorVisualizationDispatcher = ({ block }: Props) => {
  switch (block.__typename) {
    case 'DashboardIndicatorBarChartBlock':
    case 'IndicatorDefaultBarChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorBarChartBlock {...rest} />;
    }
    case 'DashboardIndicatorLineChartBlock':
    case 'IndicatorDefaultLineChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorLineChartBlock {...rest} />;
    }
    case 'DashboardIndicatorAreaChartBlock':
    case 'IndicatorDefaultAreaChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorAreaChartBlock {...rest} />;
    }
    case 'DashboardIndicatorPieChartBlock':
    case 'IndicatorDefaultPieChart': {
      const { __typename, ...rest } = block;
      return <DashboardIndicatorPieChartBlock {...rest} />;
    }
    case 'DashboardIndicatorSummaryBlock':
    case 'IndicatorDefaultSummary':
      return <DashboardIndicatorSummaryBlock indicator={block.indicator} />;
    default:
      return null;
  }
};

export default IndicatorVisualizationDispatcher;
