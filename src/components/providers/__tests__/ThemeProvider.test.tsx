import { useTheme } from '@mui/material/styles';

import defaultThemeJson from '@kausal/themes/dist/themes/default/theme.json';
import type { Theme } from '@kausal/themes/types';
import { render, screen } from '@testing-library/react';

import ThemeProvider from '@/components/providers/ThemeProvider';

/*
 * Importing JSON widens literal values to plain strings, which no longer
 * satisfies Theme's literal-union properties (e.g. headingsTextTransform).
 */
const themeA = defaultThemeJson as unknown as Theme;

/*
 * The second theme is derived from the first rather than loaded from another
 * theme directory: only the default theme ships with the public themes
 * package, and the test only needs two themes that differ visibly.
 */
const themeB: Theme = {
  ...themeA,
  name: 'Second plan',
  brandDark: '#abcdef',
};

function ThemeProbe() {
  const theme = useTheme();

  return (
    <>
      <span data-testid="name">{theme.name}</span>
      <span data-testid="primary">{theme.palette.primary.main}</span>
    </>
  );
}

function renderWithTheme(theme: Theme) {
  const view = render(
    <ThemeProvider theme={theme}>
      <ThemeProbe />
    </ThemeProvider>
  );
  const result = {
    name: screen.getByTestId('name').textContent,
    primary: screen.getByTestId('primary').textContent,
  };
  view.unmount();

  return result;
}

describe('ThemeProvider', () => {
  /*
   * Two plans can share a hostname and differ only by basePath, so navigating
   * between them is a client-side soft navigation rather than a new document.
   * The theme must follow the plan rather than stay on whichever one the
   * document happened to load with first.
   */
  it('applies the theme it is given, not the first one built in the process', () => {
    expect(themeA.brandDark).not.toEqual(themeB.brandDark);

    const first = renderWithTheme(themeA);
    const second = renderWithTheme(themeB);

    expect(first.name).toBe(themeA.name);
    expect(first.primary).toBe(themeA.brandDark);

    expect(second.name).toBe(themeB.name);
    expect(second.primary).toBe(themeB.brandDark);
  });

  it('keeps applying a theme it has already seen', () => {
    renderWithTheme(themeA);
    renderWithTheme(themeB);

    expect(renderWithTheme(themeA).primary).toBe(themeA.brandDark);
  });
});
