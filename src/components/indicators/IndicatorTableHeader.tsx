import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { IndicatorListPageFragmentFragment } from '@/common/__generated__/graphql';
import {
  IndicatorColumnValueType,
  IndicatorDashboardFieldName,
} from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';

const StyledTh = styled.th<{ $numeric?: boolean }>`
  text-align: ${(props) => (props?.$numeric ? 'right' : 'left')};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

interface IndicatorTableHeaderProps {
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number];
}

/*
{t('municipality')}
type
name
themes
updated
indicator-value
indicator-population-normalized-value
*/

const isNumericColumn = (
  column: NonNullable<IndicatorListPageFragmentFragment['listColumns']>[number]
) => {
  switch (column.__typename) {
    case 'IndicatorListColumn':
      return false;
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
          return t('municipality');
        case IndicatorDashboardFieldName.UpdatedAt:
          return t('updated');
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
              [indicator-start-value]
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
      }
    default:
      return '';
  }
};

const IndicatorTableHeader = (props: IndicatorTableHeaderProps) => {
  const { column } = props;
  const t = useTranslations();
  return (
    <StyledTh key={column.id} $numeric={isNumericColumn(column)}>
      {getColumnLabel(column, t)}
    </StyledTh>
  );
};

export default IndicatorTableHeader;
