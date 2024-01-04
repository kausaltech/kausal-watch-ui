import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import ThemeProvider from '@/lib/ThemeProvider';
import PlanProvider from '@/lib/PlanProvider';
import { getPlan } from '@/lib/queries/get-plan';
import { GlobalStyles } from '@/lib/GlobalStyles';
import '@/styles/default/main.scss';
import SiteProvider from '@/lib/SiteProvider';
import { getThemeCSS, loadTheme } from '@/common/theme';
import { CombinedIconSymbols } from '@/components/common/Icon';

export const dynamic = 'force-dynamic';

type Props = {
  params: { plan: string; domain: string; lang: string };
  children: ReactNode;
};

export default async function PlanLayout({ params, children }: Props) {
  const { plan, domain } = params;
  // TODO: Get protocol and ensure proper clientUrl
  const { data } = await getPlan(domain, plan, `http://${domain}`);

  if (!data.plan) {
    notFound();
  }

  const theme = await loadTheme(data.plan.themeIdentifier || params.plan);

  return (
    <>
      {theme.name && (
        <link rel="stylesheet" type="text/css" href={getThemeCSS(theme.name)} />
      )}

      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PlanProvider plan={data.plan}>
          <CombinedIconSymbols />
          {children}
        </PlanProvider>
      </ThemeProvider>
    </>
  );
}
