import React from 'react';

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { getRequestOrigin } from '@common/utils/request.server';

import type { OrganizationDetailsQuery } from '@/common/__generated__/graphql';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/queries/get-organization';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: Promise<{
    id: string;
    plan: string;
    domain: string;
  }>;
};

export default async function OrganizationPage(props: Props) {
  const params = await props.params;
  const { id, plan } = params;
  const origin = await getRequestOrigin();

  const { data, error } = await tryRequest<OrganizationDetailsQuery>(
    getOrganizationDetails(plan, id, origin)
  );

  if (error || !data?.organization || !data.plan) {
    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
