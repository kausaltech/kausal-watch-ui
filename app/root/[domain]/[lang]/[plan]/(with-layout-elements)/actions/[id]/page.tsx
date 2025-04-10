import React from 'react';
import { notFound } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { captureException } from '@sentry/nextjs';
import { getTranslations } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from 'next';

import { getActionDetails } from '@/queries/get-action';
import ActionContent from '@/components/actions/ActionContent';
import { getActionImage } from '@/common/images';
import { getActionTermContext } from '@/common/i18n';
import { tryRequest } from '@/utils/api.utils';
import { SELECTED_WORKFLOW_COOKIE_KEY } from '@/constants/workflow';

type Props = {
  params: {
    id: string;
    lang: string;
    plan: string;
    domain: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const t = await getTranslations({ locale: params.lang });

  const { id, plan, domain } = params;
  const decodedId = decodeURIComponent(id);
  const headersList = headers();
  const cookiesList = cookies();
  const protocol = headersList.get('x-forwarded-proto');
  const workflow = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);

  const { data } = await tryRequest(
    getActionDetails(
      plan,
      decodedId,
      `${protocol}://${domain}`,
      workflow?.value
    )
  );

  if (!data?.action) {
    return {};
  }
  const resolvedParent = await parent;
  const image = getActionImage(plan, data.action);
  const actionTerm = t(
    'action',
    data.plan ? getActionTermContext(data.plan) : undefined
  );
  const title = `${actionTerm}: ${
    data.action.plan.hideActionIdentifiers
      ? data.action.name
      : data.action.identifier
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

export default async function ActionPage({ params }: Props) {
  const { id, plan, domain } = params;
  const headersList = headers();
  const cookiesList = cookies();
  const protocol = headersList.get('x-forwarded-proto');
  const workflow = cookiesList.get(SELECTED_WORKFLOW_COOKIE_KEY);
  const decodedId = decodeURIComponent(id);

  const { data, error } = await tryRequest(
    getActionDetails(
      plan,
      decodedId,
      `${protocol}://${domain}`,
      workflow?.value
    )
  );

  if (error || !data?.action || !data.plan) {
    if (error) {
      captureException(error);
    }

    return notFound();
  }

  return <ActionContent action={data.action} extraPlanData={data.plan} />;
}
