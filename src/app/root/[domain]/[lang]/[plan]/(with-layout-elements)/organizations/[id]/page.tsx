import React from 'react';

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { OrganizationDetailsQuery } from '@/common/__generated__/graphql';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/queries/get-organization';
import { tryRequest } from '@/utils/api.utils';

type Props = {
  params: {
    id: string;
    plan: string;
    domain: string;
  };
};

export default async function OrganizationPage({ params }: Props) {
  const { id, plan, domain } = params;
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');

  const { data, error } = await tryRequest<OrganizationDetailsQuery>(
    getOrganizationDetails(plan, id, `${protocol}://${domain}`)
  );

  if (error || !data?.organization || !data.plan) {
    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
