import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';

import { IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import { withTranslation } from '../../common/i18n';

import IndicatorListFilters from './IndicatorListFilters';

const IndicatorType = styled(Badge)`
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};

  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColorFg;
      case 'operational':
        return props.theme.operationalIndicatorColorFg;
      case 'tactical':
        return props.theme.tacticalIndicatorColorFg;
      case 'strategic':
        return props.theme.strategicIndicatorColorFg;
      default:
        return props.theme.themeColors.black;
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
  margin-right: .5rem;
  margin-bottom: .5rem;
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
`;

const IndicatorName = styled.span`
  a {
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

function sortIndicators(indicators) {
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

class IndicatorListFiltered extends React.Component {
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

  filterIndicators(indicators) {
    let i;
    const filtered = indicators.filter((item) => {
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

    return sortIndicators(filtered);
  }

  render() {
    const { t, categories, indicators } = this.props;
    const filteredIndicators = this.filterIndicators(indicators);
    console.log(indicators)
    return (
      <div className="mb-5 pb-5">
        <IndicatorListFilters cats={categories} changeOption={this.handleChange} />
        <Table hover>
          <thead>
            <tr>
              <th>{ t('type') }</th>
              <th>{ t('name') }</th>
              <th>{ t('themes') }</th>
              <th>{ t('graph') }</th>
            </tr>
          </thead>
          <tbody>
            {filteredIndicators.map((item) => (
              <tr key={item.id}>
                <td>
                  <IndicatorType level={item.level}>
                    { t(item.level) || <span>-</span> }
                  </IndicatorType>
                </td>
                <td>
                  <IndicatorName>
                    <IndicatorLink id={item.id}>
                      <a>{item.name}</a>
                    </IndicatorLink>
                  </IndicatorName>
                </td>
                <td>
                  {item.categories.map((cat) => {
                    if (cat) return <StyledBadge color="light" key={cat.id}>{cat.name}</StyledBadge>;
                  })}
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

IndicatorListFiltered.propTypes = {
  t: PropTypes.func.isRequired,
  indicators: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('common')(IndicatorListFiltered);
