import { categorySymbol, goalSymbol, resolveMarkerSymbol } from '../chart-symbols';

describe('resolveMarkerSymbol', () => {
  it('passes ECharts names through', () => {
    expect(resolveMarkerSymbol('circle')).toBe('circle');
    expect(resolveMarkerSymbol('emptyRoundRect')).toBe('emptyRoundRect');
    expect(resolveMarkerSymbol('path://M0,0L1,1Z')).toBe('path://M0,0L1,1Z');
  });

  it('falls back to a circle for unknown names', () => {
    expect(resolveMarkerSymbol('bogus')).toBe('circle');
    expect(resolveMarkerSymbol('empty')).toBe('circle');
    expect(resolveMarkerSymbol('square')).toBe('circle');
  });
});

describe('categorySymbol / goalSymbol', () => {
  it('cycles the theme symbols by series index', () => {
    const symbols = ['circle', 'rect', 'emptyDiamond'];
    expect(categorySymbol(symbols, 0)).toBe('circle');
    expect(categorySymbol(symbols, 1)).toBe('rect');
    expect(categorySymbol(symbols, 2)).toBe('emptyDiamond');
    expect(categorySymbol(symbols, 3)).toBe('circle');
  });

  it('falls back to filled circles without theme symbols', () => {
    expect(categorySymbol(undefined, 4)).toBe('circle');
    expect(categorySymbol([], 1)).toBe('circle');
  });

  it('defaults the goal marker to a hollow circle', () => {
    expect(goalSymbol(undefined)).toBe('emptyCircle');
    expect(goalSymbol('path://M0,0L1,1Z')).toBe('path://M0,0L1,1Z');
    expect(goalSymbol('emptyRect')).toBe('emptyRect');
  });
});
