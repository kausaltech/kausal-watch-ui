import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import ThemeProvider from '@/components/providers/ThemeProvider';
import PlanProvider from '@/components/providers/PlanProvider';
import { getPlan } from '@/queries/get-plan';
import { GlobalStyles } from '@/styles/GlobalStyles';
import '@/styles/default/main.scss';
import { getThemeCSS, loadTheme } from '@/common/theme';
import { CombinedIconSymbols } from '@/components/common/Icon';
import { MatomoAnalytics } from '@/components/MatomoAnalytics';
import { getMetaTitles } from '@/utils/metadata';

type Props = {
  params: { plan: string; domain: string; lang: string };
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const url = new URL(headersList.get('x-url') ?? '');

  const { data } = await getPlan(
    params.domain,
    params.plan,
    `${protocol}://${params.domain}`
  );

  if (!data.plan) {
    return {};
  }

  const { plan } = data;
  const parentPlanTitle = plan.parent
    ? `${plan.parent.name} / ${plan.shortName || plan.name}`
    : null;
  const title = parentPlanTitle || plan.generalContent.siteTitle || plan.name;
  const description = plan.generalContent.siteDescription;
  const ogImage = plan.image?.social?.src || plan.image?.rendition?.src;
  const themeIdentifier = data.plan.themeIdentifier || params.plan;
  const iconBase = `/static/themes/${themeIdentifier}/images/favicon`;
  const { title: siteName } = getMetaTitles(plan);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      url: url.pathname,
    },
    metadataBase: new URL(url.origin),
    alternates: {
      canonical: url.pathname,
    },
    icons: {
      icon: [
        { type: 'image/svg+xml', url: `${iconBase}/icon.svg` },
        { type: 'image/x-icon', url: `${iconBase}/favicon.ico` },
      ],
      apple: `${iconBase}/apple.png`,
    },
    other: plan.domain?.googleSiteVerificationTag
      ? {
          'google-site-verification': plan.domain.googleSiteVerificationTag,
        }
      : undefined,
  };
}

export default async function PlanLayout({ params, children }: Props) {
  const { plan, domain } = params;
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const { data } = await getPlan(domain, plan, `${protocol}://${domain}`);

  if (!data.plan) {
    notFound();
  }

  const theme = await loadTheme(data.plan.themeIdentifier || params.plan);
  const matomoAnalyticsUrl = data.plan.domain?.matomoAnalyticsUrl ?? undefined;

  return (
    <>
      {theme.name && (
        <link rel="stylesheet" type="text/css" href={getThemeCSS(theme.name)} />
      )}

      {!!matomoAnalyticsUrl && (
        <MatomoAnalytics matomoAnalyticsUrl={matomoAnalyticsUrl} />
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
