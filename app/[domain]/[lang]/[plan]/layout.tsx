import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import ThemeProvider from '@/lib/ThemeProvider';
import PlanProvider from '@/lib/PlanProvider';
import { getPlan } from '@/lib/queries/get-plan';
import { GlobalStyles } from '@/lib/GlobalStyles';
import '@/styles/default/main.scss';
import SiteProvider from '@/lib/SiteProvider';
import { getThemeCSS, loadTheme } from '@/common/theme';
import { CombinedIconSymbols } from '@/components/common/Icon';
import { PlanContextFragment } from '@/common/__generated__/graphql';
import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

export const dynamic = 'force-dynamic';

type Props = {
  params: { plan: string; domain: string; lang: string };
  children: ReactNode;
};

const createAlternateLangsMap = (
  plan: PlanContextFragment,
  currentLang: string
): AlternateURLs['languages'] =>
  [plan.primaryLanguage, ...(plan.otherLanguages ?? [])]
    .filter((lang) => lang && lang !== currentLang)
    .reduce(
      (langs, lang) => ({
        ...langs,
        [lang]: `/${lang}`,
      }),
      {}
    );

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await getPlan(
    params.domain,
    params.plan,
    // TODO: protocol
    `http://${params.domain}`
  );

  if (!data.plan) {
    return {};
  }

  const { plan } = data;
  const parentPlanTitle = plan.parent
    ? `${plan.parent.name}/${plan.shortName || plan.name}`
    : null;
  const title = parentPlanTitle || plan.generalContent.siteTitle || plan.name;
  const description = plan.generalContent.siteDescription;
  const ogImage = plan.image?.social?.src || plan.image?.rendition?.src;
  const iconBase = plan.themeIdentifier
    ? `/static/themes/${plan.themeIdentifier}/images/favicon`
    : null;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: plan.generalContent.siteTitle || plan.name,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      url: `/${params.lang}`,
    },
    // TODO: protocol
    metadataBase: new URL(`https://${params.domain}`),
    alternates: {
      canonical: `/${params.lang}`,
      languages: createAlternateLangsMap(plan, params.lang),
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
