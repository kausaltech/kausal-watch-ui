import { usePlan } from '@/context/plan';

/** Whether pledge pages ask for feedback (rating scale and comment form), as set in the plan settings. */
export function usePledgeFeedbackEnabled(): boolean {
  const plan = usePlan();

  return plan.pledgeFeedbackEnabled ?? true;
}
