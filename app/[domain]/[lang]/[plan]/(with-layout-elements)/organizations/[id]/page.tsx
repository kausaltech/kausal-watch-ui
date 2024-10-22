import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/queries/get-organization';
import { OrganizationDetailsQuery } from '@/common/__generated__/graphql';
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
  const { id, plan, domain } = params;
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto');

  const { data, error } = await tryRequest<OrganizationDetailsQuery>(
    getOrganizationDetails(plan, id, `${protocol}://${domain}`)
  );

  if (error || !data?.organization || !data.plan) {
    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
