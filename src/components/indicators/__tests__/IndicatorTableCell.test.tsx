import { ThemeProvider } from '@emotion/react';

import type { Theme } from '@kausal/themes/types';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import {
  IndicatorDashboardFieldName,
  IndicatorTimeResolution,
} from '@/common/__generated__/graphql';

import type { IndicatorListIndicator } from '../IndicatorList';
import IndicatorTableCell from '../IndicatorTableCell';

jest.mock('@/context/plan', () => ({ usePlan: () => ({ id: 'test-plan' }) }));

/* Only the tokens the rendered cell interpolates. */
const theme = {
  lineHeightSm: 1.2,
  lineHeightMd: 1.5,
  themeColors: { black: '#000000' },
} as unknown as Theme;

const column = {
  __typename: 'IndicatorListColumn',
  sourceField: IndicatorDashboardFieldName.UpdatedAt,
} as React.ComponentProps<typeof IndicatorTableCell>['column'];

function renderCell(date: string, resolution: IndicatorTimeResolution, timeZone: string) {
  const indicator = {
    timeResolution: resolution,
    latestValue: { date },
  } as IndicatorListIndicator;

  render(
    <NextIntlClientProvider locale="en" timeZone={timeZone} messages={{}}>
      <ThemeProvider theme={theme}>
        <IndicatorTableCell column={column} indicator={indicator} />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

/*
 * An indicator value's date is a calendar date with no time zone of its own, so
 * it has to survive being displayed under a plan whose zone is behind UTC --
 * the case where re-reading it as an instant moves it to the day, and possibly
 * the year, before.
 */
const ZONES = ['UTC', 'Europe/Helsinki', 'America/New_York', 'America/Los_Angeles'];

describe('IndicatorTableCell, showing a value date', () => {
  /*
   * The backend stores yearly values on the 31st of December, so a shift keeps
   * them inside their own year. They are the mild case.
   */
  it.each(ZONES)('keeps a yearly value in its own year under %s', (timeZone) => {
    renderCell('2024-12-31', IndicatorTimeResolution.Year, timeZone);

    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  /* A monthly value on the 1st of January is where a shift crosses the year. */
  it.each(ZONES)('keeps a monthly value in its own month under %s', (timeZone) => {
    renderCell('2024-01-01', IndicatorTimeResolution.Month, timeZone);

    expect(screen.getByText('1/2024')).toBeInTheDocument();
  });

  it.each(ZONES)('keeps a daily value on its own day under %s', (timeZone) => {
    renderCell('2024-12-31', IndicatorTimeResolution.Day, timeZone);

    expect(screen.getByText('12/31/2024')).toBeInTheDocument();
  });
});
