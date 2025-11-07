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

const StyledCell = (props: {
  indent: number;
  children: React.ReactNode;
  hasChildren: boolean;
  expanded: boolean;
}) => {
  const { indent, children, hasChildren, expanded } = props;
  return (
    <Cell>
      <CellWrapper>
        {indent > 0 ? <div style={{ paddingLeft: `${indent * 16}px` }}> </div> : null}
        {hasChildren ? (
          <ExpandButton aria-label="TODO" onClick={() => void 0}>
            <ExpandIcon width="16px" height="16px" $expanded={expanded} name="angle-right" />
          </ExpandButton>
        ) : null}
        {children}
      </CellWrapper>
    </Cell>
  );
};

const IndicatorTableRow = (props: { children: React.ReactNode; id: string }) => {
  const { children, id } = props;
  return <tr id={id}>{children}</tr>;
};

const GroupHeaderCell = (props: { colSpan: number; indent: number; children: React.ReactNode }) => {
  const { colSpan, indent, children } = props;
  return (
    <td colSpan={colSpan} style={{ paddingLeft: `${indent * 16}px` }}>
      {children}
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
          {/*
          {indicators.map((indicator) => {
            const indent = hierarchy ? indentationLevel(indicator, hierarchy) : 0;
            return (
              <IndicatorTableRow key={indicator.id} indicator={indicator} indent={indent}>
                {listColumns.map((column) => (
                  <IndicatorTableCell
                    key={column.id}
                    column={column}
                    indicator={indicator}
                    openIndicatorsInModal={openIndicatorsInModal}
                    indent={indent}
                  />
                ))}
              </IndicatorTableRow>
            );
          })}
          */}
          {Array.from(groupedIndicators.entries()).map(([commonId, group]) => {
            const indent = hierarchy ? indentationLevel(group[0], hierarchy) : 0;
            return group.length > 1 && commonId ? (
              <>
                <IndicatorTableRow data-depth={indent} id={`header-${commonId}`}>
                  <GroupHeaderCell colSpan={columnCount} indent={indent}>
                    <ExpandButton aria-label="TODO" onClick={() => void 0}>
                      <ExpandIcon width="16px" height="16px" $expanded={false} name="angle-right" />
                    </ExpandButton>
                    <h4>{group[0].common?.name}</h4>
                  </GroupHeaderCell>
                </IndicatorTableRow>
                {group.map((indicator) => {
                  return (
                    <IndicatorTableRow
                      key={indicator.id}
                      data-depth={indent}
                      id={`indicator-${commonId}-${indicator.id}`}
                    >
                      {listColumns.map((column, index) => (
                        <StyledCell
                          key={column.id}
                          indent={index === 0 ? indent : 0}
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
              </>
            ) : (
              group.map((indicator) => {
                return (
                  <IndicatorTableRow
                    data-depth={indent}
                    key={indicator.id}
                    id={`indicator-${commonId}-${indicator.id}`}
                  >
                    {listColumns.map((column, index) => (
                      <StyledCell
                        key={column.id}
                        indent={index === 0 ? indent : 0}
                        hasChildren={
                          index === 0 && hierarchy && hierarchy[commonId]?.children.length > 0
                            ? true
                            : false
                        }
                        expanded={true}
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
              })
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
