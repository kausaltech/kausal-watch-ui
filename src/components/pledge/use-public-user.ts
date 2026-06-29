'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { gql } from '@apollo/client';
import { useLazyQuery, useMutation } from '@apollo/client/react';

import type {
  CommitToPledgeMutation,
  CommitToPledgeMutationVariables,
  PublicUserDataMutation,
  PublicUserDataMutationVariables,
  PublicUserQuery,
  RegisterPublicUserMutation,
} from '@/common/__generated__/graphql';
import { isServer } from '@/common/environment';

import {
  PLEDGE_AUTH_CHANGED_EVENT,
  PUBLIC_USER_UUID_KEY,
  getPledgeAuthToken,
} from './use-pledge-auth';

export const REGISTER_PUBLIC_USER = gql`
  mutation RegisterPublicUser {
    pledge {
      registerUser {
        uuid
      }
    }
  }
`;

export const COMMIT_TO_PLEDGE = gql`
  mutation CommitToPledge($user: UUID, $pledge: ID!, $committed: Boolean!) {
    pledge {
      commitToPledge(committed: $committed, pledgeId: $pledge, userUuid: $user) {
        committed
      }
    }
  }
`;

export const SET_USER_DATA = gql`
  mutation PublicUserData($user: UUID, $key: String!, $value: String!) {
    pledge {
      setUserData(key: $key, value: $value, userUuid: $user) {
        uuid
      }
    }
  }
`;

export const GET_PUBLIC_USER = gql`
  query PublicUser($user: UUID) {
    publicUser(uuid: $user) {
      id
      uuid
      email
      userData
      commitments {
        id
        pledge {
          id
          slug
          name
        }
      }
    }
  }
`;

function getStoredUuid(): string | null {
  if (isServer) return null;

  return localStorage.getItem(PUBLIC_USER_UUID_KEY);
}

function storeUuid(uuid: string) {
  localStorage.setItem(PUBLIC_USER_UUID_KEY, uuid);
}

function parseUserData(
  raw: string | Record<string, string> | undefined | null
): Record<string, string> {
  if (!raw) return {};

  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  return raw;
}

