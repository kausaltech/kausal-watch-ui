import { screen } from '@testing-library/react';

import PledgeDetail from '../../components/pledge/PledgeDetail';
import { render } from '../test-utils';

jest.mock('../../components/pledge/use-public-user', () => ({
  usePublicUser: () => ({
    userData: {},
    committedSlugs: new Set<string>(),
    commitToPledge: jest.fn(),
    uncommitFromPledge: jest.fn(),
    getCommitmentCountAdjustment: () => 0,
  }),
}));

jest.mock('../../components/pledge/use-pledge-auth', () => ({
  usePledgeNavUser: () => ({ userEmail: null, isAuthenticated: false, signOut: jest.fn() }),
}));

jest.mock('../../components/pledge/use-pledge-accounts-enabled', () => ({
  usePledgeAccountsEnabled: () => false,
}));

jest.mock('../../components/pledge/use-pledge-form-fields', () => ({
  usePledgeFormFields: () => [],
}));

jest.mock('@/common/links', () => ({
  usePrependPlanAndLocale: (path: string) => `/en${path}`,
}));

jest.mock('../../components/pledge/ShareButton', () => ({
  ShareButton: () => <button>Share</button>,
}));

jest.mock('../../components/common/Breadcrumbs', () => () => null);
jest.mock('../../components/pledge/PledgeFeedback', () => () => null);
jest.mock('../../components/pledge/ConfirmPledge', () => () => null);

function createAction(
  id: string,
  name: string,
  plan: { identifier: string; name: string; shortName: string | null }
) {
  return {
    __typename: 'Action' as const,
    id,
    identifier: '1',
    name,
    viewUrl: `https://${plan.identifier}.example.com/actions/1`,
    plan: { __typename: 'Plan' as const, id: plan.identifier, ...plan },
  };
}

const pledge = {
  __typename: 'Pledge' as const,
  id: '1',
  uuid: 'uuid',
  slug: 'bike-to-work',
  name: 'Bike to Work',
  description: '',
  commitmentCount: 0,
  residentCount: null,
  impactStatement: '',
  localEquivalency: '',
  body: [],
  image: null,
  attributes: [],
  actions: [
    createAction('1', 'Umbrella action', {
      identifier: 'umbrella',
      name: 'Umbrella plan',
      shortName: null,
    }),
    createAction('2', 'Child action', {
      identifier: 'child',
      name: 'Child plan of the city',
      shortName: 'Child plan',
    }),
  ],
};

describe('PledgeDetail related actions', () => {
  it("names the plan of actions from other plans but not the pledge's own plan", () => {
    render(<PledgeDetail pledge={pledge} planIdentifier="umbrella" />);

    expect(screen.getByText('Child plan')).toBeInTheDocument();
    expect(screen.queryByText('Umbrella plan')).not.toBeInTheDocument();
  });
});
