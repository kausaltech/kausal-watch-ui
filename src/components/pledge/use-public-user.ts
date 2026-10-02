'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { type TypedDocumentNode, gql } from '@apollo/client';
import { useLazyQuery, useMutation } from '@apollo/client/react';

import type {
  CommitToPledgeMutation,
  CommitToPledgeMutationVariables,
  PublicUserDataMutation,
  PublicUserDataMutationVariables,
  PublicUserQuery,
  PublicUserQueryVariables,
  RegisterPublicUserMutation,
  RegisterPublicUserMutationVariables,
} from '@/common/__generated__/graphql';
import { isServer } from '@/common/environment';

import {
  PLEDGE_AUTH_CHANGED_EVENT,
  PUBLIC_USER_UUID_KEY,
  clearPledgeAuth,
  getErrorCode,
  getPledgeAuthToken,
} from './use-pledge-auth';

/**
 * Error codes meaning the stored anonymous UUID no longer identifies a user the backend will
 * accept, e.g. the database was reset, the UUID belongs to another tenant, or it has since been
 * claimed by a signed-up account.
 */
const STALE_ANONYMOUS_USER_CODES = new Set(['PUBLIC_USER_NOT_FOUND', 'TOKEN_REQUIRED']);

/** Error code meaning the stored sign-in token no longer matches an account. */
const STALE_TOKEN_CODE = 'AUTHENTICATION_REQUIRED';

export const REGISTER_PUBLIC_USER: TypedDocumentNode<
  RegisterPublicUserMutation,
  RegisterPublicUserMutationVariables
> = gql`
  mutation RegisterPublicUser {
    pledge {
      registerUser {
        uuid
      }
    }
  }
`;

export const COMMIT_TO_PLEDGE: TypedDocumentNode<
  CommitToPledgeMutation,
  CommitToPledgeMutationVariables
> = gql`
  mutation CommitToPledge($user: UUID, $pledge: ID!, $committed: Boolean!) {
    pledge {
      commitToPledge(committed: $committed, pledgeId: $pledge, userUuid: $user) {
        committed
      }
    }
  }
`;

export const SET_USER_DATA: TypedDocumentNode<
  PublicUserDataMutation,
  PublicUserDataMutationVariables
> = gql`
  mutation PublicUserData($user: UUID, $key: String!, $value: String!) {
    pledge {
      setUserData(key: $key, value: $value, userUuid: $user) {
        uuid
      }
    }
  }
`;

