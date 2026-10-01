import { renderHook } from '@testing-library/react';

import PlanContext, { type PlanContextType } from '@/context/plan';

import { usePledgeAccountsEnabled } from '../../components/pledge/use-pledge-accounts-enabled';

function renderWithFeatures(features: Partial<PlanContextType['features']> | undefined) {
  const plan = { features } as PlanContextType;
  return renderHook(() => usePledgeAccountsEnabled(), {
    wrapper: ({ children }) => <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>,
  });
}

describe('usePledgeAccountsEnabled', () => {
  it('is true when the plan offers accounts', () => {
    expect(renderWithFeatures({ enableCommunityEngagementAccounts: true }).result.current).toBe(
      true
    );
  });

  it('is false when the plan does not offer accounts', () => {
    expect(renderWithFeatures({ enableCommunityEngagementAccounts: false }).result.current).toBe(
      false
    );
  });

  it('is false when the plan has no features loaded', () => {
    expect(renderWithFeatures(undefined).result.current).toBe(false);
  });
});
