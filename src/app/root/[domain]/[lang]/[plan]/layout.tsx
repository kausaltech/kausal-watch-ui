import type { ReactNode } from 'react';

import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { ThemeProvider } from '@mui/material/styles';
import { captureException } from '@sentry/nextjs';
import * as Sentry from '@sentry/nextjs';
import type { Metadata } from 'next';

import ThemedGlobalStyles from '@common/themes/ThemedGlobalStyles';
// import { GlobalStyles } from '@/styles/GlobalStyles';
import { initializeMuiTheme } from '@common/themes/mui-theme/theme';
import { getThemeStaticURL, loadTheme } from '@common/themes/theme';
import { getRequestOrigin } from '@common/utils/request.server';

import type { WorkflowState } from '@/common/__generated__/graphql';
import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { MatomoAnalytics } from '@/components/MatomoAnalytics';
import { SharedIcons } from '@/components/common/Icon';
import IntroModal from '@/components/custom/IntroModal';
import GlobalIndicatorModalWrapper from '@/components/indicators/GlobalIndicatorModalWrapper';
import PathsProvider from '@/components/providers/PathsProvider';
import PlanProvider from '@/components/providers/PlanProvider';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';
import { WorkflowProvider } from '@/context/workflow-selector';
import { getPlan } from '@/queries/get-plan';
import { getPathsInstance } from '@/queries/paths/get-paths-instance';
import { tryRequest } from '@/utils/api.utils';
import { getMetaTitles } from '@/utils/metadata';

type Props = {
  params: Promise<{ plan: string; domain: string; lang: string }>;
  children: ReactNode;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const origin = await getRequestOrigin();
  const headersList = await headers();
  const urlHeader = headersList.get('x-url'); // The full user facing URL with path
  const url = new URL(urlHeader || origin);

  if (!urlHeader) {
    captureException(
      new Error(
        `Missing x-url header for ${params.domain}. This may cause issues with metadata. x-url value: ${urlHeader}`
      )
    );
  }
  const { data } = await tryRequest(getPlan(params.domain, params.plan, origin));

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
  const { title: siteName } = getMetaTitles(plan);
  const theme = await loadTheme(data.plan.themeIdentifier || params.plan);

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
        {
          type: 'image/svg+xml',
          url: getThemeStaticURL(theme?.favicons?.svg),
        },
        {
          type: 'image/x-icon',
          url: getThemeStaticURL(theme?.favicons?.ico),
        },
      ],
      apple: getThemeStaticURL(theme?.favicons?.apple),
    },
    other: plan.domain?.googleSiteVerificationTag
      ? {
          'google-site-verification': plan.domain.googleSiteVerificationTag,
        }
      : undefined,
  };
}

async function getPathsData(pathsInstance: string) {
  if (pathsInstance) {
    const { data: pathsData } = await tryRequest<GetInstanceContextQuery>(
      getPathsInstance(pathsInstance)
    );
    if (pathsData?.instance) {
      // console.log('pathsData', pathsData);
      return pathsData;
    } else return undefined;
  }
  return undefined;
}

export default async function PlanLayout(props: Props) {
  const params = await props.params;

  const { children } = props;

  const { plan, domain } = params;
  Sentry.getIsolationScope().setTags({ 'plan.identifier': plan, 'plan.domain': domain });
  const cookieStore = await cookies();
  const origin = await getRequestOrigin();
  const { data: planData } = await tryRequest(getPlan(domain, plan, origin));

  if (!planData?.plan) {
    notFound();
  }

  const theme = await loadTheme(planData.plan.themeIdentifier || params.plan);
  const matomoAnalyticsUrl = planData.plan.domain?.matomoAnalyticsUrl ?? undefined;
  const selectedWorkflow = cookieStore.get(SELECTED_WORKFLOW_COOKIE_KEY);

  const muiTheme = initializeMuiTheme(theme);
  const pathsData = await getPathsData(planData.plan?.kausalPathsInstanceUuid);

  return (
    <>
      {theme.name && (
        <link rel="stylesheet" type="text/css" href={getThemeStaticURL(theme.mainCssFile)} />
      )}

      {!!matomoAnalyticsUrl && <MatomoAnalytics matomoAnalyticsUrl={matomoAnalyticsUrl} />}
      <ThemeProvider theme={muiTheme}>
        <ThemedGlobalStyles />
        <SharedIcons />
        {theme.introModal?.videoUrls && <IntroModal videoUrls={theme.introModal.videoUrls} />}
        <PlanProvider plan={planData.plan}>
          <GlobalIndicatorModalWrapper />
          <PathsProvider instance={pathsData}>
            <WorkflowProvider
              initialWorkflow={selectedWorkflow?.value as WorkflowState | undefined}
              workflowStates={planData.workflowStates}
            >
              {children}
            </WorkflowProvider>
          </PathsProvider>
        </PlanProvider>
      </ThemeProvider>
    </>
  );
}
