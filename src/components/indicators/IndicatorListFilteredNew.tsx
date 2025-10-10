import React from 'react';

import { useTranslations } from 'next-intl';
import { Alert, Table } from 'reactstrap';

import type { IndicatorCategory } from './IndicatorList';
import IndicatorTableCell from './IndicatorTableCell';
import IndicatorTableHeader from './IndicatorTableHeader';
import { type Indicators, indentationLevel, sortIndicators } from './indicatorUtils';

export const isEmptyFilter = (val) => val == null || val === '';

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

const IndicatorTableRow = (props: {
  indicator: Indicators[0];
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

const IndicatorNameCell = (props: { indicator: Indicators[0]; indent: number }) => {
  const { indicator, indent } = props;
  return (
    <td key="name" style={{ paddingLeft: `${indent * 16}px` }}>
      {indicator.name}
    </td>
  );
};

export type IndicatorTableColumn =
  | 'name'
  | 'timeResolution'
  | 'level'
  | 'organization'
  | 'common'
  | 'latestValue'
  | 'dimensions';
interface IndicatorListFilteredProps {
  categoryColumnLabel?: string;
  indicators: Indicators;
  shouldDisplayCategory?(cat: IndicatorCategory): boolean;
  displayLevel?: boolean | null;
  includePlanRelatedIndicators?: boolean;
  commonCategories?: object[];
  displayMunicipality?: boolean;
  hierarchy?: Hierarchy;
  displayNormalizedValues?: boolean;
}

export default function IndicatorListFiltered(props: IndicatorListFilteredProps) {
  const t = useTranslations();
  const { indicators, hierarchy, displayMunicipality } = props;

  console.log('props', props);

  if (indicators.flat().length === 0) {
    return (
      <div className="mt-5 mb-5 pb-5">
        <Alert color="primary">{t('search-no-results')}</Alert>
      </div>
    );
  }

  const indicatorColumns: IndicatorTableColumn[] = [
    'organization',
    'timeResolution',
    'level',
    'common',
    'latestValue',
    'dimensions',
  ];

  const sortedIndicators = sortIndicators(hierarchy, indicators, displayMunicipality ?? false);
  console.log('indicators', indicators);
  console.log('sortedIndicators', sortedIndicators);
  return (
    <div className="mt-5 mb-5 pb-5">
      <Table hover size="sm">
        <thead>
          <tr>
            <IndicatorTableHeader column="name" />
            {indicatorColumns.map((column) => (
              <IndicatorTableHeader key={column} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedIndicators.map((indicator) => {
            const indent = hierarchy ? indentationLevel(indicator, hierarchy) : 0;
            return (
              <IndicatorTableRow key={indicator.id} indicator={indicator} indent={indent}>
                <IndicatorNameCell indicator={indicator} indent={indent} />
                {indicatorColumns.map((column) => (
                  <IndicatorTableCell
                    key={column}
                    columnName={column}
                    indicator={indicator}
                    hierarchy={hierarchy}
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
