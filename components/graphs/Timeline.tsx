import React from 'react';
import dayjs from 'common/dayjs';
import styled from 'styled-components';
import { Badge } from 'reactstrap';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'styled-components';
import type { PlotParams } from 'react-plotly.js';
import { Dayjs } from 'dayjs';

const StatusTitle = styled.div`
  text-align: left;
  line-height: ${(props) => props.theme.spaces.s150};

  .badge {
    /* Awkwardly match category badges size */
    font-size: calc(1.25rem * 0.75);
    background-color: ${(props) => props.theme.brandDark} !important;
    color: ${(props) => props.theme.themeColors.white};
  }
`;

type Props = {
  startDate?: string;
  endDate?: string;
  continuous?: boolean;
  formatOptions: Intl.DateTimeFormatOptions;
};

const Timeline = ({
  startDate: startDateRaw,
  endDate: endDateRaw,
  continuous = false,
  formatOptions,
}: Props) => {
  const t = useTranslations();
  const locale = useLocale();

  /**
   * Format with toLocaleDateString rather than Day.js to
   * support localised dates with only the month and year.
   */
  function format(date?: Dayjs) {
    if (!date) {
      return undefined;
    }

    return new Date(date.toISOString()).toLocaleDateString(
      locale,
      formatOptions
    );
  }

  const startDate = startDateRaw ? dayjs(startDateRaw) : undefined;
  const endDate = endDateRaw ? dayjs(endDateRaw) : undefined;
  const maxEndDate = dayjs('2050-01-01');

  const displayRange = [startDate, endDate];
  if (!startDate && endDate) displayRange[0] = endDate.subtract(2, 'month');
  if (startDate && !endDate) displayRange[1] = startDate.add(2, 'month');
  if (startDate && continuous) displayRange[1] = maxEndDate;
  if (!startDate && !endDate) {
    displayRange[1] = maxEndDate;
    displayRange[0] = dayjs();
  }

  return (
    <StatusTitle>
      {startDate && `${format(startDate)} \u2192 `}
      {continuous && <Badge>{`${t('action-continuous')}`}</Badge>}
      {((!startDate && endDate) || (continuous && endDate)) && ' \u2192 '}
      {endDate && `${format(endDate)}`}
    </StatusTitle>
  );
};

export default Timeline;
