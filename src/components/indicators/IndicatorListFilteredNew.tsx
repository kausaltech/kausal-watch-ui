import React from 'react';

import { useTranslations } from 'next-intl';
import { Alert, Table } from 'reactstrap';
import styled from 'styled-components';

import type { IndicatorListPageFragmentFragment } from '@/common/__generated__/graphql';

import Icon from '../common/Icon';
import type { CategoryType, IndicatorListIndicator } from './IndicatorList';
import IndicatorTableCell from './IndicatorTableCell';
import IndicatorTableHeader from './IndicatorTableHeader';
import {
  type IndicatorTableColumn,
  IndicatorTableColumnId,
  groupIndicatorsByCommonCategory,
  indentationLevel,
} from './indicatorUtils';
import type { Hierarchy } from './process-indicators';

export const isEmptyFilter = (val) => val == null || val === '';

const Cell = styled.td`
  padding: ${(props) => props.theme.spaces.s200};
`;

const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const GroupHeaderContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCell = (props: {
  indent: number;
  children: React.ReactNode;
  hasChildren: boolean;
  expanded: boolean;
  onToggle?: () => void;
}) => {
  const { indent, children, hasChildren, expanded, onToggle } = props;
  return (
    <Cell>
      <CellWrapper>
        {indent > 0 ? <div style={{ paddingLeft: `${indent * 16}px` }}> </div> : null}
        {hasChildren ? (
          <ExpandButton aria-label={expanded ? 'Collapse' : 'Expand'} onClick={onToggle}>
            <ExpandIcon width="16px" height="16px" $expanded={expanded} name="angle-right" />
          </ExpandButton>
        ) : null}
        {children}
      </CellWrapper>
    </Cell>
  );
};

const IndicatorTableRow = styled.tr`
  &.group-header {
    background: ${({ theme }) => theme.cardBackground.primary};
    font-weight: ${({ theme }) => theme.fontWeightBold};
  }
`;

const GroupHeaderCell = (props: {
  colSpan: number;
  indent: number;
  title: string;
  onToggle: () => void;
  isExpanded: boolean;
}) => {
  const { colSpan, indent, title, onToggle, isExpanded } = props;
  return (
    <td colSpan={colSpan} style={{ paddingLeft: `${indent * 16}px` }}>
      <GroupHeaderContent>
        <ExpandButton aria-label={isExpanded ? 'Collapse' : 'Expand'} onClick={onToggle}>
          <ExpandIcon width="16px" height="16px" $expanded={isExpanded} name="angle-right" />
        </ExpandButton>
        <h4>{title}</h4>
      </GroupHeaderContent>
    </td>
  );
};
interface IndicatorListFilteredProps {
  categoryType?: CategoryType;
  indicators: IndicatorListIndicator[];
  hierarchy?: Hierarchy;
  openIndicatorsInModal?: (id: string) => void | null;
  listColumns: NonNullable<IndicatorListPageFragmentFragment['listColumns']>;
}

