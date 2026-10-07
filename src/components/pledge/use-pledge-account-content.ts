import { useTranslations } from 'next-intl';

import { usePlan } from '@/context/plan';

export type PledgeAccountContent = {
  termsUrl: string | null;
  privacyUrl: string | null;
  title: string;
  description: string;
  /** Label of the marketing consent checkbox; null when the plan doesn't ask for marketing consent. */
  marketingLabel: string | null;
};

/** The plan's own wording and links for inviting people to create a pledge account, with neutral defaults. */
export function usePledgeAccountContent(): PledgeAccountContent {
  const plan = usePlan();
  const t = useTranslations();

  return {
    termsUrl: plan.pledgeTermsUrl ?? null,
    privacyUrl: plan.pledgePrivacyUrl ?? null,
    title: plan.pledgeAccountTitle || t('pledge-create-account-title'),
    description: plan.pledgeAccountDescription || t('pledge-create-account-description'),
    marketingLabel: plan.pledgeMarketingConsentLabel || null,
  };
}
