import { gql } from '@apollo/client';

export const INDICATOR_LIST_INDICATOR_FRAGMENT = gql`
  fragment IndicatorListIndicator on Indicator {
    id
    name
    timeResolution
    organization {
      id
      name
    }
    common {
      id
      name
      normalizations {
        unit {
          shortName
        }
        normalizer {
          name
          id
          identifier
        }
      }
    }
    categories {
      id
      name
      parent {
        id
      }
      type {
        id
        identifier
      }
    }
    latestGraph {
      id
    }
    latestValue {
      id
      date
      value
      normalizedValues {
        normalizerId
        value
      }
    }
    dimensions {
      dimension {
        id
        name
        categories {
          id
          name
        }
      }
    }
    unit {
      shortName
    }
  }
`;
