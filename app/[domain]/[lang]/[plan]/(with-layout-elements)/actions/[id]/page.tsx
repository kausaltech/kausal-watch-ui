import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { captureException } from '@sentry/nextjs';
import { getTranslations } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from 'next';

import { getActionDetails } from '@/queries/get-action';
import ActionContent from '@/components/actions/ActionContent';
import { getActionImage } from '@/common/images';
import { getActionTermContext } from '@/common/i18n';
import { tryRequest } from '@/utils/api.utils';

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
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');

  const { data } = await tryRequest(
    getActionDetails(plan, id, `${protocol}://${domain}`)
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
  const protocol = headersList.get('x-forwarded-proto');

  const { data, error } = await tryRequest(
    getActionDetails(plan, id, `${protocol}://${domain}`)
  );

  if (error || !data?.action || !data.plan) {
    if (error) {
      captureException(error);
    }

    return notFound();
  }
  return <ActionContent action={data.action} extraPlanData={data.plan} />;
}
