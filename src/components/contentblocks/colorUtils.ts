import { getContrast, readableColor } from 'polished';

export const getReadableThemeTextColor = (
  backgroundColor?: string,
  darkColor?: string,
  lightColor?: string
) => {
  if (!backgroundColor) {
    return darkColor ?? '#000';
  }

  try {
    return readableColor(backgroundColor, darkColor ?? '#000', lightColor ?? '#fff');
  } catch {
    return darkColor ?? '#000';
  }
};

/**
 * True when two colors are so close in luminance that an element painted in
 * one is hard to distinguish from a surface painted in the other.
 * The threshold is a WCAG contrast ratio; 1 means identical luminance.
 */
export const hasLowContrast = (colorA: string, colorB: string, threshold = 1.05) => {
  try {
    return getContrast(colorA, colorB) < threshold;
  } catch {
    return false;
  }
};
