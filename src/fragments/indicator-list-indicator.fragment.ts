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
      relatedCauses {
        id
        effectType
        causalIndicator {
          id
        }
      }
      relatedEffects {
        id
        effectType
        effectIndicator {
          id
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
      common {
        id
        type {
          name
          identifier
        }
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
    plans {
      id
    }
  }
`;
