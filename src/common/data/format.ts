export function beautifyValue(x: number | null, locale: string) {
  if (x == null) {
    return '-';
  }
  return x.toLocaleString(locale, { maximumFractionDigits: 2 });
}
