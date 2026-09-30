import { renderHook } from '@testing-library/react';

import PlanContext, { type PlanContextType } from '@/context/plan';

import { usePledgeFormFields } from '../../components/pledge/use-pledge-form-fields';

function renderWithPlan(pledgeFormFields: PlanContextType['pledgeFormFields'] | undefined) {
  const plan = { pledgeFormFields } as PlanContextType;
  return renderHook(() => usePledgeFormFields(), {
    wrapper: ({ children }) => <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>,
  });
}

describe('usePledgeFormFields', () => {
  it('maps the plan fields to form fields, keyed by identifier', () => {
    const { result } = renderWithPlan([
      {
        __typename: 'PledgeFormField',
        id: '1',
        identifier: 'postal_code',
        label: 'Postinumero',
        helpText: 'Kerro missä asut',
        placeholder: '00100',
        required: true,
      },
    ]);

    expect(result.current).toEqual([
      {
        id: 'postal_code',
        label: 'Postinumero',
        helpText: 'Kerro missä asut',
        placeholder: '00100',
        required: true,
      },
    ]);
  });

  it('drops empty help text and placeholder', () => {
    const { result } = renderWithPlan([
      {
        __typename: 'PledgeFormField',
        id: '1',
        identifier: 'district',
        label: 'District',
        helpText: '',
        placeholder: '',
        required: false,
      },
    ]);

    expect(result.current[0].helpText).toBeUndefined();
    expect(result.current[0].placeholder).toBeUndefined();
  });

  it('returns no fields when the plan has none', () => {
    const { result } = renderWithPlan(undefined);

    expect(result.current).toEqual([]);
  });
});