export function usePublicUser() {
  const [userUuid, setUserUuid] = useState<string | null>(() => getStoredUuid());

  const [preExistingCommittedSlugs, setPreExistingCommittedSlugs] = useState<Set<string>>(
    () => new Set()
  );

  const [registerUser] = useMutation<RegisterPublicUserMutation>(REGISTER_PUBLIC_USER);
  // UUID is optional when the pledge bearer token handles auth instead
  const [commitMutation] = useMutation<
    CommitToPledgeMutation,
    Omit<CommitToPledgeMutationVariables, 'user'> & { user?: string | null }
  >(COMMIT_TO_PLEDGE);

  const [setUserDataMutation] = useMutation<
    PublicUserDataMutation,
    Omit<PublicUserDataMutationVariables, 'user'> & { user?: string | null }
  >(SET_USER_DATA);

  const [fetchUser, { data: queryData, loading }] = useLazyQuery<
    PublicUserQuery,
    { user?: string | null }
  >(GET_PUBLIC_USER, { fetchPolicy: 'network-only' });

  // When ensureUser registers a new user it sets this flag so the effect
  // doesn't fire a duplicate fetch — commitToPledge calls fetchUser explicitly.
  const skipEffectFetchRef = useRef(false);

  // Stable ref so the auth-change handler always sees the latest UUID without
  // needing to re-register on every UUID change.
  const userUuidRef = useRef(userUuid);

  useEffect(() => {
    userUuidRef.current = userUuid;
  });

  // Fetch user data on mount: via UUID (anon), bearer token (signed in), or both.
  useEffect(() => {
    if (userUuid) {
      if (skipEffectFetchRef.current) {
        skipEffectFetchRef.current = false;
        return;
      }
      void fetchUser({ variables: { user: userUuid } });
    } else if (getPledgeAuthToken()) {
      // No anon UUID (cleared on a previous sign-in), but bearer token present
      void fetchUser({ variables: {} });
    }
  }, [userUuid, fetchUser]);

  // Distinguish sign-in from sign-out via the same auth-changed event
  useEffect(() => {
    const handler = () => {
      if (getPledgeAuthToken()) {
        // Signed in — refresh committed pledges from the bearer token user
        const uuid = userUuidRef.current;

        void fetchUser({ variables: uuid ? { user: uuid } : {} });
      } else {
        // Signed out — clear the session entirely
        localStorage.removeItem(PUBLIC_USER_UUID_KEY);
        setUserUuid(null);
        setPreExistingCommittedSlugs(new Set());
      }
    };

    window.addEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);

    return () => window.removeEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);
  }, [fetchUser, setPreExistingCommittedSlugs]);

  const userData = useMemo(
    () => parseUserData(queryData?.publicUser?.userData),
    [queryData?.publicUser?.userData]
  );

  // Committed slugs from both the fetched user and any pre-existing slugs from sign-in.
  // Gated on having an active session (UUID or bearer token) so that stale queryData
  // from a previous user cannot leak through the Apollo lazy-query React state after
  // sign-out but before a full cache eviction has been processed
  const hasSession = userUuid != null || (!isServer && !!getPledgeAuthToken());
  const committedSlugs = useMemo(
    () => {
      if (!hasSession) return new Set<string>();

      return new Set([
        ...(queryData?.publicUser?.commitments ?? [])
          .map((c) => c.pledge?.slug)
          .filter((c) => c != null),
        ...preExistingCommittedSlugs,
      ]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasSession, queryData?.publicUser?.commitments, preExistingCommittedSlugs]
  );

  // Track the committed slugs from the first fetch so we can compute
  // a count adjustment without needing to refetch the pledge list query.
  const initialCommittedSlugsRef = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (initialCommittedSlugsRef.current === null && queryData?.publicUser) {
      initialCommittedSlugsRef.current = new Set(committedSlugs);
    }
  }, [queryData?.publicUser, committedSlugs]);

  const getCommitmentCountAdjustment = useCallback(
    (slug: string) => {
      const wasCommitted = initialCommittedSlugsRef.current?.has(slug) ?? false;
      const isNowCommitted = committedSlugs.has(slug);
      if (wasCommitted === isNowCommitted) return 0;
      return isNowCommitted ? 1 : -1;
    },
    [committedSlugs]
  );

  const ensureUser = useCallback(async (): Promise<string> => {
    if (userUuid) return userUuid;

    const result = await registerUser();
    const newUuid = result.data?.pledge.registerUser?.uuid;

    if (!newUuid) throw new Error('Failed to register public user');

    storeUuid(newUuid);
    skipEffectFetchRef.current = true;
    setUserUuid(newUuid);

    return newUuid;
  }, [userUuid, registerUser]);

  const commitToPledge = useCallback(
    async (pledgeId: string, formData: Record<string, string> = {}) => {
      const isAuth = !!getPledgeAuthToken();
      const uuid = isAuth ? null : await ensureUser();

      // Only send mutations for changed fields
      const changedEntries = Object.entries(formData).filter(
        ([key, value]) => value !== (userData[key] ?? '')
      );

      if (changedEntries.length > 0) {
        await Promise.all(
          changedEntries.map(([key, value]) =>
            setUserDataMutation({ variables: { user: uuid ?? undefined, key, value } })
          )
        );
      }

      await commitMutation({
        variables: { user: uuid ?? undefined, pledge: pledgeId, committed: true },
      });

      if (isAuth) {
        await fetchUser({ variables: {} });
      } else if (uuid) {
        await fetchUser({ variables: { user: uuid } });
      }
    },
    [ensureUser, userData, setUserDataMutation, commitMutation, fetchUser]
  );

  const uncommitFromPledge = useCallback(
    async (pledgeId: string) => {
      const isAuth = !!getPledgeAuthToken();

      if (!isAuth && !userUuid) {
        return;
      }

      await commitMutation({
        variables: { user: userUuid ?? undefined, pledge: pledgeId, committed: false },
      });

      if (isAuth) {
        await fetchUser({ variables: {} });
      } else if (userUuid) {
        await fetchUser({ variables: { user: userUuid } });
      }
    },
    [userUuid, commitMutation, fetchUser]
  );

  const mergePreExistingPledgeSlugs = useCallback(
    (slugs: string[]) => {
      setPreExistingCommittedSlugs((prev) => new Set([...prev, ...slugs]));
    },
    [setPreExistingCommittedSlugs]
  );

  return {
    userUuid,
    userData,
    committedSlugs,
    loading,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
    mergePreExistingPledgeSlugs,
  };
}
