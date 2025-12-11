import { gql } from '@apollo/client';

export const INDICATOR_LIST_INDICATOR_FRAGMENT = gql`
  fragment IndicatorListIndicator on Indicator {
    id
    name
    timeResolution
    valueRounding
    sortKey
    organization {
      id
      name
    }
    common {
      id
      name
      normalizations {
        unit {
          name
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
      color
      parent {
        id
        name
        color
        level {
          id
        }
      }
      type {
        id
        identifier
      }
      level {
        id
      }
      common {
        id
        type {
          name
          identifier
        }
      }
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
    referenceValue {
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
    values(includeDimensions: false) {
      id
      date
      value
      normalizedValues {
        normalizerId
        value
      }
      categories {
        id
      }
    }
    goals {
      id
      date
      value
      normalizedValues {
        normalizerId
        value
      }
      scenario {
        id
      }
    }
    nonQuantifiedGoal
    nonQuantifiedGoalDate
    unit {
      name
      shortName
    }
    plans {
      id
      identifier
      name
      shortName
      viewUrl
    }
  }
`;
