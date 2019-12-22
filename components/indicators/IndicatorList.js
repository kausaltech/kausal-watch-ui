import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
      generalContent {
        indicatorListLeadContent
      }
      categoryTypes {
        identifier
        categories {
          id
          identifier
          name
          parent {
            id
          }
        }
      }
    }
  }
`;

class IndicatorList extends React.Component {
  static contextType = PlanContext;

  processDataToProps(data) {
    const { plan } = data;
    const generalContent = plan.generalContent || {};
    const { indicatorLevels, categoryTypes } = plan;

    const indicators = indicatorLevels.map((il) => {
      const { indicator, level } = il;

      indicator.level = level.toLowerCase();
      return indicator;
    });

    const categories = [];
    categoryTypes.forEach((ct) => {
      if (ct.identifier !== 'action') return;

      ct.categories.forEach((cat) => {
        categories.push(cat);
      });
    });

    return { indicators, categories, leadContent: generalContent.indicatorListLeadContent }
  }

  render() {
    const plan = this.context;
    const { t } = this.props;

    return (
      <Query query={GET_INDICATOR_LIST} variables={{ plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const props = this.processDataToProps(data);
          const { leadContent } = props;
          delete props.leadContent;

          return (
            <>
              <Meta
                title={t('indicators')}
                description={`Toimenpiteiden edistymistä ja kasvihuonekaasupäästöjen kehitystä seurataan mittareilla`}
              />
              <IndicatorsHero leadContent={leadContent} />
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
