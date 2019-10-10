import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import ContentLoader from '../common/ContentLoader';
import PlanContext from '../../context/plan';
import { SubpageTitle } from '../layout';
import ErrorMessage from '../common/ErrorMessage';

import IndicatorListFilters from './IndicatorListFilters';


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
      categoryTypes {
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

const IndicatorType = styled(Badge)`
  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.themeColors.white;
      case 'operational':
        return props.theme.themeColors.black;
      case 'tactical':
        return props.theme.themeColors.black;
      case 'strategic':
        return props.theme.themeColors.white;
      default:
        return props.theme.themeColors.dark;
    }
  }};
  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.operationalIndicatorColor;
      case 'tactical':
        return props.theme.tacticalIndicatorColor;
      case 'strategic':
        return props.theme.strategicIndicatorColor;
      default:
        return '#cccccc';
    }
  }};
`;

const StyledBadge = styled(Badge)`
  white-space: normal;
  margin-right: .5em;
`;

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

class FilteredIndicatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: '',
      activeSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(filterType, val) {
    const change = `active${filterType}`;
    this.setState({
      [change]: val,
    });
  }

  sortIndicators(indicators) {
    let sorted = indicators;

    sorted = indicators.sort((a, b) => a.name.localeCompare(b.name));
    sorted = indicators.sort((a, b) => {
      if (levels[a.level].index < levels[b.level].index) {
        return -1;
      }
      if (levels[a.level].index > levels[b.level].index) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }

  filterIndicators() {
    let i;
    const indicators = this.props.indicators.filter((item) => {
      const { activeCategory } = this.state;
      const { activeSearch } = this.state;

      if (activeCategory) {
        let catMatch = false;
        for (i = 0; i < item.categories.length; i += 1) {
          if (item.categories[i].id === activeCategory) catMatch = true;
        }
        if (!catMatch) return false;
      }

      if (activeSearch) {
        if (item.name.toLowerCase().search(activeSearch.toLowerCase()) !== -1) return true;
        return false;
      }
      return true;
    });

    return this.sortIndicators(indicators);
  }

  render() {
    const indicators = this.filterIndicators();
    console.log(indicators.length);
    return (
      <div className="mb-5 pb-5">
        <IndicatorListFilters cats={this.props.categories} changeOption={this.handleChange} />
        <Table hover>
          <tbody>
            {indicators.map(item => (
              <tr key={item.id}>
                <td>
                  <IndicatorType pill level={item.level}>
                    { levels[item.level].fi || <span>-</span> }
                  </IndicatorType>
                </td>
                <td>
                  <IndicatorLink id={item.id}>
                    <a>{item.name}</a>
                  </IndicatorLink>
                </td>
                <td>
                  {item.categories.map(cat => (
                    <StyledBadge color="light" key={cat.id}>{cat.name}</StyledBadge>
                  ))}
                </td>
                <td>
                  {(item.latestGraph || item.latestValue) && (
                    <span>
                      <Icon name="chartLine" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

FilteredIndicatorList.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class IndicatorList extends React.Component {
  static contextType = PlanContext;

  processDataToProps(data) {
    const { plan } = data;
    const { indicatorLevels, categoryTypes } = plan;

    const indicators = indicatorLevels.map((il) => {
      const { indicator, level } = il;

      indicator.level = level.toLowerCase();
      return indicator;
    });

    let categories = [];
    categoryTypes.forEach((ct) => {
      ct.categories.forEach((cat) => {
        categories.push(cat);
      });
    });

    return { indicators, categories }
  }

  render() {
    const plan = this.context;

    return (
      <Query query={GET_INDICATOR_LIST} variables={{ plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;
          const props = this.processDataToProps(data);
          return <FilteredIndicatorList {...props} />
        }}
      </Query>
    )
  }
}

export default IndicatorList;
