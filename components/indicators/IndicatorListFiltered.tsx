import React, { useState } from 'react';

import { usePlan } from 'context/plan';
import { useLocale, useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import PropTypes from 'prop-types';
import { Alert, Badge, Table } from 'reactstrap';
import styled from 'styled-components';

import { beautifyValue } from '../../common/data/format';
import dayjs from '../../common/dayjs';
import { getActionTermContext } from '../../common/i18n';
import { IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import { getIndicatorTranslation } from './IndicatorCard';

export const isEmptyFilter = (val) => val == null || val === '';

const IndicatorType = styled(Badge)<{ $level: string }>`
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY}
    ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};

  color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return readableColor(props.theme.actionColor);
      case 'operational':
        return readableColor(props.theme.graphColors.blue070);
      case 'tactical':
        return readableColor(props.theme.graphColors.blue030);
      case 'strategic':
        return readableColor(props.theme.graphColors.blue010);
      default:
        return props.theme.themeColors.black;
    }
  }};
  background-color: ${(props) => {
    switch (props.$level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.graphColors.blue070;
      case 'tactical':
        return props.theme.graphColors.blue030;
      case 'strategic':
        return props.theme.graphColors.blue010;
      default:
        return '#cccccc';
    }
  }} !important;
`;

const IndicatorDate = styled.span`
  color: ${(props) => props.theme.textColor.tertiary};
`;

const StyledBadge = styled(Badge)`
  white-space: normal;
  margin-right: ${(props) => props.theme.spaces.s050};
  margin-bottom: ${(props) => props.theme.spaces.s050};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY}
    ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  background-color: ${(props) => props.theme.themeColors.light} !important;
  color: ${(props) => props.theme.themeColors.black};
`;

const SectionButton = (props) => {
  if (props.linkTo != null) {
    return (
      <IndicatorLink id={props.linkTo}>
        <a>{props.children}</a>
      </IndicatorLink>
    );
  }
  if (props['aria-controls'] == null) {
    return <div className="indicator-name">{props.children}</div>;
  }
  const buttonProps = Object.assign({}, props);
  delete buttonProps.sectionHeading;
  delete buttonProps.linkTo;
  return <button {...buttonProps} />;
};

const StyledSectionButton = styled(SectionButton)`
  border: none;
  background: none;
  padding-left: 0;
  text-align: left;
  color: ${(props) => props.theme.themeColors.black};
  font-weight: ${(props) =>
    props.sectionHeading ? props.theme.fontWeightBold : 'normal'};
`;

const IndicatorName = styled.div`
  display: flex;
  align-items: center;

  a,
  .indicator-name {
    color: ${(props) => props.theme.themeColors.black};
  }
`;

const IndentableTable = styled(Table)`
  > :not(caption) > * > * {
    padding: 0;
    background-color: transparent;
  }

  > :not(:first-child) {
    border-top: 3px solid ${(props) => props.theme.themeColors.white};
  }
`;

const IndentableCellContentWrapper = styled.div<{
  $visibleIndentation?: boolean;
  $sectionHeader?: boolean;
  $numeric: boolean;
  $firstCol: number;
  $indent: number;
}>`
  padding: ${(props) =>
    props.$sectionHeader
      ? `.5rem`
      : `0.5rem 0.5rem .5rem ${+(props.$firstCol ?? 0) + 0.5}rem`};
  text-align: ${(props) => (props.$numeric ? 'right' : 'left')};
  font-weight: ${(props) =>
    props.$sectionHeader
      ? props.theme.fontWeightBold
      : props.theme.fontWeightNormal};
  line-height: ${(props) => props.theme.lineHeightMd};
  border-left: ${(props) => 24 * props.$indent}px solid
    ${(props) =>
      props.$sectionHeader || props.$visibleIndentation
        ? props.theme.themeColors.light
        : props.theme.themeColors.white};
  background-color: ${(props) =>
    props.$sectionHeader === true ? props.theme.themeColors.light : 'inherit'};
`;

const IndentableTableCell = (props) => (
  <td onClick={props.onClick}>
    <IndentableCellContentWrapper
      $indent={props.indent}
      $numeric={props.numeric}
      $firstCol={props.firstCol}
      $visibleIndentation={props.visibleIndentation ?? false}
    >
      {props.children}
    </IndentableCellContentWrapper>
  </td>
);

const Value = styled.span``;

const Unit = styled.span`
  margin-left: 0.5rem;
  font-size: 80%;
`;

const ExpandButton = styled.button`
  position: relative;
  background: transparent;
  color: inherit;
  border: none;
  margin: ${({ theme }) => `
    -${theme.spaces.s050}
    ${theme.spaces.s050}
    -${theme.spaces.s050}
    -${theme.spaces.s025}
  `};
  padding: ${({ theme }) => theme.spaces.s050};
  font-size: 0;
  transition: all 0.2s;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
`;

const ExpandIcon = styled(Icon)<{ $expanded: boolean }>`
  transition: transform 0.2s;
  transform: rotate(${({ $expanded }) => ($expanded ? '90deg' : '0deg')});
`;

const IndentableTableHeader = (props) => {
  // const theme = useTheme();
  const {
    onClick,
    colSpan,
    indent,
    sectionHeader,
    numeric,
    firstCol,
    children,
  } = props;
  return (
    <th scope="col" onClick={onClick} colSpan={colSpan}>
      <IndentableCellContentWrapper
        $indent={indent}
        $sectionHeader={sectionHeader}
        $numeric={numeric}
        $firstCol={firstCol}
      >
        {children}
      </IndentableCellContentWrapper>
    </th>
  );
};

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

type Hierarchy = {
  [key: string]: {
    id: string;
    isRoot: boolean;
    children: string[];
    path: string[];
    // Doesn't seem to be used
    pathNames: string[];
  };
};

type Indicators = {
  name: string;
  level: string;
  organization: {
    name: string;
  };
  common: {
    id: string;
  };
}[];

function groupIndicatorsByHierarchy(
  indicators: Indicators,
  hierarchy: Hierarchy
): {
  nonHierarchicalIndicators: Indicators;
  hierarchicalIndicators: Indicators;
} {
  return indicators.reduce(
    (groups, indicator) =>
      !!indicator.common && hierarchy[indicator.common.id]
        ? {
            ...groups,
            hierarchicalIndicators: [
              ...groups.hierarchicalIndicators,
              indicator,
            ],
          }
        : {
            ...groups,
            nonHierarchicalIndicators: [
              ...groups.nonHierarchicalIndicators,
              indicator,
            ],
          },
    {
      nonHierarchicalIndicators: [],
      hierarchicalIndicators: [],
    }
  );
}

function sortIndicators(
  hierarchy: Hierarchy,
  indicators: Indicators,
  displayMunicipality: boolean
) {
  const isHierarchical = !!hierarchy && Object.keys(hierarchy).length > 0;

  const sortedIndicators = [...indicators]
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => {
      if (levels[a.level].index < levels[b.level].index) {
        return -1;
      }
      if (levels[a.level].index > levels[b.level].index) {
        return 1;
      }
      return 0;
    });

  if (displayMunicipality) {
    sortedIndicators.sort((a, b) =>
      a.organization.name.localeCompare(b.organization.name)
    );
  }

  /**
   * Split indicators that belong to a hierarchy (visualised as a tree in the table)
   * so that they can be sorted separately from non hierarchical indicators
   */
  const { nonHierarchicalIndicators, hierarchicalIndicators } = isHierarchical
    ? groupIndicatorsByHierarchy(sortedIndicators, hierarchy)
    : {
        nonHierarchicalIndicators: sortedIndicators,
        hierarchicalIndicators: [],
      };

  if (hierarchicalIndicators.length) {
    hierarchicalIndicators.sort((a, b) => {
      if (a.common == null || b.common == null) {
        return 0;
      }

      const pathA = hierarchy[a.common.id]?.path ?? [];
      const pathB = hierarchy[b.common.id]?.path ?? [];

      for (let i = 0; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] === pathB[i]) continue;

        return parseInt(pathA[i]) - parseInt(pathB[i]);
      }

      return pathA.length - pathB.length;
    });
  }

  if (!isHierarchical || !displayMunicipality) {
    return [[...nonHierarchicalIndicators, ...hierarchicalIndicators]];
  }

  const grouped = new Map();
  [...nonHierarchicalIndicators, ...hierarchicalIndicators].forEach(
    (indicator) => {
      const commonId = indicator.common?.id;
      const group = grouped.get(commonId) ?? [];
      grouped.set(commonId, [...group, indicator]);
    }
  );

  return [...grouped.values()];
}

