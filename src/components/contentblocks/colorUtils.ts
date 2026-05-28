import { readableColor } from 'polished';

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
