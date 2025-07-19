import React, { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';
import { UncontrolledTooltip } from 'reactstrap';
import styled from 'styled-components';

import { PlanContextFragment } from '@/common/__generated__/graphql';

import { COLUMN_CONFIG } from './dashboard.constants';
import { ActionListAction, ColumnConfig } from './dashboard.types';

const StyledRow = styled.tr`
  font-family: ${(props) => `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
    &.merged {
    opacity: 0.25;
  }

  td {
    vertical-align: top;
    min-height: 1px;

    &.has-tooltip > a {
      display: block;
      width: 100%;
      height: 100%;
    }

    &.has-tooltip:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  }

  th.row-title {
    font-weight: ${(props) => props.theme.fontWeightNormal};
  }

  a {
    color: ${(props) => props.theme.themeColors.black};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  // Tooltip wrapper
  > div {
    padding: 0;
    background-color: transparent;
    border-bottom-width: 0px;
    box-shadow: none;
  }

  .tooltip {
    --bs-tooltip-opacity: 1;

    &[data-popper-placement^='top'] .tooltip-arrow::before {
      border-top-color: ${(props) => props.theme.themeColors.white};
    }

    &[data-popper-placement^='bottom'] .tooltip-arrow::before {
      border-bottom-color: ${(props) => props.theme.themeColors.white};
    }

    &[data-popper-placement^='left'] .tooltip-arrow::before {
      border-left-color: ${(props) => props.theme.themeColors.white};
    }

    &[data-popper-placement^='right'] .tooltip-arrow::before {
      border-right-color: ${(props) => props.theme.themeColors.white};
    }
  }

  .tooltip-inner {
    text-align: left;
    background: ${(props) => props.theme.themeColors.white};
    color: ${(props) => props.theme.themeColors.black};
    padding: ${(props) => props.theme.spaces.s050}
      ${(props) => props.theme.spaces.s100};
    font-size: ${(props) => props.theme.fontSizeSm};
    font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`}
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    h5 {
      font-weight: ${(props) => props.theme.fontWeightBold};
      font-size: ${(props) => props.theme.fontSizeSm};
      font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`}
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

interface Props {
  action: ActionListAction;
  columns: ColumnConfig[];
  plan: PlanContextFragment;
  planViewUrl?: string | null;
}

const ActionTableRow = ({ columns, action, plan, planViewUrl }: Props) => {
  /**
   * Store the row element to attach tooltips to the row rather than document
   * body, allowing us to style the tooltip without global styles
   */
  const [rowEl, setRowEl] = useState(null);
  const rowRef = useCallback((rowEl) => setRowEl(rowEl), []);
  const t = useTranslations();

  return (
    <StyledRow ref={rowRef}>
      {columns.map((column, i) => {
        const columnConfig = COLUMN_CONFIG[column.__typename];

        if (!columnConfig) {
          return null;
        }

        const { renderTooltipContent, cellClassName, rowHeader, renderCell } = columnConfig;
        const hasTooltip = !!renderTooltipContent;
        const content = renderCell(t, action, plan, planViewUrl, column?.attributeType);
        const id = `row-${action.id}-${i}`;
        const className = `${cellClassName} ${
          hasTooltip ? 'has-tooltip' : ''
        } ${rowHeader ? 'row-title' : ''}`;
        const tooltip = hasTooltip && (
          <UncontrolledTooltip container={rowEl ?? undefined} target={id}>
            {renderTooltipContent(t, action, plan, column?.attributeType)}
          </UncontrolledTooltip>
        );

        if (rowHeader) {
          return (
            <th key={i} id={id} scope="row" className={className}>
              {content}
              {tooltip}
            </th>
          );
        }

        return (
          <td key={i} id={id} className={className}>
            {content}
            {tooltip}
          </td>
        );
      })}
    </StyledRow>
  );
};

export default ActionTableRow;
