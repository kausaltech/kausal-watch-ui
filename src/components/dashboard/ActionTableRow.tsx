import React from 'react';

import styled from '@emotion/styled';
import Tooltip from '@mui/material/Tooltip';
import { useTranslations } from 'next-intl';

import type { PlanContextFragment } from '@/common/__generated__/graphql';

import { COLUMN_CONFIG } from './dashboard.constants';
import type { ActionListAction, ColumnConfig } from './dashboard.types';

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
      box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
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
`;

interface Props {
  action: ActionListAction;
  columns: ColumnConfig[];
  plan: PlanContextFragment;
  planViewUrl?: string | null;
}

const ActionTableRow = ({ columns, action, plan, planViewUrl }: Props) => {
  const t = useTranslations();

  return (
    <StyledRow>
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
        const tooltipContent = hasTooltip
          ? renderTooltipContent(t, action, plan, column?.attributeType)
          : undefined;

        const tooltipProps = {
          title: tooltipContent,
          arrow: true,
          placement: 'top' as const,
          slotProps: {
            tooltip: {
              sx: {
                bgcolor: 'white',
                color: 'text.primary',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              },
            },
            arrow: { sx: { color: 'white' } },
          },
        };

        if (rowHeader) {
          return (
            <Tooltip key={i} {...tooltipProps}>
              <th id={id} scope="row" className={className}>
                {content}
              </th>
            </Tooltip>
          );
        }

        return (
          <Tooltip key={i} {...tooltipProps}>
            <td id={id} className={className}>
              {content}
            </td>
          </Tooltip>
        );
      })}
    </StyledRow>
  );
};

export default ActionTableRow;
