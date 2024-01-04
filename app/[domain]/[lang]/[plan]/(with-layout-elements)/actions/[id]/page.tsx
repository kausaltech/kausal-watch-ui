import React from 'react';
import { getActionDetails } from '@/lib/queries/get-action';
import ActionContent from '@/components/actions/ActionContent';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
    plan: string;
    domain: string;
  };
};

/* 
  const metaTitle = plan.hideActionIdentifiers
    ? `${t('action', getActionTermContext(plan))}: ${action.name}`
    : `${t('action', getActionTermContext(plan))} ${action.identifier}`;

  const actionImage = getActionImage(plan, action);

  <Meta
title={metaTitle}
shareImageUrl={actionImage?.social?.src}
description={`${action.name}`}
/> */

// TODO: Action 404, error and loading
export default async function ActionPage({ params }: Props) {
  const { id, plan, domain } = params;
  // TODO FIXME: proper protocol
  const { data } = await getActionDetails(plan, id, `https://${domain}`);

  if (!data.action || !data.plan) {
    return notFound();
  }

  return <ActionContent action={data.action} extraPlanData={data.plan} />;
}
