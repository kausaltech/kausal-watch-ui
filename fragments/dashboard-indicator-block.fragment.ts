import { gql } from '@apollo/client';

export const DASHBOARD_INDICATOR_BLOCK_FRAGMENT = gql`
  fragment DashboardIndicatorFragment on Indicator {
    name
    description
    latestValue {
      value
      date
    }
    goals {
      value
      date
    }
    unit {
      name
      shortName
    }
    desiredTrend
  }

  fragment DashboardIndicatorBlockFragment on DashboardRowBlock {
    blockType
    blocks {
      blockType

      ... on DashboardParagraphBlock {
        text
      }

      ... on DashboardIndicatorPieChartBlock {
        helpText
        year
        chartSeries {
          dimensionCategory {
            id
            name
            defaultColor
          }
          values {
            id
            value
            date
          }
        }
        dimension {
          id
          name
          categories {
            id
            name
          }
        }
        indicator {
          ...DashboardIndicatorFragment
        }
      }

      ... on DashboardIndicatorAreaChartBlock {
        id
        indicator {
          ...DashboardIndicatorFragment
        }
      }

      ... on DashboardIndicatorBarChartBlock {
        id
        indicator {
          ...DashboardIndicatorFragment
        }
      }

      ... on DashboardIndicatorLineChartBlock {
        id
        indicator {
          ...DashboardIndicatorFragment
        }
      }

      ... on DashboardIndicatorSummaryBlock {
        id
        blockType
        indicator {
          ...DashboardIndicatorFragment
        }
      }
    }
  }
`;
