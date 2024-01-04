import React from 'react';
import { notFound } from 'next/navigation';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/lib/queries/get-organization';

type Props = {
  params: {
    id: string;
    plan: string;
    domain: string;
  };
};

/* 
      <Meta title={org.name} />
/> */

// TODO: Indicator 404, error and loading
export default async function OrganizationPage({ params }: Props) {
  const { id, plan, domain } = params;

  // TODO: clientUrl protocol fix
  const { data } = await getOrganizationDetails(plan, id, `https://${domain}`);

  if (!data.organization || !data.plan) {
    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