export default function IndicatorListFiltered(props: IndicatorListFilteredProps) {
  const t = useTranslations();
  //console.log('IndicatorListFilteredNew', props);
  const { indicators, hierarchy, openIndicatorsInModal, listColumns } = props;

  // Calculate initial collapsed state - collapse all nodes by default
  const initialCollapsedNodes = React.useMemo(() => {
    const groupedIndicators = groupIndicatorsByCommonCategory(indicators);
    const collapsedSet = new Set<string>();

    groupedIndicators.forEach((group, commonId) => {
      // Collapse groups with multiple indicators
      if (group.length > 1 && commonId) {
        collapsedSet.add(commonId);
      }
      // Collapse nodes that have children in the hierarchy
      if (hierarchy && commonId && hierarchy[commonId]?.children.length > 0) {
        collapsedSet.add(commonId);
      }
    });

    return collapsedSet;
  }, [indicators, hierarchy]);

  // Track which nodes are collapsed (by commonId)
  const [collapsedNodes, setCollapsedNodes] = React.useState<Set<string>>(initialCollapsedNodes);

  // Toggle collapse state for a node
  const toggleCollapse = (commonId: string) => {
    setCollapsedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(commonId)) {
        next.delete(commonId);
      } else {
        next.add(commonId);
      }
      return next;
    });
  };

  // Check if a non-grouped indicator should be visible based on its path and collapsed ancestors
  const isNodeVisible = (commonId: string | null | undefined): boolean => {
    if (!commonId || !hierarchy || !hierarchy[commonId]) {
      return true;
    }

    const path = hierarchy[commonId]?.path ?? [];
    // Check if any ancestor in the path is collapsed
    for (const ancestorId of path) {
      if (ancestorId !== commonId && collapsedNodes.has(ancestorId)) {
        return false;
      }
    }
    return true;
  };

  if (indicators.flat().length === 0) {
    return (
      <div className="mt-5 mb-5 pb-5">
        <Alert color="primary">{t('search-no-results')}</Alert>
      </div>
    );
  }

  const indicatorColumns: IndicatorTableColumn[] = [
    { id: IndicatorTableColumnId.Organization, label: 'Organization' },
    { id: IndicatorTableColumnId.TimeResolution, label: 'Resolution' },
    { id: IndicatorTableColumnId.Level, label: 'Level' },
    { id: IndicatorTableColumnId.Common, label: 'Has common' },
    { id: IndicatorTableColumnId.LatestValue, label: 'Latest value' },
    { id: IndicatorTableColumnId.Dimensions, label: 'Dimensions' },
  ];

  if (props.categoryType) {
    indicatorColumns.push({
      id: IndicatorTableColumnId.Categories,
      label: props.categoryType.name,
      categoryTypeId: props.categoryType.id,
    });
  }

  const groupedIndicators = groupIndicatorsByCommonCategory(indicators);
  const columnCount = listColumns.length;

  return (
    <div className="mt-5 mb-5 pb-5">
      <Table hover>
        <thead>
          <tr>
            {listColumns.map((column) => (
              <IndicatorTableHeader key={column.id} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(groupedIndicators.entries()).map(([commonId, group]) => {
            const indent = hierarchy ? indentationLevel(group[0], hierarchy) : 0;
            const hasChildren = hierarchy && commonId && hierarchy[commonId]?.children.length > 0;
            const isExpanded = !collapsedNodes.has(commonId);

            // For groups with multiple indicators, show header always
            // but hide the individual indicators when collapsed
            const isGrouped = group.length > 1 && commonId;

            // For non-grouped indicators, check if they should be hidden by collapsed ancestors
            // For grouped indicators (with header), always show the group header
            if (!isGrouped) {
              const isVisible = isNodeVisible(commonId);
              if (!isVisible) {
                return null;
              }
            }

            return isGrouped ? (
              <React.Fragment key={`group-${commonId}`}>
                <IndicatorTableRow
                  data-depth={indent}
                  id={`header-${commonId}`}
                  className="group-header"
                >
                  <GroupHeaderCell
                    colSpan={columnCount}
                    indent={indent}
                    title={group[0].common?.name ?? ''}
                    onToggle={() => toggleCollapse(commonId)}
                    isExpanded={isExpanded}
                  />
                </IndicatorTableRow>
                {isExpanded &&
                  group.map((indicator) => {
                    return (
                      <IndicatorTableRow
                        key={indicator.id}
                        data-depth={indent}
                        id={`indicator-${commonId}-${indicator.id}`}
                      >
                        {listColumns.map((column, index) => (
                          <StyledCell
                            key={column.id}
                            indent={index === 0 ? indent + 1 : 0}
                            hasChildren={false}
                            expanded={false}
                          >
                            <IndicatorTableCell
                              column={column}
                              indicator={indicator}
                              openIndicatorsInModal={openIndicatorsInModal}
                            />
                          </StyledCell>
                        ))}
                      </IndicatorTableRow>
                    );
                  })}
              </React.Fragment>
            ) : (
              <React.Fragment key={`group-${commonId || 'no-common'}`}>
                {group.map((indicator) => {
                  return (
                    <IndicatorTableRow
                      data-depth={indent}
                      key={indicator.id}
                      id={`indicator-${commonId}-${indicator.id}`}
                      className={hasChildren ? 'group-header' : ''}
                    >
                      {listColumns.map((column, index) => (
                        <StyledCell
                          key={column.id}
                          indent={index === 0 ? indent : 0}
                          hasChildren={index === 0 && hasChildren ? true : false}
                          expanded={isExpanded}
                          onToggle={
                            index === 0 && hasChildren && commonId
                              ? () => toggleCollapse(commonId)
                              : undefined
                          }
                        >
                          <IndicatorTableCell
                            column={column}
                            indicator={indicator}
                            openIndicatorsInModal={openIndicatorsInModal}
                          />
                        </StyledCell>
                      ))}
                    </IndicatorTableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
