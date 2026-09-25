import {
  categorySymbol,
  goalSymbol,
  lineMarkerSizing,
  resolveMarkerSymbol,
} from '../chart-symbols';

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

describe('lineMarkerSizing', () => {
  it('shrinks a lone series marker', () => {
    expect(lineMarkerSizing(5, 1)).toEqual({ showSymbol: true, symbolSize: 6, borderWidth: 2 });
    expect(lineMarkerSizing(5, 2)).toEqual({ showSymbol: true, symbolSize: 8, borderWidth: 2 });
  });

  it('shrinks dense and hides very dense markers', () => {
    expect(lineMarkerSizing(31, 1)).toEqual({ showSymbol: true, symbolSize: 5, borderWidth: 1 });
    expect(lineMarkerSizing(101, 2).showSymbol).toBe(false);
  });
});