export const GET_PUBLIC_USER: TypedDocumentNode<PublicUserQuery, PublicUserQueryVariables> = gql`
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

function isStaleAnonymousUserError(err: unknown): boolean {
  const code = getErrorCode(err);
  return code != null && STALE_ANONYMOUS_USER_CODES.has(code);
}

function isStaleTokenError(err: unknown): boolean {
  return getErrorCode(err) === STALE_TOKEN_CODE;
}

function parseUserData(
  raw: string | Record<string, string> | undefined | null
): Record<string, string> {
  if (!raw) return {};

  if (typeof raw === 'string') {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        !Array.isArray(parsed) &&
        Object.values(parsed).every((value) => typeof value === 'string')
      ) {
        return parsed as Record<string, string>;
      }
      return {};
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

  const [registerUser] = useMutation(REGISTER_PUBLIC_USER);
  const [commitMutation] = useMutation(COMMIT_TO_PLEDGE);

  const [setUserDataMutation] = useMutation(SET_USER_DATA);

  const [fetchUser, { data: queryData, loading }] = useLazyQuery(GET_PUBLIC_USER, {
    fetchPolicy: 'network-only',
  });

  // Track the committed slugs from the first fetch so we can compute
  // a count adjustment without needing to refetch the pledge list query.
  const initialCommittedSlugsRef = useRef<Set<string> | null>(null);

  /** Drop a stored anonymous identity the backend no longer recognises. */
  const forgetAnonymousUser = useCallback(() => {
    localStorage.removeItem(PUBLIC_USER_UUID_KEY);
    setUserUuid(null);
    setPreExistingCommittedSlugs(new Set());
    initialCommittedSlugsRef.current = null;
  }, []);

  /**
   * Handle the result of looking up the user identified by `uuid`, or by the stored token when
   * `uuid` is undefined.
   *
   * The backend answers a lookup for an unknown, other-tenant or already-claimed identity with
   * `publicUser: null` rather than an error, e.g. after a database reset or with a UUID stored by
   * another plan's site. Forget that identity so the next commit registers a fresh anonymous user
   * instead of failing. Only act if the identity is still the one we hold, so a late response for
   * an old identity can't clear a newer one; on errors, keep the identity and try again next time.
   */
  const forgetIfNotFound = useCallback(
    (uuid: string | undefined, result: Awaited<ReturnType<typeof fetchUser>>) => {
      if (result.error || !result.data || result.data.publicUser) return;

      if (uuid) {
        if (uuid === getStoredUuid()) forgetAnonymousUser();
        return;
      }
      // Signing out through the shared event also clears the UUID and committed slugs
      if (getPledgeAuthToken()) clearPledgeAuth();
    },
    [forgetAnonymousUser]
  );

  const lookUpUser = useCallback(
    (uuid: string | undefined) =>
      fetchUser({ variables: { user: uuid } }).then(
        (result) => forgetIfNotFound(uuid, result),
        () => undefined
      ),
    [fetchUser, forgetIfNotFound]
  );

  // When ensureUser registers a new user it sets this flag so the effect
  // doesn't fire a duplicate fetch — commitToPledge calls fetchUser explicitly.
  const skipEffectFetchRef = useRef(false);

  // Fetch user data on mount: token takes precedence over UUID.
  useEffect(() => {
    if (getPledgeAuthToken()) {
      void lookUpUser(undefined);
    } else if (userUuid) {
      if (skipEffectFetchRef.current) {
        skipEffectFetchRef.current = false;
        return;
      }

      void lookUpUser(userUuid);
    }
  }, [userUuid, lookUpUser]);

  // Distinguish sign-in from sign-out via the same auth-changed event
  useEffect(() => {
    const handler = () => {
      if (getPledgeAuthToken()) {
        // Signed in — identify via token, UUID has been cleared from localStorage
        void lookUpUser(undefined);
      } else {
        // Signed out — clear the session entirely
        localStorage.removeItem(PUBLIC_USER_UUID_KEY);
        setUserUuid(null);
        setPreExistingCommittedSlugs(new Set());
      }
    };

    window.addEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);

    return () => window.removeEventListener(PLEDGE_AUTH_CHANGED_EVENT, handler);
  }, [lookUpUser, setPreExistingCommittedSlugs]);

  const userData = useMemo(
    () => parseUserData(queryData?.publicUser?.userData),
    [queryData?.publicUser?.userData]
  );

  // Committed slugs from both the fetched user and any pre-existing slugs from sign-in.
  // Gated on having an active session (UUID or bearer token) so that stale queryData
  // from a previous user cannot leak through the Apollo lazy-query React state after
  // sign-out but before a full cache eviction has been processed
  const hasSession = userUuid != null || (!isServer && !!getPledgeAuthToken());
  const committedSlugs = useMemo(() => {
    if (!hasSession) return new Set<string>();

    return new Set([
      ...(queryData?.publicUser?.commitments ?? [])
        .map((c) => c.pledge?.slug)
        .filter((c) => c != null),
      ...preExistingCommittedSlugs,
    ]);
  }, [hasSession, queryData?.publicUser?.commitments, preExistingCommittedSlugs]);

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

  const registerNewUser = useCallback(async (): Promise<string> => {
    const result = await registerUser();
    const newUuid = result.data?.pledge.registerUser?.uuid;

    if (!newUuid) throw new Error('Failed to register public user');

    storeUuid(newUuid);
    skipEffectFetchRef.current = true;
    setUserUuid(newUuid);

    return newUuid;
  }, [registerUser]);

  const ensureUser = useCallback(async (): Promise<string> => {
    if (userUuid) return userUuid;

    return registerNewUser();
  }, [userUuid, registerNewUser]);

  const saveAndCommit = useCallback(
    async (
      uuid: string | null,
      pledgeId: string,
      formData: Record<string, string>,
      knownUserData: Record<string, string>
    ) => {
      // Only send mutations for changed fields
      const changedEntries = Object.entries(formData).filter(
        ([key, value]) => value !== (knownUserData[key] ?? '')
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

      await fetchUser({ variables: { user: uuid ?? undefined } });
    },
    [setUserDataMutation, commitMutation, fetchUser]
  );

  const commitToPledge = useCallback(
    async (pledgeId: string, formData: Record<string, string> = {}) => {
      if (getPledgeAuthToken()) {
        try {
          await saveAndCommit(null, pledgeId, formData, userData);
        } catch (err) {
          // The token no longer matches an account: sign out rather than silently continuing
          // as a different, anonymous user. The caller shows the error; retrying commits anonymously.
          if (isStaleTokenError(err)) clearPledgeAuth();
          throw err;
        }
        return;
      }

      const uuid = await ensureUser();
      try {
        await saveAndCommit(uuid, pledgeId, formData, userData);
      } catch (err) {
        if (!isStaleAnonymousUserError(err)) throw err;

        // The stored UUID went stale after the page loaded. Start over once as a new anonymous
        // user; nothing is known about them yet, so every filled-in field is sent.
        forgetAnonymousUser();
        const freshUuid = await registerNewUser();
        await saveAndCommit(freshUuid, pledgeId, formData, {});
      }
    },
    [ensureUser, registerNewUser, forgetAnonymousUser, saveAndCommit, userData]
  );

  const uncommitFromPledge = useCallback(
    async (pledgeId: string) => {
      const isAuth = !!getPledgeAuthToken();

      if (!isAuth && !userUuid) {
        return;
      }

      try {
        await commitMutation({
          variables: {
            user: isAuth ? undefined : (userUuid ?? undefined),
            pledge: pledgeId,
            committed: false,
          },
        });
      } catch (err) {
        // A stale identity has no commitments to remove; forgetting it clears the committed state.
        if (isAuth && isStaleTokenError(err)) {
          clearPledgeAuth();
          return;
        }
        if (!isAuth && isStaleAnonymousUserError(err)) {
          forgetAnonymousUser();
          return;
        }
        throw err;
      }

      if (isAuth) {
        await fetchUser({ variables: { user: undefined } });
      } else if (userUuid) {
        await fetchUser({ variables: { user: userUuid } });
      }
    },
    [userUuid, commitMutation, fetchUser, forgetAnonymousUser]
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
