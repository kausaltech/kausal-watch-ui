import type { Metadata } from 'next';

import AccessGatePage from '@/components/plans/access/AccessGatePage';
import { getDomainSiteVerification } from '@/queries/get-domain-site-verification';
import { tryRequest } from '@/utils/api.utils';
import { getGoogleSiteVerificationTag, getSiteVerificationMetadata } from '@/utils/metadata';

type Props = {
  params: Promise<{
    domain: string;
    lang: string;
  }>;
  searchParams: Promise<{
    plan?: string;
    planName?: string;
    theme?: string;
    homePath?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { data } = await tryRequest(getDomainSiteVerification(params.domain));

  return {
    title: searchParams.planName || 'Kausal Watch',
    robots: 'noindex',
    ...getSiteVerificationMetadata(getGoogleSiteVerificationTag(data?.plansForHostname)),
  };
}

/**
 * Rendered in place of whichever page was requested, at that page's URL, when the viewer must
 * sign in to see the plan behind this hostname.
 */
export default async function SignInRequiredPage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <AccessGatePage
      planIdentifier={searchParams.plan ?? ''}
      planName={searchParams.planName ?? ''}
      themeIdentifier={searchParams.theme ?? null}
      homePath={searchParams.homePath ?? '/'}
    />
  );
}
