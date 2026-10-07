import { fireEvent, screen } from '@testing-library/react';

import PledgeSignInFlow from '../../components/pledge/PledgeSignInFlow';
import {
  type PledgeAccountContent,
  usePledgeAccountContent,
} from '../../components/pledge/use-pledge-account-content';
import { render } from '../test-utils';

const mockSignUp = jest.fn();
const mockResendCode = jest.fn();
const mockEditEmail = jest.fn();
const mockSignInState = { step: 'email' as 'email' | 'pin', pendingEmail: '' };

jest.mock('../../components/pledge/use-pledge-auth', () => ({
  usePledgeSignIn: () => ({
    step: mockSignInState.step,
    pendingEmail: mockSignInState.pendingEmail,
    loading: false,
    error: null,
    signUp: mockSignUp,
    signIn: jest.fn(),
    verifyPin: jest.fn(),
    resendCode: mockResendCode,
    editEmail: mockEditEmail,
    reset: jest.fn(),
  }),
}));

jest.mock('../../components/pledge/use-pledge-account-content');
const mockedUsePledgeAccountContent = jest.mocked(usePledgeAccountContent);

const defaultContent: PledgeAccountContent = {
  termsUrl: 'https://example.com/terms',
  privacyUrl: null,
  title: 'Create an account',
  description: 'Save your pledges and come back to track your progress.',
  marketingLabel: null,
};

function renderFlow(content: Partial<PledgeAccountContent> = {}) {
  mockedUsePledgeAccountContent.mockReturnValue({ ...defaultContent, ...content });
  return render(<PledgeSignInFlow onComplete={jest.fn()} onClose={jest.fn()} />);
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSignInState.step = 'email';
  mockSignInState.pendingEmail = '';
});

describe('PledgeSignInFlow sign-up step', () => {
  it("links the plan's terms of use", () => {
    renderFlow();

    expect(screen.getByRole('link', { name: /terms and conditions/i })).toHaveAttribute(
      'href',
      'https://example.com/terms'
    );
    expect(screen.queryByRole('link', { name: /privacy notice/i })).not.toBeInTheDocument();
  });

  it("links the plan's privacy notice when it has one", () => {
    renderFlow({ privacyUrl: 'https://example.com/privacy' });

    expect(screen.getByRole('link', { name: /privacy notice/i })).toHaveAttribute(
      'href',
      'https://example.com/privacy'
    );
    expect(screen.getByRole('link', { name: /terms and conditions/i })).toBeInTheDocument();
  });

  it("shows the plan's account description", () => {
    renderFlow({ description: 'Keep track of your climate pledges.' });

    expect(screen.getByText('Keep track of your climate pledges.')).toBeInTheDocument();
  });

  it('asks for no marketing consent when the plan has no label for it', () => {
    renderFlow();

    expect(screen.getAllByRole('checkbox')).toHaveLength(1); // only the terms checkbox
  });

  it("asks for marketing consent with the plan's label", () => {
    renderFlow({ marketingLabel: 'Send me news about local climate action' });

    expect(
      screen.getByRole('checkbox', { name: 'Send me news about local climate action' })
    ).toBeInTheDocument();
  });

  it('signs up without marketing consent when the plan does not ask for it', () => {
    renderFlow();

    fireEvent.change(screen.getByLabelText(/your email/i), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(mockSignUp).toHaveBeenCalledWith('alice@example.com', true, false, undefined);
  });
});

describe('PledgeSignInFlow code step', () => {
  beforeEach(() => {
    mockSignInState.step = 'pin';
    mockSignInState.pendingEmail = 'alice@example.com';
  });

  it('shows the address the code was sent to', () => {
    renderFlow();

    expect(screen.getByText('alice@example.com').tagName).toBe('STRONG');
  });

  it('resends the code', () => {
    renderFlow();

    fireEvent.click(screen.getByRole('button', { name: /resend code/i }));

    expect(mockResendCode).toHaveBeenCalledTimes(1);
  });

  it('goes back to change the email address', () => {
    renderFlow();

    fireEvent.click(screen.getByRole('button', { name: /edit email/i }));

    expect(mockEditEmail).toHaveBeenCalledTimes(1);
  });

  it('enables verifying once all six digits are entered', () => {
    renderFlow();

    const verify = screen.getByRole('button', { name: /verify email/i });
    expect(verify).toBeDisabled();

    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '123456' } });

    expect(verify).toBeEnabled();
  });
});
