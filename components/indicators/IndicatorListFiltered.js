import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';

import { useTheme } from 'common/theme';
import { IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import dayjs from '../../common/dayjs';
import { getActionTermContext, withTranslation } from '../../common/i18n';
import { beautifyValue } from '../../common/data/format';
import { usePlan } from 'context/plan';

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
  color: ${(props) => props.theme.graphColors.grey060}
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

const SectionButton = styled.button`
  border: none;
  background: none;
  padding-left: 0;
  font-weight: ${(props) => props.theme.fontWeightBold};
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
  padding: ${(props) => (
    props.sectionHeader === true
    ? `.5rem`
    : `0.5rem 0.5rem .5rem ${+(props.firstCol ?? 0) + .5}rem`
  )};
  text-align: ${(props) => props.numeric === true ? 'right' : 'left'};
  font-weight: ${(props) => (props.sectionHeader === true ? props.theme.fontWeightBold : props.theme.fontWeightNormal)};
  line-height: ${(props) => props.theme.lineHeightMd};
  border-left: ${(props) => 24 * props.indent}px solid ${(props) => (props.sectionHeader || props.visibleIndentation) ? props.theme.themeColors.light : props.theme.themeColors.white};
  background-color: ${(props) => (props.sectionHeader === true ? props.theme.themeColors.light : 'inherit')};
`;

const IndentableTableCell = (props) => (
  <td>
    <IndentableCellContentWrapper
      indent={props.indent}
      numeric={props.numeric}
      firstCol={props.firstCol}
      visibleIndentation={props.visibleIndentation ?? false}
    >
      { props.children }
    </IndentableCellContentWrapper>
  </td>
);

const Value = styled.span`

`;

const Unit = styled.span`
  margin-left: .5rem;
  font-size: 80%;
`;

const DarkenedTableHeader = styled.th`
  background-color: red;
`;

const IndentableTableHeader = (props) => {
  // const theme = useTheme();
  const { onClick, colSpan, indent, sectionHeader, numeric, firstCol, children } = props;
  return (
    <th onClick={onClick} colSpan={colSpan}>
      <IndentableCellContentWrapper
        indent={indent}
        sectionHeader={sectionHeader}
        numeric={numeric}
        firstCol={firstCol}
      >
        { children }
      </IndentableCellContentWrapper>
    </th>
  );
};

const Bullet = (props) => {
  if (props.level === 0) {
    return null;
  }
  const SYMBOLS = '▪▫•◦▸▹';
  const symbol = SYMBOLS.charAt((props.level - 1) % SYMBOLS.length);
  return <span>{symbol} </span>;
}

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
  if (hierarchy != null && Object.keys(hierarchy).length > 0) {
    sorted = indicators.sort((a, b) => {
      if (a.common == null || b.common == null) {
        return 0;
      }
      const [pathA, pathB] = [hierarchy[a.common.id]?.path ?? [], hierarchy[b.common.id]?.path ?? []];
      for (let i = 0; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] === pathB[i]) continue;
        return pathA[i] - pathB[i];
      }
      return pathA.length - pathB.length;
    });
  }
  if (hierarchy == null || Object.keys(hierarchy).length === 0 || !displayMunicipality) {
    return [sorted];
  }
  const grouped = new Map();
  sorted.forEach(indicator => {
    const commonId = indicator.common?.id;
    const group = grouped.get(commonId) ?? [];
    grouped.set(commonId, [...group, indicator]);
  });
  return [...grouped.values()];
}

