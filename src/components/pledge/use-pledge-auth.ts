'use client';

import { useCallback, useEffect, useState } from 'react';

import { gql } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { useApolloClient, useMutation, useQuery } from '@apollo/client/react';

import type {
  PledgeSignInMutation,
  PledgeSignInMutationVariables,
  PledgeSignUpMutation,
  PledgeSignUpMutationVariables,
  PledgeVerifyPinMutation,
  PledgeVerifyPinMutationVariables,
} from '@/common/__generated__/graphql';
import { isServer } from '@/common/environment';

const PLEDGE_AUTH_TOKEN_KEY = 'pledge-auth-token';
export const PLEDGE_AUTH_CHANGED_EVENT = 'pledge-auth-changed';
export const PUBLIC_USER_UUID_KEY = 'pledge-user-uuid';

function getStoredPublicUserUuid(): string | undefined {
  if (isServer) return undefined;
  return localStorage.getItem(PUBLIC_USER_UUID_KEY) ?? undefined;
}

export function getPledgeAuthToken(): string | null {
  if (isServer) return null;
  return localStorage.getItem(PLEDGE_AUTH_TOKEN_KEY);
}

function getStoredToken(): string | null {
  if (isServer) return null;
  return localStorage.getItem(PLEDGE_AUTH_TOKEN_KEY);
}

function storeAuth(token: string): void {
  localStorage.setItem(PLEDGE_AUTH_TOKEN_KEY, token);
  localStorage.removeItem(PUBLIC_USER_UUID_KEY);
  window.dispatchEvent(new CustomEvent(PLEDGE_AUTH_CHANGED_EVENT));
}

export function clearPledgeAuth(): void {
  localStorage.removeItem(PLEDGE_AUTH_TOKEN_KEY);
  window.dispatchEvent(new CustomEvent(PLEDGE_AUTH_CHANGED_EVENT));
}

const PLEDGE_SIGN_UP = gql`
  mutation PledgeSignUp(
    $email: String!
    $termsAccepted: Boolean!
    $marketingAccepted: Boolean!
    $anonUuid: UUID
  ) {
    pledge {
      signUp(
        email: $email
        termsAccepted: $termsAccepted
        marketingAccepted: $marketingAccepted
        anonUuid: $anonUuid
      ) {
        sent
      }
    }
  }
`;

const PLEDGE_SIGN_IN = gql`
  mutation PledgeSignIn($email: String!, $anonUuid: UUID) {
    pledge {
      signIn(email: $email, anonUuid: $anonUuid) {
        sent
      }
    }
  }
`;

const PLEDGE_VERIFY_PIN = gql`
  mutation PledgeVerifyPin($email: String!, $pin: String!, $anonUuid: UUID) {
    pledge {
      verifyPin(email: $email, pin: $pin, anonUuid: $anonUuid) {
        userToken
        pledgeIds
      }
    }
  }
`;

type PendingFlow =
  | { type: 'signUp'; termsAccepted: boolean; marketingAccepted: boolean; anonUuid: string | null }
  | { type: 'signIn'; anonUuid: string | null };

export type SignInStep = 'email' | 'pin';

function getErrorCode(err: unknown): string | undefined {
  if (CombinedGraphQLErrors.is(err)) {
    return err.errors[0]?.extensions?.['code'] as string | undefined;
  }
  return undefined;
}

/**
 * Full sign-in/sign-up flow hook — manages email → PIN steps
 */
