import { withTranslation } from '../i18n';

export function beautifyValue(x, locale) {
  if (x == null) {
    return '-';
  }
  return x.toLocaleString(locale, {maximumFractionDigits: 2});
}
