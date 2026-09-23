import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import UnpublishedPlan from '../UnpublishedPlan';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockedUseSession = jest.mocked(useSession);

function sessionWithStatus(status: 'authenticated' | 'unauthenticated') {
  mockedUseSession.mockReturnValue({
    status,
    data: null,
    update: jest.fn(),
  } as unknown as ReturnType<typeof useSession>);
}

describe('UnpublishedPlan', () => {
  beforeEach(() => {
    push.mockClear();
  });

  it('returns to the site once a sign-in it asked for has completed', () => {
    sessionWithStatus('authenticated');
    render(<UnpublishedPlan signInRequired />);
    expect(push).toHaveBeenCalledWith('/');
  });

  /*
   * The backend answers unavailable, not sign-in-required, to a viewer who is
   * already signed in, because signing in again cannot help. Going back to the
   * site would only bring them straight back here.
   */
  it('stays put for a signed-in viewer the plan is unavailable to', () => {
    sessionWithStatus('authenticated');
    render(<UnpublishedPlan signInRequired={false} />);
    expect(push).not.toHaveBeenCalled();
  });

  it('waits for the sign-in when there is no session yet', () => {
    sessionWithStatus('unauthenticated');
    render(<UnpublishedPlan signInRequired />);
    expect(push).not.toHaveBeenCalled();
  });
});
