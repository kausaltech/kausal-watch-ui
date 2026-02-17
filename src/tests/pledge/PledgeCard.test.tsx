import React from 'react';

import { fireEvent, screen } from '@testing-library/react';

import PledgeCard from '../../components/pledge/PledgeCard';
import { render } from '../test-utils';

jest.mock('@/common/links', () => ({
  usePrependPlanAndLocale: (path: string) => `/en${path}`,
}));

jest.mock('../../components/pledge/ShareButton', () => ({
  ShareButton: () => <button>Share</button>,
}));

const baseProps = {
  title: 'Ride Your Bike to Work',
  description: 'Commit to cycling to work at least 3 days a week.',
  slug: 'ride-bike',
  committedCount: 42,
  image: '/test-image.jpg',
  imageAlt: 'A person riding a bike',
};

describe('PledgeCard', () => {
  describe('default layout', () => {
    it('renders title, description, and commit button', () => {
      const onCommitClick = jest.fn();

      render(<PledgeCard {...baseProps} isCommitted={false} onCommitClick={onCommitClick} />);

      expect(screen.getByText('Ride Your Bike to Work')).toBeInTheDocument();
      expect(
        screen.getByText('Commit to cycling to work at least 3 days a week.')
      ).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /commit to this/i })).toBeInTheDocument();
    });

    it('shows "Committed" when isCommitted is true', () => {
      render(<PledgeCard {...baseProps} isCommitted={true} onCommitClick={jest.fn()} />);

      expect(screen.getByRole('button', { name: /committed/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument();
    });

    it('shows committed count', () => {
      render(<PledgeCard {...baseProps} isCommitted={false} onCommitClick={jest.fn()} />);

      expect(screen.getByText(/42 committed/i)).toBeInTheDocument();
    });

    it('renders image with alt text', () => {
      render(<PledgeCard {...baseProps} isCommitted={false} onCommitClick={jest.fn()} />);

      const img = screen.getByAltText('A person riding a bike');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/test-image.jpg');
    });

    it('calls onCommitClick with false when clicking commit on uncommitted card', () => {
      const onCommitClick = jest.fn();

      render(<PledgeCard {...baseProps} isCommitted={false} onCommitClick={onCommitClick} />);

      fireEvent.click(screen.getByRole('button', { name: /commit to this/i }));
      expect(onCommitClick).toHaveBeenCalledWith(false);
    });

    it('calls onCommitClick with true when clicking commit on committed card', () => {
      const onCommitClick = jest.fn();

      render(<PledgeCard {...baseProps} isCommitted={true} onCommitClick={onCommitClick} />);

      fireEvent.click(screen.getByRole('button', { name: /committed/i }));
      expect(onCommitClick).toHaveBeenCalledWith(true);
    });
  });

  describe('mini layout', () => {
    it('renders title without description', () => {
      render(
        <PledgeCard {...baseProps} layout="mini" isCommitted={false} onCommitClick={jest.fn()} />
      );

      expect(screen.getByText('Ride Your Bike to Work')).toBeInTheDocument();
      expect(
        screen.queryByText('Commit to cycling to work at least 3 days a week.')
      ).not.toBeInTheDocument();
    });

    it('still shows commit button in mini layout', () => {
      render(
        <PledgeCard {...baseProps} layout="mini" isCommitted={false} onCommitClick={jest.fn()} />
      );

      expect(screen.getByRole('button', { name: /commit to this/i })).toBeInTheDocument();
    });
  });

  describe('categories', () => {
    it('renders category labels', () => {
      render(
        <PledgeCard
          {...baseProps}
          categories={[{ label: 'Transport' }, { label: 'Energy' }]}
          isCommitted={false}
          onCommitClick={jest.fn()}
        />
      );

      expect(screen.getByText('Transport')).toBeInTheDocument();
      expect(screen.getByText('Energy')).toBeInTheDocument();
    });
  });

  describe('without image', () => {
    it('renders placeholder when no image provided', () => {
      render(
        <PledgeCard
          {...baseProps}
          image={undefined}
          isCommitted={false}
          onCommitClick={jest.fn()}
        />
      );

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
});
