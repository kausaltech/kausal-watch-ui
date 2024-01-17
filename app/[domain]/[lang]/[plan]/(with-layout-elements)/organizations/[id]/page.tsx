import React from 'react';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { captureException } from '@sentry/nextjs';
import OrgContent from '@/components/orgs/OrgContent';
import { getOrganizationDetails } from '@/lib/queries/get-organization';

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

  const { data, error } = await getOrganizationDetails(
    plan,
    id,
    `${protocol}://${domain}`
  );

  if (error || !data.organization || !data.plan) {
    if (error) {
      captureException(error);
    }

    return notFound();
  }

  return <OrgContent org={data.organization} planFromOrgQuery={data.plan} />;
}
