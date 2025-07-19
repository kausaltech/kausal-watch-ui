import { ActionDateFormat } from 'common/__generated__/graphql';

export function getDateFormat(format?: ActionDateFormat): Intl.DateTimeFormatOptions {
  switch (format) {
    case 'YEAR':
      return { year: 'numeric' };
    case 'MONTH_YEAR':
      return { month: 'numeric', year: 'numeric' };
    case 'FULL':
    default:
      return { day: 'numeric', month: 'numeric', year: 'numeric' };
  }
}
