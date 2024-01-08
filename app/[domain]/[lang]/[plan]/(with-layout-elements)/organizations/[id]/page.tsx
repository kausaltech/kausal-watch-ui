import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/lib/queries/get-organization';

type Props = {
  params: {
    id: string;
    plan: string;
    domain: string;
  };
};

// TODO: Indicator 404, error and loading
export default async function OrganizationPage({ params }: Props) {
  const { id, plan, domain } = params;
  const headersList = headers();
  const protocol = headersList.get('x-forwarded-proto');

  const { data } = await getOrganizationDetails(
    plan,
    id,
    `${protocol}://${domain}`
  );

  if (!data.organization || !data.plan) {
    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