const DEFAULT_UNCOLLAPSED_DEPTH = 1;

const defaultVisibleByParent = (indicators, hierarchy) => {
  const collapsibleCommonIndicators = Object.values(hierarchy).filter(
    (v) => v.children.length > 0
  );
  return Object.fromEntries(
    collapsibleCommonIndicators.map((v) => [
      v.id,
      v.path.length > DEFAULT_UNCOLLAPSED_DEPTH ? false : true,
    ])
  );
};

const isVisible = (indicator, hierarchy, visibleByParent) => {
  const { common } = indicator;
  if (common == null) {
    return true;
  }
  if (hierarchy == null || Object.keys(hierarchy).length === 0) {
    return true;
  }
  const { path } = hierarchy[common.id];
  for (const cid of path) {
    if (cid != common.id && visibleByParent[cid] === false) {
      return false;
    }
  }
  return true;
};

const indicatorElementId = (id) => `indicator-${id}`;

const descendantIds = (indicator, hierarchy) => {
  const { common } = indicator;
  if (common == null) {
    return [];
  }
  if (hierarchy == null || Object.keys(hierarchy).length === 0) {
    return [];
  }
  const descendants = hierarchy[common.id]?.descendants.map((d) =>
    indicatorElementId(d)
  );
  if (descendants.length === 0) {
    return null;
  }
  return descendants.join(' ');
};

