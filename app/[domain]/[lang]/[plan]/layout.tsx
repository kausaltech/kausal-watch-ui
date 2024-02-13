import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { captureException } from '@sentry/nextjs';

import ThemeProvider from '@/components/providers/ThemeProvider';
import PlanProvider from '@/components/providers/PlanProvider';
import { getPlan } from '@/queries/get-plan';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { getThemeCSS, loadTheme } from '@/common/theme';
import { CombinedIconSymbols } from '@/components/common/Icon';
import { MatomoAnalytics } from '@/components/MatomoAnalytics';
import { getMetaTitles } from '@/utils/metadata';
import { tryRequest } from '@/utils/api.utils';
import { UpdateApolloContext } from './UpdateApolloContext';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';
import { WorkflowProvider, Workflow } from '@/context/workflow-selector';

type Props = {
  params: { plan: string; domain: string; lang: string };
  children: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');
  const urlHeader = headersList.get('x-url'); // The full user facing URL with path
  const origin = `${protocol}://${params.domain}`;
  const url = new URL(urlHeader || origin);

  if (!urlHeader) {
    captureException(
      new Error(
        `Missing x-url header for ${params.domain}. This may cause issues with metadata. x-url value: ${urlHeader}`
      )
    );
  }

  const { data } = await tryRequest(
    getPlan(params.domain, params.plan, origin)
  );

  if (!data?.plan) {
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
    metadataBase: new URL(origin),
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
  const cookieStore = cookies();
  const protocol = headersList.get('x-forwarded-proto');
  const { data } = await tryRequest(
    getPlan(domain, plan, `${protocol}://${domain}`)
  );

  if (!data?.plan) {
    notFound();
  }

  const theme = await loadTheme(data.plan.themeIdentifier || params.plan);
  const matomoAnalyticsUrl = data.plan.domain?.matomoAnalyticsUrl ?? undefined;
  const selectedWorkflow = cookieStore.get(SELECTED_WORKFLOW_COOKIE_KEY);

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
          <WorkflowProvider
            initialWorkflow={selectedWorkflow?.value as Workflow | undefined}
          >
            <UpdateApolloContext domain={domain} />
            <CombinedIconSymbols />
            {children}
          </WorkflowProvider>
        </PlanProvider>
      </ThemeProvider>
    </>
  );
}
