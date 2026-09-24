/** Marker symbols and marker styles shared by the IndicatorGraph and the chart blocks. */
/**
 * Themes name marker symbols with ECharts names (`circle`, `emptyRect`,
 * `path://...`); unknown names fall back to a circle.
 */
const ECHARTS_SYMBOLS = new Set([
  'circle',
  'rect',
  'roundRect',
  'triangle',
  'diamond',
  'pin',
  'arrow',
  'none',
]);

const isEchartsSymbol = (name: string) =>
  ECHARTS_SYMBOLS.has(name) ||
  (name.length > 5 &&
    name.startsWith('empty') &&
    ECHARTS_SYMBOLS.has(name[5].toLowerCase() + name.slice(6))) ||
  name.startsWith('path://') ||
  name.startsWith('image://');

export const resolveMarkerSymbol = (name: string): string =>
  isEchartsSymbol(name) ? name : 'circle';

export const DEFAULT_GOAL_SYMBOL = 'emptyCircle';
export const DEFAULT_CATEGORY_SYMBOLS = ['circle'];

/** The marker symbol for the idx-th series, cycling the theme's categorySymbols. */
export function categorySymbol(categorySymbols: string[] | undefined, idx: number): string {
  const symbols = categorySymbols?.length ? categorySymbols : DEFAULT_CATEGORY_SYMBOLS;
  return resolveMarkerSymbol(symbols[idx % symbols.length]);
}

/** The theme's goalSymbol as an ECharts symbol. */
export const goalSymbol = (themeGoalSymbol: string | undefined): string =>
  resolveMarkerSymbol(themeGoalSymbol ?? DEFAULT_GOAL_SYMBOL);

/**
 * Item style for a marker: the fill color, plus a rim of the same color so
 * hollow (`empty*`) symbols get a visible outline.
 */
export const markerItemStyle = (color: string, borderWidth = 2) => ({
  color,
  borderColor: color,
  borderWidth,
});
