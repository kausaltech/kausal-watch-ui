import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';

import { useTheme } from 'common/theme';
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
`;

const IndentableTable = styled(Table)`
  > :not(caption) > * > * {
    padding: 0;
    background-color: transparent;
  }

  > :not(:first-child) {
    border-top: 3px solid ${props => props.theme.themeColors.white};
}
`;

const IndentableCellContentWrapper = styled.div`
  padding: ${(props) => (props.sectionHeader === true ? "0.5rem" : "0.15rem 0.5rem")};
  font-weight: ${(props) => (props.sectionHeader === true ? "bold" : "normal")};
  border-left: ${(props) => 30 * props.indent}px solid ${(props) => props.theme.themeColors.light};
  background-color: ${(props) => (props.sectionHeader === true ? props.theme.themeColors.light : 'inherit')};
`;

const IndentableTableCell = (props) => (
  <td>
    <IndentableCellContentWrapper indent={props.indent}>
      { props.children }
    </IndentableCellContentWrapper>
  </td>
);

const DarkenedTableHeader = styled.th`
  background-color: red;
`;

const IndentableTableHeader = (props) => {
  const theme = useTheme();
  return (
    <th onClick={props.onClick} colSpan={props.colSpan}>
      <IndentableCellContentWrapper indent={props.indent} sectionHeader={props.sectionHeader}>
        { props.children }
      </IndentableCellContentWrapper>
    </th>
  );
};


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
      Activesearch: '',
      hiddenGroups: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  toggleHidden(idx) {
    this.setState(state => {
      let newVal = !(state.hiddenGroups[idx] === true);
      console.log(idx);
      const newHiddenGroups = Object.assign(state.hiddenGroups, {[idx]: newVal});
      return Object.assign({}, state, {hiddenGroups: newHiddenGroups});
    })
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

      const pathNames = hierarchy[item.common.id]?.pathNames;
      if (pathNames != null && pathNames.length > 0) {
        result = pathNames[pathNames.length -1] ?? '--not-found--';
      }
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
    const indentationLevel = (item) => (
      (hierarchy[item.common.id]?.path?.length ?? 1) - 1
    );
    return (
      <div className="mb-5 pb-5">
        <IndicatorListFilters cats={sortedCategories} changeOption={this.handleChange} />
        <IndentableTable hover>
          <thead>
          </thead>
          {filteredIndicators.map((group, idx) => (
            <tbody>
              <tr>
                <IndentableTableHeader sectionHeader={true} onClick={event =>this.toggleHidden(idx)} colSpan="3" indent={indentationLevel(group[0])}>{indicatorName(group[0])}</IndentableTableHeader>
              </tr>
              <tr style={{display: (this.state.hiddenGroups[idx] === false ? "none": "table-row")}}>
                { !allIndicatorsHaveSameLevel && <IndentableTableHeader>{ t('type') }</IndentableTableHeader> }
                { displayMunicipality && <IndentableTableHeader indent={indentationLevel(group[0])}>{ t('municipality') }</IndentableTableHeader> }
                { someIndicatorsHaveCategories && <IndentableTableHeader>{ t('themes') }</IndentableTableHeader> }
                <IndentableTableHeader>{ t('updated') }</IndentableTableHeader>
                <IndentableTableHeader>{ t('indicator-value') }</IndentableTableHeader>
              </tr>
              {group.map((item) => {
                let timeFormat = 'l';
                if (item.timeResolution === 'YEAR') {
                  timeFormat = 'YYYY';
                }
                return (<>
                          <tr style={{display: (this.state.hiddenGroups[idx] === false ? "none": "table-row")}} key={item.id}>
                    { !allIndicatorsHaveSameLevel &&
                      <IndentableTableCell>
                        <IndicatorType level={item.level}>
                          { t(item.level) || <span>-</span> }
                        </IndicatorType>
                      </IndentableTableCell>
                    }
                    { displayMunicipality &&
                      <IndentableTableCell indent={indentationLevel(item)}>
                        <IndicatorLink id={item.id}>
                          <a>{item.organization.name}</a>
                        </IndicatorLink>
                      </IndentableTableCell>
                    }
                    { someIndicatorsHaveCategories &&
                      <IndentableTableCell>
                        {item.categories.map((cat) => {
                          if (cat) return <StyledBadge key={cat.id}>{cat.name}</StyledBadge>;
                          return false;
                        })}
                      </IndentableTableCell>
                    }
                    <IndentableTableCell>
                      {item.latestValue && (
                        <IndicatorDate>
                          { dayjs(item.latestValue.date).format(timeFormat) }
                        </IndicatorDate>
                      )}
                    </IndentableTableCell>
                    <IndentableTableCell>
                      {item.latestValue && (
                        <IndicatorLink id={item.id}>
                          <a>{`${beautifyValue(item.latestValue.value, i18n.language)} ${item.unit?.shortName ?? ''}`}</a>
                        </IndicatorLink>
                      )}
                    </IndentableTableCell>
                  </tr>
                </>);
              })}
            </tbody>
          ))}
        </IndentableTable>
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
