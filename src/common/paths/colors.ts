import chroma from 'chroma-js';
import type { DefaultTheme } from 'styled-components';

export function genColors(colorsIn: string[], numColors: number) {
  const colors = colorsIn.slice(0, -1);
  const colors2 = colorsIn.slice(-1);
  const diverging = true;
  const bezier = true;
  const correctLightness = true;

  const genRange = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);

  const even = numColors % 2 === 0;
  const numColorsLeft = diverging ? Math.ceil(numColors / 2) + (even ? 1 : 0) : numColors;
  const numColorsRight = diverging ? Math.ceil(numColors / 2) + (even ? 1 : 0) : 0;
  const genColors = colors.length !== 1 ? colors : autoColors(colors[0], numColorsLeft);
  const genColors2 = colors2.length !== 1 ? colors2 : autoColors(colors2[0], numColorsRight, true);
  const stepsLeft = colors.length
    ? chroma
        .scale(bezier && colors.length > 1 ? chroma.bezier(genColors) : genColors)
        .correctLightness(correctLightness)
        .colors(numColorsLeft)
    : [];
  const stepsRight =
    diverging && colors2.length
      ? chroma
          .scale(bezier && colors2.length > 1 ? chroma.bezier(genColors2) : genColors2)
          .correctLightness(correctLightness)
          .colors(numColorsRight)
      : [];
  const steps = (even && diverging ? stepsLeft.slice(0, stepsLeft.length - 1) : stepsLeft).concat(
    stepsRight.slice(1)
  );

  function autoGradient(color, numColors) {
    const lab = chroma(color).lab();
    const lRange = 100 * (0.95 - 1 / numColors);
    const lStep = lRange / (numColors - 1);
    const lStart = (100 - lRange) * 0.5;
    const range = genRange(lStart, lStart + numColors * lStep, lStep);
    let offset = 0;
    if (!diverging) {
      offset = 9999;
      for (let i = 0; i < numColors; i++) {
        const diff = lab[0] - range[i];
        if (Math.abs(diff) < Math.abs(offset)) {
          offset = diff;
        }
      }
    }
    return range.map((l) => chroma.lab(l + offset, lab[1], lab[2]));
  }
  function autoColors(color, numColors, reverse = false) {
    if (diverging) {
      const colors = autoGradient(color, 3).concat(chroma('#f5f5f5'));
      if (reverse) colors.reverse();
      return colors;
    } else {
      return autoGradient(color, numColors);
    }
  }
  return steps;
}

export function genColorsFromTheme(theme: DefaultTheme, numColors: number) {
  const colors = [theme.graphColors.blue070, theme.graphColors.red050, theme.graphColors.green070];
  return genColors(colors, numColors);
}

export function setUniqueColors<T>(
  objs: T[],
  getColor: (obj: T) => string | undefined | null,
  setColor: (obj: T, color: string) => void,
  defaultColor: string | null = null
) {
  const colorCount: { [c: string]: number } = {};
  if (defaultColor) defaultColor = defaultColor.toLowerCase();
  objs.forEach((obj) => {
    let color = getColor(obj)?.toLowerCase();
    if (!color) {
      if (!defaultColor) return;
      color = defaultColor;
    }
    colorCount[color] = (colorCount[color] ?? 0) + 1;
    setColor(obj, color);
  });
  const colors = Object.fromEntries(
    Object.entries(colorCount).map(([color, count]) => {
      if (count == 1) return [color, [color]];
      const color1 = (count >= 3 ? chroma(color).brighten(2) : chroma(color)).hex();
      const color2 = chroma(color).darken(2).hex();
      const scale = chroma
        .bezier([color1, color2])
        .scale()
        .correctLightness()
        .colors(count)
        .reverse();
      return [color, scale];
    })
  );
  objs.forEach((obj) => {
    const oldColor = getColor(obj);
    if (!oldColor) return;
    // console.log(`${node.color} -> ${colors[node.color][0]}`);
    const color = colors[oldColor].shift();
    setColor(obj, color!);
  });
}
