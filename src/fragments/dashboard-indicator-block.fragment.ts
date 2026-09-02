import { gql } from '@apollo/client';

import { INDICATOR_CHART_FRAGMENTS } from './indicator-chart.fragment';

export const DASHBOARD_INDICATOR_BLOCK_FRAGMENT = gql`
  fragment DashboardIndicatorBlock on DashboardRowBlock {
    id
    blockType
    blocks {
      blockType

      ... on DashboardHeaderBlock {
        id
        text
      }

      ... on DashboardParagraphBlock {
        id
        text
      }

      ... on DashboardIndicatorPieChartBlock {
        id
        helpText
        ...PieChartVisualization
      }

      ... on DashboardIndicatorLineChartBlock {
        id
        helpText
        ...LineChartVisualization
      }

      ... on DashboardIndicatorAreaChartBlock {
        id
        helpText
        ...AreaChartVisualization
      }

      ... on DashboardIndicatorBarChartBlock {
        id
        helpText
        ...BarChartVisualization
      }

      ... on DashboardIndicatorSummaryBlock {
        id
        blockType
        ...SummaryVisualization
      }
    }
  }
  ${INDICATOR_CHART_FRAGMENTS}
`;
