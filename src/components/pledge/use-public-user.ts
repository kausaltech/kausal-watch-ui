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
  PublicUserQueryVariables,
  RegisterPublicUserMutation,
} from '@/common/__generated__/graphql';

const PUBLIC_USER_UUID_KEY = 'pledge-user-uuid';

const REGISTER_PUBLIC_USER = gql`
  mutation RegisterPublicUser {
    pledge {
      registerUser {
        uuid
      }
    }
  }
`;

const COMMIT_TO_PLEDGE = gql`
  mutation CommitToPledge($user: UUID!, $pledge: ID!, $committed: Boolean!) {
    pledge {
      commitToPledge(committed: $committed, pledgeId: $pledge, userUuid: $user) {
        committed
      }
    }
  }
`;

const SET_USER_DATA = gql`
  mutation PublicUserData($user: UUID!, $key: String!, $value: String!) {
    pledge {
      setUserData(key: $key, value: $value, userUuid: $user) {
        uuid
      }
    }
  }
`;

const GET_PUBLIC_USER = gql`
  query PublicUser($user: UUID!) {
    publicUser(uuid: $user) {
      id
      uuid
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
  if (typeof window === 'undefined') return null;

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

  const [registerUser] = useMutation<RegisterPublicUserMutation>(REGISTER_PUBLIC_USER);
  const [commitMutation] = useMutation<CommitToPledgeMutation, CommitToPledgeMutationVariables>(
    COMMIT_TO_PLEDGE
  );

  const [setUserDataMutation] = useMutation<
    PublicUserDataMutation,
    PublicUserDataMutationVariables
  >(SET_USER_DATA);

  const [fetchUser, { data: queryData, loading }] = useLazyQuery<
    PublicUserQuery,
    PublicUserQueryVariables
  >(GET_PUBLIC_USER, { fetchPolicy: 'network-only' });

  // When ensureUser registers a new user it sets this flag so the effect
  // doesn't fire a duplicate fetch — commitToPledge calls fetchUser explicitly.
  const skipEffectFetch = useRef(false);

  // Fetch user data when UUID is available (e.g. loaded from localStorage on mount)
  useEffect(() => {
    if (userUuid) {
      if (skipEffectFetch.current) {
        skipEffectFetch.current = false;
        return;
      }

      fetchUser({ variables: { user: userUuid } });
    }
  }, [userUuid, fetchUser]);

  const userData = useMemo(
    () => parseUserData(queryData?.publicUser?.userData),
    [queryData?.publicUser?.userData]
  );

  const committedSlugs = useMemo(
    () =>
      new Set(
        (queryData?.publicUser?.commitments ?? [])
          .map((c) => c.pledge?.slug)
          .filter((c) => c != null) ?? []
      ),
    [queryData?.publicUser?.commitments]
  );

  // Track the committed slugs from the first fetch so we can compute
  // a count adjustment without needing to refetch the pledge list query.
  const initialCommittedSlugs = useRef<Set<string> | null>(null);

  if (initialCommittedSlugs.current === null && queryData?.publicUser) {
    initialCommittedSlugs.current = new Set(committedSlugs);
  }

  const getCommitmentCountAdjustment = useCallback(
    (slug: string) => {
      const wasCommitted = initialCommittedSlugs.current?.has(slug) ?? false;
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
    skipEffectFetch.current = true;
    setUserUuid(newUuid);

    return newUuid;
  }, [userUuid, registerUser]);

  const commitToPledge = useCallback(
    async (pledgeId: string, formData: Record<string, string> = {}) => {
      const uuid = await ensureUser();

      // Only send mutations for changed fields
      const changedEntries = Object.entries(formData).filter(
        ([key, value]) => value !== (userData[key] ?? '')
      );

      if (changedEntries.length > 0) {
        await Promise.all(
          changedEntries.map(([key, value]) =>
            setUserDataMutation({ variables: { user: uuid, key, value } })
          )
        );
      }

      await commitMutation({
        variables: { user: uuid, pledge: pledgeId, committed: true },
      });

      await fetchUser({ variables: { user: uuid } });
    },
    [ensureUser, userData, setUserDataMutation, commitMutation, fetchUser]
  );

  const uncommitFromPledge = useCallback(
    async (pledgeId: string) => {
      if (!userUuid) return;

      await commitMutation({
        variables: { user: userUuid, pledge: pledgeId, committed: false },
      });

      await fetchUser({ variables: { user: userUuid } });
    },
    [userUuid, commitMutation, fetchUser]
  );

  return {
    userUuid,
    userData,
    committedSlugs,
    loading,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
  };
}
