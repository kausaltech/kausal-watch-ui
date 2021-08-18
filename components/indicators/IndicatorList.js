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
      indicatorLevels {
        level,
        indicator {
          id
          name
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

  processDataToProps(data) {
    const { plan } = data;
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

    return { indicators, categories, leadContent: generalContent.indicatorListLeadContent };
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
