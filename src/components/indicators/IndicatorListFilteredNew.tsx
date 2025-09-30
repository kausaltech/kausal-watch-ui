import React from 'react';

import { useTranslations } from 'next-intl';
import { Alert, Table } from 'reactstrap';

import type { IndicatorCategory, IndicatorListIndicator } from './IndicatorList';
import IndicatorTableCell from './IndicatorTableCell';
import IndicatorTableHeader from './IndicatorTableHeader';

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
  indicators: IndicatorListIndicator[];
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
  const { indicators } = props;

  console.log('props', props);

  if (indicators.flat().length === 0) {
    return (
      <div className="mt-5 mb-5 pb-5">
        <Alert color="primary">{t('search-no-results')}</Alert>
      </div>
    );
  }

  const indicatorColumns: IndicatorTableColumn[] = [
    'name',
    'organization',
    'timeResolution',
    'level',
    'common',
    'latestValue',
    'dimensions',
  ];

  return (
    <div className="mt-5 mb-5 pb-5">
      <Table hover>
        <thead>
          <tr>
            {indicatorColumns.map((column) => (
              <IndicatorTableHeader key={column} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator.id}>
              {indicatorColumns.map((column) => (
                <IndicatorTableCell key={column} column={column} indicator={indicator} />
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