const IndicatorListFiltered = (props) => {
  const t = useTranslations();
  const {
    indicators,
    categoryColumnLabel,
    displayMunicipality,
    hierarchy,
    displayNormalizedValues,
    shouldDisplayCategory,
    displayLevel,
    includePlanRelatedIndicators,
    commonCategories,
  } = props;

  const locale = useLocale();

  // used for multi-city group expanding/collapsing
  // TODO: merge with single city version
  const [visibleGroups, setVisibleGroups] = useState({ 0: true });
  // used for single city expanding/collapsing
  const [visibleByParent, setVisibleByParent] = useState(() =>
    defaultVisibleByParent(indicators, hierarchy)
  );

  const toggleVisibility = (indicator) => {
    setVisibleByParent((prev) => {
      const cid = indicator.common.id;
      const previouslyVisible = prev[cid];
      return Object.assign({}, prev, { [cid]: !previouslyVisible });
    });
  };
  const plan = usePlan();
  const toggleHidden = (idx) => {
    const newGroups = {};
    newGroups[idx] = idx in visibleGroups ? visibleGroups[idx] === false : true;

    setVisibleGroups((visibleGroups) => ({
      ...visibleGroups,
      ...newGroups,
    }));
    return null;
  };

  const sortedIndicators = sortIndicators(
    hierarchy,
    indicators,
    displayMunicipality
  );

  const someIndicatorsHaveCategories =
    sortedIndicators
      .flat()
      .reduce((cumul, cur) => Math.max(cumul, cur.categories.length), 0) > 0;
  const allIndicatorsHaveSameLevel =
    new Set(sortedIndicators.flat().map((i) => i.level)).size === 1;

  const indicatorElement = (
    item,
    collapsible,
    itemName,
    expanded,
    expandKey,
    options
  ) =>
    itemName && (
      <IndicatorName>
        {collapsible && (
          <ExpandButton
            aria-label={expanded ? t('collapse-row') : t('expand-row')}
            onClick={() => toggleVisibility(item)}
          >
            <ExpandIcon
              width="16px"
              height="16px"
              $expanded={expanded}
              name="angle-right"
            />
          </ExpandButton>
        )}

        <StyledSectionButton
          aria-controls={expandKey}
          aria-expanded={expanded}
          linkTo={options?.linkTo}
          sectionHeading={options?.type === 'section'}
        >
          {itemName}
        </StyledSectionButton>
      </IndicatorName>
    );

  const indicatorName = (item, collapsible, expanded, expandKey, options) => {
    let name = null;
    if (
      item.name != null &&
      item.name.length > 0 &&
      (options.singleOrganization === true ||
        item.common == null ||
        hierarchy == null ||
        Object.keys(hierarchy).length === 0)
    ) {
      name = item.name;
    } else if (item.common?.name != null) {
      /* The name of the common indicator is currently used only for
       plans which have multiple organizations with multiple
       indicators grouped together by their common indicator.
       */
      name = item.common.name;
    }
    return indicatorElement(
      item,
      collapsible,
      name,
      expanded,
      expandKey,
      options
    );
  };
  const indentationLevel = (item) =>
    item.common == null
      ? 1
      : (hierarchy[item.common.id]?.path?.length ?? 1) - 1;

  const hierarchyEnabled =
    hierarchy != null && Object.keys(hierarchy).length > 1;
  const indicatorNameColumnEnabled = !hierarchyEnabled || !displayMunicipality;

  if (sortedIndicators.flat().length === 0) {
    return (
      <div className="mt-5 mb-5 pb-5">
        <Alert color="primary">{t('search-no-results')}</Alert>
      </div>
    );
  }

  return (
    <div className="mt-5 mb-5 pb-5">
      <IndentableTable hover>
        {sortedIndicators.map((group, idx) => {
          const expanded = visibleGroups[idx] === true;
          const expandKey = `common-indicator-section-${idx}`;
          const headers = [];
          if (indicatorNameColumnEnabled) {
            headers.push(
              <IndentableTableHeader key="hr-name">
                {t('name')}
              </IndentableTableHeader>
            );
          }
          if (!allIndicatorsHaveSameLevel && displayLevel) {
            headers.push(
              <IndentableTableHeader key="hr-type">
                {t('type')}
              </IndentableTableHeader>
            );
          }
          if (displayMunicipality) {
            headers.push(
              <IndentableTableHeader
                key="hr-municipality"
                indent={indentationLevel(group[0])}
                firstCol
              >
                {t('municipality')}
              </IndentableTableHeader>
            );
          }
          if (includePlanRelatedIndicators) {
            // Use common categories for columns
            commonCategories.forEach((category) => {
              headers.push(
                <IndentableTableHeader key={`hr-${category.typeIdentifier}`}>
                  {category.type.name}
                </IndentableTableHeader>
              );
            });
          } else if (someIndicatorsHaveCategories) {
            // Existing code for regular categories
            headers.push(
              <IndentableTableHeader key="hr-themes">
                {categoryColumnLabel || t('themes')}
              </IndentableTableHeader>
            );
          }
          headers.push(
            <IndentableTableHeader key="hr-updated">
              {t('updated')}
            </IndentableTableHeader>
          );
          headers.push(
            <IndentableTableHeader key="hr-value" numeric>
              {t('indicator-value')}
            </IndentableTableHeader>
          );
          if (displayNormalizedValues) {
            headers.push(
              <IndentableTableHeader key="hr-normalized-value" numeric>
                {t('indicator-population-normalized-value')}
              </IndentableTableHeader>
            );
          }

          return (
            <React.Fragment key={`indicator-group-${idx}`}>
              {!indicatorNameColumnEnabled && (
                <tbody key="body-1">
                  <tr>
                    <IndentableTableHeader
                      sectionHeader={true}
                      onClick={(event) => toggleHidden(idx)}
                      colSpan={headers.length}
                      indent={indentationLevel(group[0])}
                    >
                      {indicatorName(group[0], true, expanded, expandKey, {
                        type: 'section',
                        singleOrganization: !displayMunicipality,
                      })}
                    </IndentableTableHeader>
                  </tr>
                </tbody>
              )}
              <tbody
                key="body-2"
                id={expandKey}
                aria-hidden={!expanded}
                style={{ display: expanded ? 'table-row-group' : 'none' }}
              >
                <tr>{headers}</tr>
                {group.map((item) => {
                  // FIXME: It sucks that we only use the context for the translation key 'action'
                  const indicatorType =
                    item.level === 'action'
                      ? t('action', getActionTermContext(plan))
                      : getIndicatorTranslation(item.level, t);
                  let [normalizedValue, normalizedUnit] = [null, null];
                  // We currently support only one normalizer, the population indicator
                  const normalizations = item.common?.normalizations;
                  if (
                    displayNormalizedValues &&
                    normalizations != null &&
                    normalizations.length > 0
                  ) {
                    const populationNormalization = normalizations.find(
                      (n) => n.normalizer.identifier === 'population'
                    );
                    if (populationNormalization != null) {
                      const normalizedValueObject =
                        item.latestValue?.normalizedValues.find(
                          (v) =>
                            v.normalizerId ===
                            populationNormalization.normalizer.id
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
                  const visible =
                    sortedIndicators.length > 1 || !hierarchyEnabled
                      ? true
                      : isVisible(item, hierarchy, visibleByParent);
                  const collapseState = visibleByParent[item.common?.id];
                  const collapsible = collapseState !== undefined;
                  const collapsed = collapseState === true;

                  return (
                    <tr
                      key={item.id}
                      id={indicatorElementId(item.common?.id ?? item.id)}
                      style={{ display: visible ? 'table-row' : 'none' }}
                    >
                      {indicatorNameColumnEnabled && (
                        <IndentableTableCell
                          indent={hierarchyEnabled && indentationLevel(item)}
                          visibleIndentation={false}
                        >
                          {indicatorName(
                            item,
                            collapsible,
                            collapsed,
                            descendantIds(item, hierarchy),
                            {
                              type: 'indicator',
                              linkTo: item.id,
                              singleOrganization: !displayMunicipality,
                            }
                          )}
                        </IndentableTableCell>
                      )}
                      {!allIndicatorsHaveSameLevel && displayLevel && (
                        <IndentableTableCell>
                          <IndicatorType $level={item.level}>
                            {indicatorType || <span>-</span>}
                          </IndicatorType>
                        </IndentableTableCell>
                      )}
                      {displayMunicipality && (
                        <IndentableTableCell
                          indent={indentationLevel(item)}
                          firstCol
                          visibleIndentation={true}
                        >
                          <IndicatorLink id={item.id}>
                            <a>{item.organization.name}</a>
                          </IndicatorLink>
                        </IndentableTableCell>
                      )}
                      {includePlanRelatedIndicators
                        ? commonCategories.map((commonCategory) => (
                            <IndentableTableCell
                              key={`cat-${commonCategory.typeIdentifier}`}
                            >
                              {item.categories
                                .filter(
                                  (cat) =>
                                    cat.common &&
                                    cat.common.type.identifier ===
                                      commonCategory.typeIdentifier
                                )
                                .map((cat) => (
                                  <StyledBadge key={cat.common.id}>
                                    {cat.common.name}
                                  </StyledBadge>
                                ))}
                            </IndentableTableCell>
                          ))
                        : someIndicatorsHaveCategories && (
                            <IndentableTableCell>
                              {item.categories.map((cat) => {
                                if (
                                  cat &&
                                  (shouldDisplayCategory?.(cat) ?? true)
                                )
                                  return (
                                    <StyledBadge key={cat.id}>
                                      {cat.name}
                                    </StyledBadge>
                                  );
                                return false;
                              })}
                            </IndentableTableCell>
                          )}
                      <IndentableTableCell>
                        {item.latestValue && (
                          <IndicatorDate>
                            {dayjs(item.latestValue.date).format(timeFormat)}
                          </IndicatorDate>
                        )}
                      </IndentableTableCell>
                      <IndentableTableCell numeric>
                        <IndicatorLink id={item.id}>
                          <a>
                            <Value>
                              {item.latestValue
                                ? beautifyValue(item.latestValue.value, locale)
                                : '-'}
                            </Value>
                            {item.latestValue && (
                              <Unit>{item.unit?.shortName ?? ''}</Unit>
                            )}
                          </a>
                        </IndicatorLink>
                      </IndentableTableCell>
                      {displayNormalizedValues && (
                        <IndentableTableCell numeric>
                          <IndicatorLink id={item.id}>
                            <a>
                              <Value>
                                {beautifyValue(normalizedValue, locale)}
                              </Value>
                              <Unit>{normalizedUnit ?? ''}</Unit>
                            </a>
                          </IndicatorLink>
                        </IndentableTableCell>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </React.Fragment>
          );
        })}
      </IndentableTable>
    </div>
  );
};

IndicatorListFiltered.propTypes = {
  categoryColumnLabel: PropTypes.string,
  indicators: PropTypes.arrayOf(PropTypes.object).isRequired,
  shouldDisplayCategory: PropTypes.func,
  displayLevel: PropTypes.bool,
  includePlanRelatedIndicators: PropTypes.bool,
  commonCategories: PropTypes.arrayOf(PropTypes.object),
};

export default IndicatorListFiltered;
