import type { Metadata } from 'next';

import { PlanDomainAvailability } from '@/common/__generated__/graphql';
import UnpublishedPlan from '@/components/plans/UnpublishedPlan';
import ThemeProvider from '@/components/providers/ThemeProvider';
import defaultTheme from '@/public/static/themes/default/theme.json';
import { getDomainSiteVerification } from '@/queries/get-domain-site-verification';
import { tryRequest } from '@/utils/api.utils';
import { getGoogleSiteVerificationTag, getSiteVerificationMetadata } from '@/utils/metadata';

type Props = {
  params: Promise<{
    domain: string;
    lang: string;
  }>;
  searchParams: Promise<{
    message?: string;
    status?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data } = await tryRequest(getDomainSiteVerification(params.domain));

  return {
    title: 'Kausal Watch',
    robots: 'noindex',
    // A domain still needs to prove its ownership to search engines while the
    // plan it serves is unpublished, so the verification tag is served here
    // as well as on the plan's own pages.
    ...getSiteVerificationMetadata(getGoogleSiteVerificationTag(data?.plansForHostname)),
  };
}

export default async function UnpublishedPage(props: Props) {
  const searchParams = await props.searchParams;
  const signInRequired = searchParams.status === PlanDomainAvailability.SignInRequired;

  return (
    <ThemeProvider theme={defaultTheme}>
      <UnpublishedPlan
        message={searchParams.message}
        signInRequired={signInRequired}
        testId="unpublished-page"
      />
    </ThemeProvider>
  );
}
