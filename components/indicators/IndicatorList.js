import React from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import { Container } from 'reactstrap';

import { withTranslation } from '../../common/i18n';
import ContentLoader from '../common/ContentLoader';
import PlanContext from '../../context/plan';
import { Meta } from '../layout';
import ErrorMessage from '../common/ErrorMessage';

import IndicatorsHero from './IndicatorsHero';
import IndicatorListFiltered from './IndicatorListFiltered';


const GET_INDICATOR_LIST = gql`
  query IndicatorList($plan: ID!) {
    plan(id: $plan) {
      id
      features {
        hasActionPrimaryOrgs
      }
      indicatorLevels {
        level,
        indicator {
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
          unit {
            shortName
          }
        }
      }
      categoryTypes(usableForIndicators: true) {
        id
        identifier
        categories {
          id
          identifier
          order
          name
          parent {
            id
          }
        }
      }
    }
    planIndicators(plan: $plan) {
      id
      relatedCauses {
        id
        causalIndicator {
          id
        }
        effectIndicator {
          id
        }
        effectType
      }
      common {
        id
        name
        indicators {
          id
          organization { name }
        }
        relatedCauses {
          effectType
          causalIndicator {
            id
            name
          }
        }
        relatedEffects {
          id
          effectType
          effectIndicator {
            id
            name
          }
        }
      }
    }
  }
`;

class IndicatorList extends React.Component {
  static contextType = PlanContext;

  hasInsights(data) {
    const { planIndicators } = data;
    // Check if any of the indicators has causality link
    return planIndicators.find((indicator) => {
      return indicator.relatedCauses?.find((effect) => effect.effectType !== 'PART_OF') !== undefined;
    }) !== undefined;
  };

  processCommonIndicatorHierarchy(planIndicators) {
    const makeLinks = (commonIndicator) => ({
      id: commonIndicator.id,
      isRoot: commonIndicator.relatedEffects.filter(e => e.effectType === 'PART_OF').length === 0,
      children: commonIndicator.relatedCauses
        .filter(e => e.effectType === 'PART_OF')
        .map(e => e.causalIndicator.id)
    });
    const uniqueCommonIndicators = {};
    planIndicators.forEach(i => {
      if (i.common != null && !(i.common.id in uniqueCommonIndicators)) {
        uniqueCommonIndicators[i.common.id] = i.common;
      }
    });
    const processed = Object.fromEntries(
      Object.values(uniqueCommonIndicators)
        .map(i => ([i.id, makeLinks(i)]))
    );
    const expandPaths = (processed, indicators, path) => {
      indicators.forEach(i => {
        const newPath = [...path, i.id]
        processed[i.id].path = newPath;
        processed[i.id].pathNames = newPath.map(p => uniqueCommonIndicators[p].name);
        expandPaths(processed, i.children.map(c => processed[c]), newPath)
      });
      return processed;
    }

    const rootIndicators = Object.values(processed).filter(i => i.isRoot);
    return expandPaths(processed, rootIndicators, []);
  }

  processDataToProps(data) {
    const { plan } = data;
    const displayMunicipality = plan.features.hasActionPrimaryOrgs === true;
    const displayNormalizedValues = undefined !== plan.indicatorLevels.find(
      l => (l.indicator?.common != null && l.indicator.common.normalizations.length > 0)
    );
    const generalContent = plan.generalContent || {};
    const { indicatorLevels, categoryTypes } = plan;

    const indicators = indicatorLevels.map((il) => {
      const { indicator, level } = il;

      return { ...indicator, level: level.toLowerCase() };
    });

    const categories = [];
    categoryTypes.forEach((ct) => {
      ct.categories.forEach((cat) => {
        categories.push(cat);
      });
    });

    return {
      indicators,
      categories,
      leadContent: generalContent.indicatorListLeadContent,
      displayMunicipality,
      displayNormalizedValues
    };
  }

  render() {
    const plan = this.context;
    const { t, title, leadContent } = this.props;

    return (
      <Query query={GET_INDICATOR_LIST} variables={{ plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const props = this.processDataToProps(data);
          props.hierarchy = this.processCommonIndicatorHierarchy(data.planIndicators);
          const showInsights = this.hasInsights(data);

          return (
            <>
              <Meta
                title={title}
              />
              <IndicatorsHero
                leadContent={leadContent}
                showInsights={showInsights}
              />
              <Container>
                <IndicatorListFiltered {...props} />
              </Container>
            </>
          )
        }}
      </Query>
    )
  }
}

IndicatorList.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(IndicatorList);
