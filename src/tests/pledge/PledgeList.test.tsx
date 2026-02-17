import React from 'react';

import { fireEvent, screen } from '@testing-library/react';

import PledgeList, { type Pledge } from '../../components/pledge/PledgeList';
import { usePledgeUser } from '../../components/pledge/use-pledge-user';
import { render } from '../test-utils';

jest.mock('../../components/pledge/use-pledge-user');
const mockedUsePledgeUser = jest.mocked(usePledgeUser);

jest.mock('@/common/links', () => ({
  usePrependPlanAndLocale: (path: string) => `/en${path}`,
}));

jest.mock('../../components/pledge/ShareButton', () => ({
  ShareButton: () => <button>Share</button>,
}));

jest.mock('../../components/common/ActionAttribute', () => ({
  getAttributeValueText: () => null,
}));

function createMockPledge(overrides: Partial<Pledge> = {}) {
  return {
    __typename: 'Pledge' as const,
    id: '1',
    slug: 'test-pledge',
    name: 'Test Pledge',
    description: 'A test description',
    commitmentCount: 10,
    image: {
      __typename: 'Image' as const,
      large: { __typename: 'ImageRendition' as const, src: '/large.jpg' },
      full: { __typename: 'ImageRendition' as const, src: '/full.jpg' },
      altText: 'Test image',
      rendition: { __typename: 'ImageRendition' as const, src: '/rendition.jpg' },
    },
    attributes: [],
    ...overrides,
  };
}

const defaultHookReturn = {
  userUuid: null,
  userData: {},
  committedSlugs: new Set<string>(),
  loading: false,
  commitToPledge: jest.fn(),
  uncommitFromPledge: jest.fn(),
  getCommitmentCountAdjustment: jest.fn(() => 0 as 0),
};

beforeEach(() => {
  mockedUsePledgeUser.mockReturnValue(defaultHookReturn);
});

const pledges = [
  createMockPledge({ id: '1', slug: 'bike-to-work', name: 'Bike to Work', commitmentCount: 42 }),
  createMockPledge({ id: '2', slug: 'reduce-waste', name: 'Reduce Waste', commitmentCount: 18 }),
  createMockPledge({ id: '3', slug: 'plant-trees', name: 'Plant Trees', commitmentCount: 7 }),
];

describe('PledgeList', () => {
  it('renders all pledge cards in ALL view', () => {
    render(<PledgeList pledges={pledges as any} />);

    expect(screen.getByText('Bike to Work')).toBeInTheDocument();
    expect(screen.getByText('Reduce Waste')).toBeInTheDocument();
    expect(screen.getByText('Plant Trees')).toBeInTheDocument();
  });

  it('renders view toggle buttons', () => {
    render(<PledgeList pledges={pledges as any} />);

    expect(screen.getByRole('radio', { name: /all pledges/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /my pledges/i })).toBeInTheDocument();
  });

  describe('MY_PLEDGES view', () => {
    it('shows only committed pledges', () => {
      mockedUsePledgeUser.mockReturnValue({
        ...defaultHookReturn,
        committedSlugs: new Set(['bike-to-work']),
      });

      render(<PledgeList pledges={pledges as any} />);

      // Switch to MY_PLEDGES
      fireEvent.click(screen.getByRole('radio', { name: /my pledges/i }));

      expect(screen.getByText('Bike to Work')).toBeInTheDocument();
      expect(screen.queryByText('Reduce Waste')).not.toBeInTheDocument();
      expect(screen.queryByText('Plant Trees')).not.toBeInTheDocument();
    });

    it('shows empty state when no pledges committed', () => {
      render(<PledgeList pledges={pledges as any} />);

      // Switch to MY_PLEDGES
      fireEvent.click(screen.getByRole('radio', { name: /my pledges/i }));

      expect(screen.getByText(/haven't committed to any Pledges yet/i)).toBeInTheDocument();
      expect(screen.getByText(/here's a Pledge to get you started/i)).toBeInTheDocument();
    });

    it('empty state shows first pledge as a mini card', () => {
      render(<PledgeList pledges={pledges as any} />);

      fireEvent.click(screen.getByRole('radio', { name: /my pledges/i }));

      // The first pledge should still be visible as the suggested card
      expect(screen.getByText('Bike to Work')).toBeInTheDocument();
    });

    it('"browse all pledges" switches back to ALL view', () => {
      render(<PledgeList pledges={pledges as any} />);

      // Switch to MY_PLEDGES
      fireEvent.click(screen.getByRole('radio', { name: /my pledges/i }));

      // Click browse all
      fireEvent.click(screen.getByText(/browse all pledges/i));

      // All pledges should now be visible
      expect(screen.getByText('Bike to Work')).toBeInTheDocument();
      expect(screen.getByText('Reduce Waste')).toBeInTheDocument();
      expect(screen.getByText('Plant Trees')).toBeInTheDocument();
    });

    it('does not show empty state when there are no pledges at all', () => {
      render(<PledgeList pledges={[] as any} />);

      fireEvent.click(screen.getByRole('radio', { name: /my pledges/i }));

      expect(screen.queryByText(/haven't committed to any Pledges yet/i)).not.toBeInTheDocument();
    });
  });

  describe('commitment interactions', () => {
    it('calls uncommitFromPledge when clicking committed card', () => {
      const uncommitFromPledge = jest.fn();
      mockedUsePledgeUser.mockReturnValue({
        ...defaultHookReturn,
        committedSlugs: new Set(['bike-to-work']),
        uncommitFromPledge,
      });

      render(<PledgeList pledges={pledges as any} />);

      // Find the "Committed" button for the committed pledge
      const committedButtons = screen.getAllByRole('button', { name: /committed/i });
      fireEvent.click(committedButtons[0]);

      expect(uncommitFromPledge).toHaveBeenCalledWith('1');
    });
  });

  describe('commitment count adjustments', () => {
    it('applies count adjustments from the hook', () => {
      const getCommitmentCountAdjustment = jest.fn((slug: string) =>
        slug === 'bike-to-work' ? 1 : 0
      );

      mockedUsePledgeUser.mockReturnValue({
        ...defaultHookReturn,
        getCommitmentCountAdjustment,
      });

      render(<PledgeList pledges={pledges as any} />);

      // Bike to Work: 42 + 1 = 43
      expect(screen.getByText(/43 committed/i)).toBeInTheDocument();
      // Reduce Waste: 18 + 0 = 18
      expect(screen.getByText(/18 committed/i)).toBeInTheDocument();
    });
  });
});
