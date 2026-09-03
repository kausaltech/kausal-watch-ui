import { ActionDateFormat } from '@/common/__generated__/graphql';

export function getDateFormat(format?: ActionDateFormat): Intl.DateTimeFormatOptions {
  switch (format) {
    case ActionDateFormat.Year:
      return { year: 'numeric' };
    case ActionDateFormat.MonthYear:
      return { month: 'numeric', year: 'numeric' };
    case ActionDateFormat.Full:
    default:
      return { day: 'numeric', month: 'numeric', year: 'numeric' };
  }
}
