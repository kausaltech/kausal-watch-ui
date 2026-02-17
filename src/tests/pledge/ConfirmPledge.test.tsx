import React from 'react';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import ConfirmPledge from '../../components/pledge/ConfirmPledge';
import { render } from '../test-utils';

jest.mock('@/common/links', () => ({
  usePrependPlanAndLocale: (path: string) => `/en${path}`,
}));

jest.mock('../../components/pledge/ShareButton', () => ({
  ShareButton: () => <button>Share</button>,
}));

const baseProps = {
  isOpen: true,
  onClose: jest.fn(),
  onConfirm: jest.fn().mockResolvedValue(undefined),
  pledgeName: 'Bike to Work',
  pledgeSlug: 'bike-to-work',
  pledgeImage: '/test-image.jpg',
  commitmentCount: 42,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ConfirmPledge', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<ConfirmPledge {...baseProps} isOpen={false} />);

    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
    // AnimatePresence may leave an empty container
    expect(container.textContent).toBe('');
  });

  it('renders drawer title and description when open', () => {
    render(<ConfirmPledge {...baseProps} />);

    expect(screen.getByText(/almost there/i)).toBeInTheDocument();
    expect(screen.getByText(/by committing/i)).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<ConfirmPledge {...baseProps} />);

    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<ConfirmPledge {...baseProps} onClose={onClose} />);

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('form fields', () => {
    const formFields = [
      {
        id: 'zip_code',
        label: 'Your ZIP code',
        helpText: 'Help us understand your neighborhood.',
        required: false,
        placeholder: '00100',
      },
    ];

    it('renders form fields', () => {
      render(<ConfirmPledge {...baseProps} formFields={formFields} />);

      expect(screen.getByLabelText(/your zip code/i)).toBeInTheDocument();
      expect(screen.getByText(/help us understand your neighborhood/i)).toBeInTheDocument();
    });

    it('shows optional label for non-required fields', () => {
      render(<ConfirmPledge {...baseProps} formFields={formFields} />);

      expect(screen.getByText(/optional/i)).toBeInTheDocument();
    });

    it('pre-fills form data from userData', () => {
      render(
        <ConfirmPledge {...baseProps} formFields={formFields} userData={{ zip_code: '02134' }} />
      );

      const input = screen.getByLabelText(/your zip code/i) as HTMLInputElement;
      expect(input.value).toBe('02134');
    });

    it('allows editing form fields', () => {
      render(<ConfirmPledge {...baseProps} formFields={formFields} />);

      const input = screen.getByLabelText(/your zip code/i);
      fireEvent.change(input, { target: { value: '90210' } });

      expect((input as HTMLInputElement).value).toBe('90210');
    });
  });

  describe('submission', () => {
    it('renders confirm button', () => {
      render(<ConfirmPledge {...baseProps} />);

      expect(screen.getByRole('button', { name: /confirm commitment/i })).toBeInTheDocument();
    });

    it('calls onConfirm with form data when submitted', async () => {
      const onConfirm = jest.fn().mockResolvedValue(undefined);
      const formFields = [{ id: 'zip_code', label: 'ZIP', required: false }];

      render(<ConfirmPledge {...baseProps} onConfirm={onConfirm} formFields={formFields} />);

      const input = screen.getByLabelText(/zip/i);
      fireEvent.change(input, { target: { value: '12345' } });

      fireEvent.click(screen.getByRole('button', { name: /confirm commitment/i }));

      await waitFor(() => {
        expect(onConfirm).toHaveBeenCalledWith({ zip_code: '12345' });
      });
    });

    it('shows success state after successful submission', async () => {
      const onConfirm = jest.fn().mockResolvedValue(undefined);

      render(<ConfirmPledge {...baseProps} onConfirm={onConfirm} />);

      fireEvent.click(screen.getByRole('button', { name: /confirm commitment/i }));

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      });
    });

    it('shows success title after submission', async () => {
      const onConfirm = jest.fn().mockResolvedValue(undefined);

      render(<ConfirmPledge {...baseProps} onConfirm={onConfirm} />);

      fireEvent.click(screen.getByRole('button', { name: /confirm commitment/i }));

      await waitFor(() => {
        expect(screen.getByText(/you're in/i)).toBeInTheDocument();
      });
    });

    it('keeps form state on submission error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const onConfirm = jest.fn().mockRejectedValue(new Error('Network error'));

      render(<ConfirmPledge {...baseProps} onConfirm={onConfirm} />);

      fireEvent.click(screen.getByRole('button', { name: /confirm commitment/i }));

      await waitFor(() => {
        // Should still show the form, not success
        expect(screen.getByText(/almost there/i)).toBeInTheDocument();
        expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });
});
