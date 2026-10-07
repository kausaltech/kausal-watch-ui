import { screen } from '@testing-library/react';

import PlanContext, { type PlanContextType } from '@/context/plan';

import PledgeCreateAccountCard from '../../components/pledge/PledgeCreateAccountCard';
import {
  type PledgeAccountContent,
  usePledgeAccountContent,
} from '../../components/pledge/use-pledge-account-content';
import { render } from '../test-utils';

type PlanAccountSettings = Pick<
  PlanContextType,
  | 'pledgeTermsUrl'
  | 'pledgePrivacyUrl'
  | 'pledgeAccountTitle'
  | 'pledgeAccountDescription'
  | 'pledgeMarketingConsentLabel'
>;

function Probe() {
  return <pre data-testid="content">{JSON.stringify(usePledgeAccountContent())}</pre>;
}

function renderWithPlan(ui: React.ReactElement, settings: Partial<PlanAccountSettings> = {}) {
  const plan = { ...settings } as PlanContextType;
  return render(<PlanContext.Provider value={plan}>{ui}</PlanContext.Provider>);
}

function readContent(): PledgeAccountContent {
  return JSON.parse(screen.getByTestId('content').textContent ?? '{}') as PledgeAccountContent;
}

describe('usePledgeAccountContent', () => {
  it('uses neutral wording and asks for no marketing consent by default', () => {
    renderWithPlan(<Probe />);

    expect(readContent()).toEqual({
      termsUrl: null,
      privacyUrl: null,
      title: 'Create an account',
      description: 'Save your pledges and come back to track your progress.',
      marketingLabel: null,
    });
  });

  it("uses the plan's own links and wording", () => {
    renderWithPlan(<Probe />, {
      pledgeTermsUrl: 'https://example.com/terms',
      pledgePrivacyUrl: 'https://example.com/privacy',
      pledgeAccountTitle: 'Create an account to win rewards',
      pledgeAccountDescription: 'Plus a chance to win prizes.',
      pledgeMarketingConsentLabel: 'Send me updates about rewards',
    });

    expect(readContent()).toEqual({
      termsUrl: 'https://example.com/terms',
      privacyUrl: 'https://example.com/privacy',
      title: 'Create an account to win rewards',
      description: 'Plus a chance to win prizes.',
      marketingLabel: 'Send me updates about rewards',
    });
  });
});

describe('PledgeCreateAccountCard', () => {
  it("shows the plan's invitation", () => {
    renderWithPlan(<PledgeCreateAccountCard onCreateAccount={jest.fn()} />, {
      pledgeAccountTitle: 'Join the climate challenge',
      pledgeAccountDescription: 'Come back to see how you are doing.',
    });

    expect(screen.getByText('Join the climate challenge')).toBeInTheDocument();
    expect(screen.getByText('Come back to see how you are doing.')).toBeInTheDocument();
  });

  it('falls back to the neutral invitation', () => {
    renderWithPlan(<PledgeCreateAccountCard onCreateAccount={jest.fn()} />);

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.queryByText(/rewards|prizes/i)).not.toBeInTheDocument();
  });
});
