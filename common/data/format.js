import { withTranslation } from '../i18n';

export function beautifyValue(x, locale) {
  return x.toLocaleString(locale, {maximumFractionDigits: 2});
}
