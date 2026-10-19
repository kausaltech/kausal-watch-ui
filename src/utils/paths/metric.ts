import { gql } from '@apollo/client';

/**
 * The fields of a dimensional metric that kausal_common's metric utilities
 * (`@common/utils/paths/metric`) and node visualisation read.
 */
export const DIMENSIONAL_METRIC_FRAGMENT = gql`
  fragment DimensionalMetric on DimensionalMetricType {
    id
    name
    measureDatapointYears
    dimensions {
      id
      label
      originalId
      helpText
      categories {
        id
        originalId
        label
        color
        order
        group
      }
      groups {
        id
        originalId
        label
        color
        order
      }
    }
    goals {
      categories
      groups
      values {
        year
        value
        isInterpolated
      }
    }
    unit {
      htmlShort
      htmlLong
      short
    }
    stackable
    normalizedBy {
      id
      name
    }
    forecastFrom
    years
    values
  }
`;
