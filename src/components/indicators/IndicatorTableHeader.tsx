import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { IndicatorListPageFragmentFragment } from '@/common/__generated__/graphql';
import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
} from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import Icon from '@/components/common/Icon';

import PopoverTip from '../common/PopoverTip';
import type { SortState } from './indicatorUtils';

const StyledTh = styled.th<{ $numeric?: boolean }>`
  text-align: ${(props) => (props?.$numeric ? 'right' : 'left')};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const SortableTh = styled(StyledTh)`
  cursor: pointer;
`;

const HeaderContent = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: ${(props) => (props.$selected ? 'underline' : 'none')};
`;

const TableSortingIcon = styled(Icon)<{ $selected: boolean }>`
  width: 0.8em;
  height: 0.8em;
  opacity: ${(props) => (props.$selected ? 1 : 0.3)};
  margin-left: ${(props) => props.theme.spaces.s050};
`;

interface IndicatorTableHeaderProps {
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number];
  sort?: SortState;
  onSortState?: (key: 'name' | 'level') => void;
}

const isNumericColumn = (
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number]
) => {
  switch (column.__typename) {
    case 'IndicatorListColumn':
      if (column.sourceField === IndicatorDashboardFieldName.UpdatedAt) {
        return true;
      } else return false;
    case 'IndicatorValueColumn':
      return true;
    default:
      return false;
  }
};

const getColumnLabel = (
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number],
  t: TFunction
) => {
  if (column.columnLabel) {
    return column.columnLabel;
  }
  switch (column.__typename) {
    case 'IndicatorCategoryColumn':
      if (column.categoryLevel) {
        return column.categoryLevel.name ?? t('themes');
      } else {
        return column.categoryType.name ?? t('themes');
      }
    case 'IndicatorListColumn':
      switch (column.sourceField) {
        case IndicatorDashboardFieldName.Name:
          return t('name');
        case IndicatorDashboardFieldName.Level:
          return t('type');
        case IndicatorDashboardFieldName.Organization:
          return t('organization');
        case IndicatorDashboardFieldName.UpdatedAt:
          return t('updated');
        case IndicatorDashboardFieldName.Unit:
          return t('table-unit');
        default:
          return '';
      }
    case 'IndicatorValueColumn':
      const normalized = column.isNormalized
        ? `(${t('indicator-population-normalized-value')})`
        : '';
      switch (column.valueType) {
        case IndicatorColumnValueType.Latest:
          return (
            <>
              {t('indicator-latest-value')}
              <br />
              {normalized}
            </>
          );
        case IndicatorColumnValueType.Earliest:
          return (
            <>
              {t('indicator-start-value')}
              <br />
              {normalized}
            </>
          );
        case IndicatorColumnValueType.Goal:
          return (
            <>
              {t('target')}
              <br />
              {normalized}
            </>
          );
        case IndicatorColumnValueType.Reference:
          return (
            <>
              {t('indicator-reference-value')}
              <br />
              {normalized}
            </>
          );
      }
    default:
      return '';
  }
};

const IndicatorTableHeader = (props: IndicatorTableHeaderProps) => {
  const { column, sort, onSortState } = props;
  const t = useTranslations();
  // Only Name and Level are sortable
  const isNameColumn =
    column.__typename === 'IndicatorListColumn' &&
    column.sourceField === IndicatorDashboardFieldName.Name;

  const isLevelColumn =
    column.__typename === 'IndicatorListColumn' &&
    column.sourceField === IndicatorDashboardFieldName.Level;

  const sortKey: 'name' | 'level' | null = isNameColumn ? 'name' : isLevelColumn ? 'level' : null;
  const isSortable = sortKey !== null;

  const selected = !!(sortKey && sort?.key === sortKey);
  const iconName = selected ? (sort?.direction === 'asc' ? 'sortDown' : 'sortUp') : 'sort';

  const Th = isSortable ? SortableTh : StyledTh;

  return (
    <Th
      key={column.id}
      $numeric={isNumericColumn(column)}
      scope="col"
      onClick={isSortable && sortKey ? () => onSortState?.(sortKey) : undefined}
      aria-sort={
        isSortable
          ? selected
            ? sort?.direction === 'asc'
              ? 'ascending'
              : 'descending'
            : 'none'
          : undefined
      }
    >
      <HeaderContent $selected={selected}>
        <div>{getColumnLabel(column, t)}</div>
        {isSortable && <TableSortingIcon name={iconName} $selected={selected} aria-hidden="true" />}
        {column.columnHelpText && (
          <PopoverTip content={column.columnHelpText} identifier={column.id ?? ''} />
        )}
      </HeaderContent>
    </Th>
  );
};

export default IndicatorTableHeader;
