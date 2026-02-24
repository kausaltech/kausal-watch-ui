import React from 'react';

import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { captureException } from '@sentry/nextjs';
import type { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getRequestOrigin } from '@common/utils/request.server';

import type { WorkflowState } from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import { getActionImage } from '@/common/images';
import ActionContent from '@/components/actions/ActionContent';
import ErrorPage from '@/components/common/ErrorPage';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';
import { getActionDetails } from '@/queries/get-action';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{
    id: string;
    lang: string;
    plan: string;
    domain: string;
  }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const t = await getTranslations({ locale: params.lang });

  const { id, plan } = params;
  const decodedId = decodeURIComponent(id);
  const origin = await getRequestOrigin();
  const cookiesList = await cookies();
  const workflow = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);

  const { data } = await tryRequest(
    getActionDetails(plan, decodedId, origin, workflow?.value as WorkflowState | undefined)
  );

  if (!data?.action) {
    return {};
  }
  const resolvedParent = await parent;
  const image = getActionImage(plan, data.action);
  const actionTerm = t('action', data.plan ? getActionTermContext(data.plan) : undefined);
  const title = `${actionTerm}: ${
    data.action.plan.hideActionIdentifiers ? data.action.name : data.action.identifier
  }`;

  return {
    title: `${title} | ${resolvedParent.title?.absolute}`,
    description: data.action.name,
    openGraph: {
      title: `${title} | ${resolvedParent.openGraph?.title?.absolute}`,
      description: data.action.name,
      images: image?.social?.src ? [image.social.src] : undefined,
      url: resolvedParent.openGraph?.url ?? undefined,
      siteName: resolvedParent.openGraph?.siteName ?? undefined,
    },
  };
}

export default async function ActionPage(props: Props) {
  const params = await props.params;
  const { id, plan } = params;
  const t = await getTranslations({ locale: params.lang });
  const cookiesList = await cookies();
  const workflow = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);
  const decodedId = decodeURIComponent(id);

  const { data, error } = await tryRequest(
    getActionDetails(
      plan,
      decodedId,
      await getRequestOrigin(),
      workflow?.value as WorkflowState | undefined
    )
  );

  if (error || !data?.action || !data.plan) {
    if (error) {
      captureException(error);
      return <ErrorPage message={t('error-loading-data')} details={error.message} />;
    }

    return notFound();
  }

  return <ActionContent action={data.action} extraPlanData={data.plan} testId="action-page" />;
}
