import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';

import { IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import dayjs from '../../common/dayjs';
import { withTranslation } from '../../common/i18n';
import { beautifyValue } from '../../common/data/format';

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
  }} !important;
`;

const IndicatorDate = styled.span`
  color: ${(props) => props.theme.graphColors.grey050}
`

const StyledBadge = styled(Badge)`
  white-space: normal;
  margin-right: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s050};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  background-color: ${(props) => props.theme.themeColors.light} !important;
  color: ${(props) => props.theme.themeColors.black};
`;

const IndicatorName = styled.div`

  a {
    color: ${(props) => props.theme.themeColors.black};
  }
  padding-left: ${(props) => props.indentLevel * 20}px;
`;

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

function sortIndicators(hierarchy, indicators, displayMunicipality) {
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
  if (displayMunicipality) {
    sorted = indicators.sort((a, b) => a.organization.name.localeCompare(b.organization.name));
  }
  if (hierarchy == null || Object.keys(hierarchy).length === 0) {
    return [sorted];
  }
  sorted = indicators.sort((a, b) => {
    if (a.common == null || b.common == null) {
      return 0;
    }
    const [pathA, pathB] = [hierarchy[a.common.id].path, hierarchy[b.common.id].path];
    for (let i = 0; i < pathA.length && i < pathB.length; i++) {
      if (pathA[i] === pathB[i]) continue;
      return pathA[i] - pathB[i];
    }
    return pathA.length - pathB.length;
  });
  const grouped = new Map();
  sorted.forEach(indicator => {
    const commonId = indicator.common.id;
    const group = grouped.get(commonId) ?? [];
    grouped.set(commonId, [...group, indicator]);
  });
  return [...grouped.values()];
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

  filterIndicators(hierarchy, indicators, displayMunicipality) {
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
        if (item.name.toLowerCase().indexOf(activeSearch.toLowerCase()) !== -1) return true;
        return false;
      }
      return true;
    });

    return sortIndicators(hierarchy, filtered, displayMunicipality);
  }

  render() {
    const { t, categories, indicators, i18n, displayMunicipality, hierarchy } = this.props;
    const filteredIndicators = this.filterIndicators(hierarchy, indicators, displayMunicipality);
    const sortedCategories = [...categories].sort((a, b) => b.order - a.order);

    console.log(filteredIndicators);
    const someIndicatorsHaveCategories = filteredIndicators.flat().reduce(
      ((cumul, cur) => Math.max(cumul, cur.categories.length)), 0) > 0;
    const allIndicatorsHaveSameLevel = new Set(filteredIndicators.flat().map(i => i.level)).size === 1;

    const indicatorElement = (item, itemName, indentLevel) => (
      <IndicatorName indentLevel={indentLevel} >
        <IndicatorLink id={item.id}>
          <a>{itemName}</a>
        </IndicatorLink>
      </IndicatorName>
    );
    const seen = new Set();
    console.log(hierarchy);
    const indicatorName = (item) => {
      let result = null;
      if (item.common == null || hierarchy === null || Object.keys(hierarchy).length === 0) {
        result = item.name;
        return indicatorElement(item, result, 0);
      }

      result = hierarchy[item.common.id]?.pathNames ?? '--not-found--';
      if (seen.has(item.common.id)) {
        result = null;
      }
      seen.add(item.common.id);
      if (result == null) {
        return result;
      }
      const level = (hierarchy[item.common.id]?.path?.length ?? 1) - 1;
      return indicatorElement(item, result, level);
    };
    return (
      <div className="mb-5 pb-5">
        <IndicatorListFilters cats={sortedCategories} changeOption={this.handleChange} />
        <Table hover>
          <thead>
            <tr>
              { !allIndicatorsHaveSameLevel && <th>{ t('type') }</th> }
              <th>{ t('name') }</th>
              { displayMunicipality && <th>{ t('municipality') }</th> }
              { someIndicatorsHaveCategories && <th>{ t('themes') }</th> }
              <th>{ t('updated') }</th>
              <th>{ t('indicator-value') }</th>
            </tr>
          </thead>
          {filteredIndicators.map(group => (
            <tbody>
              <tr><th colSpan="1">{indicatorName(group[0])}</th></tr>
              {group.map((item) => {
                let timeFormat = 'l';
                if (item.timeResolution === 'YEAR') {
                  timeFormat = 'YYYY';
                }
                return (
                  <tr key={item.id}>
                    { !allIndicatorsHaveSameLevel &&
                      <td>
                        <IndicatorType level={item.level}>
                          { t(item.level) || <span>-</span> }
                        </IndicatorType>
                      </td>
                    }
                    <td>
                      { indicatorName(item) }
                    </td>
                    { displayMunicipality &&
                      <td>
                        <IndicatorLink id={item.id}>
                          <a>{item.organization.name}</a>
                        </IndicatorLink>
                      </td>
                    }
                    { someIndicatorsHaveCategories &&
                      <td>
                        {item.categories.map((cat) => {
                          if (cat) return <StyledBadge key={cat.id}>{cat.name}</StyledBadge>;
                          return false;
                        })}
                      </td>
                    }
                    <td>
                      {item.latestValue && (
                        <IndicatorDate>
                          { dayjs(item.latestValue.date).format(timeFormat) }
                        </IndicatorDate>
                      )}
                    </td>
                    <td>
                      {item.latestValue && (
                        <IndicatorLink id={item.id}>
                          <a>{`${beautifyValue(item.latestValue.value, i18n.language)} ${item.unit?.shortName ?? ''}`}</a>
                        </IndicatorLink>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ))}
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