export function usePledgeSignIn() {
  const [step, setStep] = useState<SignInStep>('email');
  const [pendingEmail, setPendingEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingFlow, setPendingFlow] = useState<PendingFlow | null>(null);

  const [signUpMutation] = useMutation<PledgeSignUpMutation, PledgeSignUpMutationVariables>(
    PLEDGE_SIGN_UP
  );
  const [signInMutation] = useMutation<PledgeSignInMutation, PledgeSignInMutationVariables>(
    PLEDGE_SIGN_IN
  );
  const [verifyPinMutation] = useMutation<
    PledgeVerifyPinMutation,
    PledgeVerifyPinMutationVariables
  >(PLEDGE_VERIFY_PIN);

  const signUp = useCallback(
    async (
      email: string,
      termsAccepted: boolean,
      marketingAccepted: boolean,
      anonymousUserToken?: string
    ): Promise<boolean> => {
      // Prefer the passed token; fall back to localStorage so the anon UUID is always included
      const anonUuid = anonymousUserToken ?? getStoredPublicUserUuid() ?? null;
      setLoading(true);
      setError(null);

      try {
        await signUpMutation({
          variables: { email, termsAccepted, marketingAccepted, anonUuid },
        });

        setPendingEmail(email);
        setPendingFlow({ type: 'signUp', termsAccepted, marketingAccepted, anonUuid });
        setStep('pin');

        return true;
      } catch (err) {
        const code = getErrorCode(err);

        if (code === 'COOLDOWN_ACTIVE') {
          setPendingEmail(email);
          setPendingFlow({ type: 'signUp', termsAccepted, marketingAccepted, anonUuid });
          setStep('pin');
          return true;
        }

        setError(code ?? 'sign-up-error');

        return false;
      } finally {
        setLoading(false);
      }
    },
    [signUpMutation]
  );

  const signIn = useCallback(
    async (email: string, anonymousUserToken?: string): Promise<boolean> => {
      const anonUuid = anonymousUserToken ?? getStoredPublicUserUuid() ?? null;

      setLoading(true);
      setError(null);

      try {
        await signInMutation({ variables: { email, anonUuid } });
        setPendingEmail(email);
        setPendingFlow({ type: 'signIn', anonUuid });
        setStep('pin');

        return true;
      } catch (err) {
        const code = getErrorCode(err);

        if (code === 'COOLDOWN_ACTIVE') {
          setPendingEmail(email);
          setPendingFlow({ type: 'signIn', anonUuid });
          setStep('pin');
          return true;
        }

        setError(code ?? 'sign-in-error');

        return false;
      } finally {
        setLoading(false);
      }
    },
    [signInMutation]
  );

  const verifyPin = useCallback(
    async (pin: string): Promise<string[] | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await verifyPinMutation({
          variables: { email: pendingEmail, pin, anonUuid: pendingFlow?.anonUuid ?? null },
        });
        const payload = result.data?.pledge.verifyPin;

        if (!payload) throw new Error('No response');

        storeAuth(payload.userToken);

        return payload.pledgeIds;
      } catch (err) {
        const code = getErrorCode(err);

        setError(code ?? 'INVALID_PIN');

        return null;
      } finally {
        setLoading(false);
      }
    },
    [pendingEmail, pendingFlow, verifyPinMutation]
  );

  const resendCode = useCallback(async (): Promise<void> => {
    if (!pendingFlow) return;

    setLoading(true);
    setError(null);

    try {
      if (pendingFlow.type === 'signUp') {
        await signUpMutation({
          variables: {
            email: pendingEmail,
            termsAccepted: pendingFlow.termsAccepted,
            marketingAccepted: pendingFlow.marketingAccepted,
            anonUuid: pendingFlow.anonUuid ?? null,
          },
        });
      } else {
        await signInMutation({
          variables: { email: pendingEmail, anonUuid: pendingFlow.anonUuid ?? null },
        });
      }
    } catch (err) {
      const code = getErrorCode(err);

      // COOLDOWN_ACTIVE means a code is already in flight — stay on PIN step silently
      if (code !== 'COOLDOWN_ACTIVE') {
        setError(code ?? 'sign-in-error');
      }
    } finally {
      setLoading(false);
    }
  }, [pendingEmail, pendingFlow, signUpMutation, signInMutation]);

  const editEmail = useCallback(() => {
    setStep('email');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setStep('email');
    setPendingEmail('');
    setError(null);
    setPendingFlow(null);
  }, []);

  return {
    step,
    pendingEmail,
    loading,
    error,
    signUp,
    signIn,
    verifyPin,
    resendCode,
    editEmail,
    reset,
  };
}

const GET_PUBLIC_USER_NAV = gql`
  query PublicUserForNav {
    publicUser {
      id
      email
    }
  }
`;

type PublicUserNavQuery = { publicUser: { id: string; email: string } | null };

/**
 * Lightweight hook for reading auth state (e.g. in GlobalNav).
 * Reacts to auth changes dispatched in the same tab.
 */
export function usePledgeNavUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getStoredToken());
  const apolloClient = useApolloClient();

  useEffect(() => {
    const handler = () => {
      const authenticated = !!getStoredToken();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        // Remove all cached data on sign-out
        apolloClient.clearStore().catch(() => {});
      }
    };

    window.addEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);

    return () => window.removeEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);
  }, [apolloClient]);

  // cache-first because we query the public user in a few places for their email
  const { data } = useQuery<PublicUserNavQuery>(GET_PUBLIC_USER_NAV, {
    fetchPolicy: 'cache-first',
    skip: !isAuthenticated,
  });

  const signOut = useCallback(() => {
    clearPledgeAuth();
  }, []);

  return {
    userEmail: isAuthenticated ? (data?.publicUser?.email ?? null) : null,
    isAuthenticated,
    signOut,
  };
}
