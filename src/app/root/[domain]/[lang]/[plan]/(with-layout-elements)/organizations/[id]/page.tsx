import { notFound } from 'next/navigation';

import type { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id, plan } = await props.params;
  const origin = await getRequestOrigin();
  const { data } = await tryRequest<OrganizationDetailsQuery>(
    getOrganizationDetails(plan, id, origin)
  );
  const name = data?.organization?.name;
  if (!name) return {};
  const resolvedParent = await parent;
  return { title: `${name} | ${resolvedParent.title?.absolute}` };
}

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

  return (
    <OrgContent org={data.organization} planFromOrgQuery={data.plan} testId="organization-page" />
  );
}
