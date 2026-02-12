'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { gql, useLazyQuery, useMutation } from '@apollo/client';

import type {
  CommitToPledgeMutation,
  CommitToPledgeMutationVariables,
  PledgeUserDataMutation,
  PledgeUserDataMutationVariables,
  PledgeUserQuery,
  PledgeUserQueryVariables,
  RegisterPledgeUserMutation,
} from '@/common/__generated__/graphql';

// Key for storing user's UUID in lcoalStorage
const PLEDGE_USER_UUID_KEY = 'pledge-user-uuid';

const REGISTER_PLEDGE_USER = gql`
  mutation RegisterPledgeUser {
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
  mutation PledgeUserData($user: UUID!, $key: String!, $value: String!) {
    pledge {
      setUserData(key: $key, value: $value, userUuid: $user) {
        uuid
      }
    }
  }
`;

const GET_PLEDGE_USER = gql`
  query PledgeUser($user: UUID!) {
    pledgeUser(uuid: $user) {
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
  // No need for SSR for pledge commitments, so we just use local storage
  if (typeof window === 'undefined') return null;

  return localStorage.getItem(PLEDGE_USER_UUID_KEY);
}

function storeUuid(uuid: string) {
  localStorage.setItem(PLEDGE_USER_UUID_KEY, uuid);
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

export function usePledgeUser() {
  const [userUuid, setUserUuid] = useState<string | null>(() => getStoredUuid());

  const [registerUser] = useMutation<RegisterPledgeUserMutation>(REGISTER_PLEDGE_USER);
  const [commitMutation] = useMutation<CommitToPledgeMutation, CommitToPledgeMutationVariables>(
    COMMIT_TO_PLEDGE
  );

  const [setUserDataMutation] = useMutation<
    PledgeUserDataMutation,
    PledgeUserDataMutationVariables
  >(SET_USER_DATA);

  const [fetchUser, { data: queryData, loading }] = useLazyQuery<
    PledgeUserQuery,
    PledgeUserQueryVariables
  >(GET_PLEDGE_USER, { fetchPolicy: 'network-only' });

  // Fetch user data when UUID is available
  useEffect(() => {
    if (userUuid) {
      fetchUser({ variables: { user: userUuid } });
    }
  }, [userUuid, fetchUser]);

  const userData = useMemo(
    () => parseUserData(queryData?.pledgeUser?.userData),
    [queryData?.pledgeUser?.userData]
  );

  const committedSlugs = useMemo(
    () =>
      new Set(
        (queryData?.pledgeUser?.commitments ?? [])
          .map((c) => c.pledge?.slug)
          .filter((c) => c != null) ?? []
      ),
    [queryData?.pledgeUser?.commitments]
  );

  // Track the committed slugs from the first fetch so we can compute
  // a count adjustment without needing to refetch the pledge list query.
  const initialCommittedSlugs = useRef<Set<string> | null>(null);

  if (initialCommittedSlugs.current === null && queryData?.pledgeUser) {
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

    if (!newUuid) throw new Error('Failed to register pledge user');

    storeUuid(newUuid);
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
