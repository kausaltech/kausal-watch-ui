import { useMemo } from 'react';

import { usePlan } from '@/context/plan';

// Matches PLEDGE_FORM_FIELD_VALUE_MAX_LENGTH in the backend.
export const PLEDGE_FORM_FIELD_VALUE_MAX_LENGTH = 200;

export type PledgeFormField = {
  id: string;
  label: string;
  helpText?: string;
  required: boolean;
  placeholder?: string;
};

/** The fields a plan shows when someone commits to a pledge, as configured in the plan's admin settings. */
export function usePledgeFormFields(): PledgeFormField[] {
  const plan = usePlan();
  const fields = plan.pledgeFormFields;

  return useMemo(
    () =>
      (fields ?? []).map((field) => ({
        id: field.identifier,
        label: field.label,
        helpText: field.helpText || undefined,
        required: field.required,
        placeholder: field.placeholder || undefined,
      })),
    [fields]
  );
}