const IndicatorListFiltered = (props) => {
  const { t, categories, indicators, i18n, displayMunicipality, hierarchy, displayNormalizedValues } = props;

  const [activeCategory, setActiveCategory] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [visibleGroups, setVisibleGroups] = useState({ 0: true });
  const plan = usePlan();

  const toggleHidden = (idx) => {
    const newGroups = {};
    newGroups[idx] = idx in visibleGroups ? visibleGroups[idx] === false :  true;

    setVisibleGroups(visibleGroups => ({
      ...visibleGroups,
      ...newGroups,
    }));
    return null;
  }

  const handleChange = (filterType, val) => {
    if(filterType === 'Search') {
      setActiveSearch(val);
    }
    if(filterType === 'Category') {
      setActiveCategory(val);
    }
  }

  const filterIndicators = (hierarchy, indicators, displayMunicipality) => {
    let i;
    const filtered = indicators.filter((item) => {

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

  const filteredIndicators = filterIndicators(hierarchy, indicators, displayMunicipality);
  const sortedCategories = [...categories].sort((a, b) => b.order - a.order);

  const someIndicatorsHaveCategories = filteredIndicators.flat().reduce(
    ((cumul, cur) => Math.max(cumul, cur.categories.length)), 0) > 0;
  const allIndicatorsHaveSameLevel = new Set(filteredIndicators.flat().map(i => i.level)).size === 1;

  const indicatorElement = (item, itemName, indentLevel, expanded, expandKey) => (
    <IndicatorName indentLevel={indentLevel} >
      <SectionButton aria-controls={expandKey} aria-expanded={expanded}>
        <Icon name={expanded ? 'angleDown' : 'angleRight'} />
        {itemName}
      </SectionButton>
    </IndicatorName>
  );
  const seen = new Set();

  const indicatorName = (item, expanded, expandKey) => {
    let result = null;
    if (item.common == null || hierarchy === null || Object.keys(hierarchy).length === 0) {
      result = item.name;
      return indicatorElement(item, result, 0, expanded, expandKey);
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
    return indicatorElement(item, result, level, expanded, expandKey);
  };
  const indentationLevel = (item) => (
    item.common == null ? 1 : (hierarchy[item.common.id]?.path?.length ?? 1) - 1
  );

  const hierarchyEnabled = hierarchy != null && Object.keys(hierarchy).length > 1;
  const indicatorNameColumnEnabled = !hierarchyEnabled || !displayMunicipality;

  return (
    <div className="mb-5 pb-5">
      <IndicatorListFilters cats={sortedCategories} changeOption={handleChange} />
      <IndentableTable hover>
        {filteredIndicators.map((group, idx) => {
          const expanded = visibleGroups[idx] === true;
          const expandKey = `common-indicator-section-${idx}`;
          const headers = [];
          if (indicatorNameColumnEnabled) {
            headers.push(
              <IndentableTableHeader key="hr-name">{ t('name') }</IndentableTableHeader>
            );
          }
          if (!allIndicatorsHaveSameLevel) {
            headers.push(
              <IndentableTableHeader key="hr-type">{ t('type') }</IndentableTableHeader>
            );
          }
          if (displayMunicipality) {
            headers.push(
              <IndentableTableHeader
                key="hr-municipality"
                indent={indentationLevel(group[0])}
                firstCol
              >
                { t('municipality') }
              </IndentableTableHeader>
            );
          }
          if (someIndicatorsHaveCategories) {
            headers.push(
              <IndentableTableHeader key="hr-themes">
                { t('themes') }
              </IndentableTableHeader>
            );
          }
          headers.push(<IndentableTableHeader key="hr-updated">{ t('updated') }</IndentableTableHeader>);
          headers.push(<IndentableTableHeader key="hr-value" numeric>{ t('indicator-value') }</IndentableTableHeader>);
          if (displayNormalizedValues) {
            headers.push(<IndentableTableHeader key="hr-normalized-value" numeric>{ t('indicator-population-normalized-value') }</IndentableTableHeader>);
          }

          return (<React.Fragment key={`indicator-group-${idx}`}>
            { !indicatorNameColumnEnabled &&
              <tbody key="body-1">
                <tr>
                  <IndentableTableHeader
                    sectionHeader={true}
                    onClick={event => toggleHidden(idx)}
                    colSpan={headers.length}
                    indent={indentationLevel(group[0])}
                  >
                    {indicatorName(group[0], expanded, expandKey)}
                  </IndentableTableHeader>
                </tr>
              </tbody>
            }
            <tbody key="body-2" id={expandKey} aria-hidden={!expanded} style={{display: (expanded ? "table-row-group": "none")}}>
              <tr>
                { headers }
              </tr>
              {group.map((item) => {
                // FIXME: It sucks that we only use the context for the translation key 'action'
                const indicatorType = item.level === 'action' ? t('action', getActionTermContext(plan)) : t(item.level);
                let [normalizedValue, normalizedUnit] = [null, null];
                // We currently support only one normalizer, the population indicator
                const normalizations = item.common?.normalizations;
                if (displayNormalizedValues && normalizations != null && normalizations.length > 0) {
                  const populationNormalization = normalizations.find(n => n.normalizer.identifier === 'population');
                  if (populationNormalization != null) {
                    const normalizedValueObject = item.latestValue.normalizedValues.find(
                      v => v.normalizerId === populationNormalization.normalizer.id
                    );
                    if (normalizedValueObject != null) {
                      normalizedValue = normalizedValueObject.value;
                      normalizedUnit = populationNormalization.unit.shortName;
                    }
                  }
                }
                let timeFormat = 'l';
                if (item.timeResolution === 'YEAR') {
                  timeFormat = 'YYYY';
                }
                return (
                  <tr key={item.id}>
                    { indicatorNameColumnEnabled &&
                      <IndentableTableCell indent={hierarchyEnabled && indentationLevel(item)} visibleIndentation={false} >
                        {hierarchyEnabled && <Bullet level={indentationLevel(item)} />}
                        <IndicatorLink id={item.id}>{ item.name }</IndicatorLink>
                      </IndentableTableCell>
                    }
                    { !allIndicatorsHaveSameLevel &&
                      <IndentableTableCell>
                        <IndicatorType level={item.level}>
                          { indicatorType || <span>-</span> }
                        </IndicatorType>
                      </IndentableTableCell>
                    }
                    { displayMunicipality &&
                      <IndentableTableCell indent={indentationLevel(item)} firstCol visibleIndentation={true}>
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
                    <IndentableTableCell numeric>
                      {item.latestValue && (
                        <IndicatorLink id={item.id}>
                          <a>
                            <Value>{beautifyValue(item.latestValue.value, i18n.language)}</Value>
                            <Unit>{item.unit?.shortName ?? ''}</Unit>
                          </a>
                        </IndicatorLink>
                      )}
                    </IndentableTableCell>
                    { (displayNormalizedValues) &&
                      <IndentableTableCell numeric>
                        <Value>{beautifyValue(normalizedValue, i18n.language)}</Value>
                        <Unit>{normalizedUnit ?? ''}</Unit>
                      </IndentableTableCell>
                    }
                  </tr>
                );
              })}
            </tbody></React.Fragment>);
        })}
      </IndentableTable>
    </div>
  );
}

IndicatorListFiltered.propTypes = {
  t: PropTypes.func.isRequired,
  indicators: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTranslation('common')(IndicatorListFiltered);
