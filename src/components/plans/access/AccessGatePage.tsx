import ThemedGlobalStyles from '@common/themes/ThemedGlobalStyles';
import { getThemeStaticURL } from '@common/themes/theme';
import { loadTheme } from '@common/themes/theme-init.server';

import ThemeProvider from '@/components/providers/ThemeProvider';
import type { AccessGatePlan } from '@/utils/middleware.utils';

import AccessGate from './AccessGate';
import AccountWelcome from './AccountWelcome';

// The theme identifier becomes part of a file path when the theme is loaded.
const THEME_IDENTIFIER_PATTERN = /^[a-z0-9_-]+$/i;

/** The sign-in page a hostname serves in place of a plan the viewer must sign in to see. */
export default async function AccessGatePage({
  planIdentifier,
  planName,
  themeIdentifier,
  homePath,
  eligibilityText,
  accessApproved = false,
}: AccessGatePlan & { accessApproved?: boolean }) {
  const safeThemeIdentifier =
    themeIdentifier && THEME_IDENTIFIER_PATTERN.test(themeIdentifier) ? themeIdentifier : 'default';
  const theme = await loadTheme(safeThemeIdentifier);
  const safeHomePath = homePath.startsWith('/') ? homePath : '/';
  // See the plan layout for why this is a plain link plus a preload hint.
  const themeCssUrl = theme.name ? getThemeStaticURL(theme.mainCssFile) : undefined;

  return (
    <>
      {themeCssUrl && (
        <>
          <link rel="preload" as="style" href={themeCssUrl} />
          <link rel="stylesheet" type="text/css" href={themeCssUrl} />
        </>
      )}
      <ThemeProvider theme={theme}>
        <ThemedGlobalStyles />
        {accessApproved ? (
          <AccountWelcome planName={planName || null} homePath={safeHomePath} />
        ) : (
          <AccessGate
            planIdentifier={planIdentifier}
            planName={planName || null}
            eligibilityText={eligibilityText}
            homePath={safeHomePath}
          />
        )}
      </ThemeProvider>
    </>
  );
}
