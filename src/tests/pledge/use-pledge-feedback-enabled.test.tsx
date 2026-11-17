import { renderHook } from '@testing-library/react';

import PlanContext, { type PlanContextType } from '@/context/plan';

import { usePledgeFeedbackEnabled } from '../../components/pledge/use-pledge-feedback-enabled';

function renderWithSetting(pledgeFeedbackEnabled: boolean | undefined) {
  const plan = { pledgeFeedbackEnabled } as PlanContextType;
  return renderHook(() => usePledgeFeedbackEnabled(), {
    wrapper: ({ children }) => <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>,
  });
}

describe('usePledgeFeedbackEnabled', () => {
  it('is true when the plan asks for feedback on pledges', () => {
    expect(renderWithSetting(true).result.current).toBe(true);
  });

  it('is false when the plan does not ask for feedback on pledges', () => {
    expect(renderWithSetting(false).result.current).toBe(false);
  });

  it('is true when the setting is missing, as before the setting existed', () => {
    expect(renderWithSetting(undefined).result.current).toBe(true);
  });
});
