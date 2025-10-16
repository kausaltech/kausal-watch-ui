import React from 'react';

import { useTranslations } from 'next-intl';
import { Alert, Table } from 'reactstrap';
import { Button } from 'reactstrap';

import { IndicatorLink } from '@/common/links';

import type { CategoryType, IndicatorListIndicator } from './IndicatorList';
import IndicatorTableCell from './IndicatorTableCell';
import IndicatorTableHeader from './IndicatorTableHeader';
import {
  type IndicatorTableColumn,
  IndicatorTableColumnId,
  indentationLevel,
} from './indicatorUtils';
import type { Hierarchy } from './process-indicators';

export const isEmptyFilter = (val) => val == null || val === '';

const IndicatorTableRow = (props: {
  indicator: IndicatorListIndicator;
  indent: number;
  children: React.ReactNode;
}) => {
  const { indicator, indent, children } = props;
  return (
    <tr key={indicator.id} style={{ paddingLeft: `${indent * 16}px` }}>
      {children}
    </tr>
  );
};

const IndicatorNameCell = (props: {
  indicator: IndicatorListIndicator;
  indent: number;
  openIndicatorsInModal?: (id: string) => void | null;
}) => {
  const { indicator, indent, openIndicatorsInModal } = props;
  const IndicatorTrigger: React.ReactNode = openIndicatorsInModal ? (
    <Button
      color="link"
      onClick={() => openIndicatorsInModal(indicator.id)}
      style={{ padding: 0, textAlign: 'left' }}
    >
      {indicator.name}
    </Button>
  ) : (
    <IndicatorLink id={indicator.id}>{indicator.name}</IndicatorLink>
  );
  return (
    <td key="name" style={{ paddingLeft: `${indent * 16}px` }}>
      {IndicatorTrigger}
    </td>
  );
};
interface IndicatorListFilteredProps {
  categoryType?: CategoryType;
  indicators: IndicatorListIndicator[];
  displayLevel?: boolean | null;
  includePlanRelatedIndicators?: boolean;
  commonCategories?: object[];
  displayMunicipality?: boolean;
  hierarchy?: Hierarchy;
  displayNormalizedValues?: boolean;
  openIndicatorsInModal?: (id: string) => void | null;
}

export default function IndicatorListFiltered(props: IndicatorListFilteredProps) {
  const t = useTranslations();
  const { indicators, hierarchy, displayMunicipality, openIndicatorsInModal } = props;

  console.log('props', props);

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

  //console.log('indicators', indicators);
  //console.log('indicators', indicators);
  return (
    <div className="mt-5 mb-5 pb-5">
      <Table hover size="sm">
        <thead>
          <tr>
            <IndicatorTableHeader columnId={IndicatorTableColumnId.Name} columnLabel="Name" />
            {indicatorColumns.map((column) => (
              <IndicatorTableHeader
                key={column.id}
                columnId={column.id}
                columnLabel={column.label}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => {
            const indent = hierarchy ? indentationLevel(indicator, hierarchy) : 0;
            return (
              <IndicatorTableRow key={indicator.id} indicator={indicator} indent={indent}>
                <IndicatorNameCell
                  indicator={indicator}
                  indent={indent}
                  openIndicatorsInModal={openIndicatorsInModal}
                />
                {indicatorColumns.map((column) => (
                  <IndicatorTableCell
                    key={column.id}
                    columnName={column.id}
                    columnLabel={column.label}
                    categoryTypeId={column.categoryTypeId}
                    indicator={indicator}
                  />
                ))}
              </IndicatorTableRow>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
