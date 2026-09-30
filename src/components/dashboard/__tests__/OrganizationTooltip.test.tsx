import { screen } from '@testing-library/react';

import type { PlanContextFragment } from '@/common/__generated__/graphql';
import type { TFunction } from '@/common/i18n';
import { render } from '@/tests/test-utils';

import { COLUMN_CONFIG } from '../dashboard.constants';
import type { ActionListAction } from '../dashboard.types';

const action = {
  id: '100',
  primaryOrg: { id: '1', name: 'Some org' },
} as unknown as ActionListAction;

const t = ((key: string) => key) as unknown as TFunction;

const makePlan = (organizationTerm: string) =>
  ({
    id: '1',
    name: 'Plan',
    generalContent: { actionTaskTerm: 'TASK', organizationTerm },
  }) as unknown as PlanContextFragment;

describe('OrganizationColumnBlock tooltip', () => {
  it('uses the plan organization term in the title', () => {
    const tooltip = COLUMN_CONFIG.OrganizationColumnBlock.renderTooltipContent!(
      t,
      action,
      makePlan('DIVISION')
    );

    render(<>{tooltip}</>);

    expect(screen.getByText('Division')).toBeInTheDocument();
  });

  it('falls back to the default organization term', () => {
    const tooltip = COLUMN_CONFIG.OrganizationColumnBlock.renderTooltipContent!(
      t,
      action,
      makePlan('ORGANIZATION')
    );

    render(<>{tooltip}</>);

    expect(screen.getByText('Organization')).toBeInTheDocument();
  });
});
