import { usePlan } from '@/context/plan';

/** Whether the plan offers people an account after committing to a pledge, as set in the plan's features. */
export function usePledgeAccountsEnabled(): boolean {
  const plan = usePlan();

  return plan.features?.enableCommunityEngagementAccounts ?? false;
}
