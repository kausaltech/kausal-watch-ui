import type React from 'react';

import { type MockLink } from '@apollo/client/testing';
import { MockedProvider } from '@apollo/client/testing/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { GraphQLError } from 'graphql';

import {
  COMMIT_TO_PLEDGE,
  GET_PUBLIC_USER,
  REGISTER_PUBLIC_USER,
  SET_USER_DATA,
  usePublicUser,
} from '../../components/pledge/use-public-user';

const TEST_UUID = 'test-uuid-1234';
const FRESH_UUID = 'fresh-uuid-5678';

function publicUserMock(
  uuid: string,
  publicUser: { userData?: string; slugs?: string[] } | null
): MockLink.MockedResponse {
  return {
    request: { query: GET_PUBLIC_USER, variables: { user: uuid } },
    result: {
      data: {
        publicUser: publicUser && {
          id: '1',
          uuid,
          email: null,
          userData: publicUser.userData ?? '{}',
          commitments: (publicUser.slugs ?? []).map((slug, i) => ({
            id: String(i),
            pledge: { id: `p${i}`, slug, name: slug },
          })),
        },
      },
    },
  };
}

function registerMock(uuid: string): MockLink.MockedResponse {
  return {
    request: { query: REGISTER_PUBLIC_USER },
    result: { data: { pledge: { registerUser: { uuid } } } },
  };
}

function commitMock(
  uuid: string | undefined,
  committed: boolean,
  errorCode?: string
): MockLink.MockedResponse {
  return {
    request: { query: COMMIT_TO_PLEDGE, variables: { user: uuid, pledge: '100', committed } },
    result: errorCode
      ? { errors: [new GraphQLError('Error', { extensions: { code: errorCode } })] }
      : { data: { pledge: { commitToPledge: { committed } } } },
  };
}

function createWrapper(mocks: MockLink.MockedResponse[] = []) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe('usePublicUser', () => {
  describe('initialization', () => {
    it('returns null userUuid when no stored UUID', () => {
      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.userUuid).toBeNull();
      expect(result.current.committedSlugs.size).toBe(0);
      expect(result.current.userData).toEqual({});
    });

    it('reads UUID from localStorage on init', () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockLink.MockedResponse[] = [
        {
          request: {
            query: GET_PUBLIC_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              publicUser: {
                id: '1',
                uuid: TEST_UUID,
                userData: '{}',
                commitments: [],
              },
            },
          },
        },
      ];

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(mocks),
      });

      expect(result.current.userUuid).toBe(TEST_UUID);
    });

    it('fetches user data when UUID exists in localStorage', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockLink.MockedResponse[] = [
        {
          request: {
            query: GET_PUBLIC_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              publicUser: {
                id: '1',
                uuid: TEST_UUID,
                userData: '{"zip_code": "02134"}',
                commitments: [
                  {
                    id: '10',
                    pledge: { id: '100', slug: 'bike-to-work', name: 'Bike to Work' },
                  },
                ],
              },
            },
          },
        },
      ];

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(mocks),
      });

      await waitFor(() => {
        expect(result.current.userData).toEqual({ zip_code: '02134' });
      });

      expect(result.current.committedSlugs.has('bike-to-work')).toBe(true);
      expect(result.current.committedSlugs.size).toBe(1);
    });
  });

  describe('getCommitmentCountAdjustment', () => {
    it('returns 0 when no user data loaded', () => {
      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.getCommitmentCountAdjustment('any-slug')).toBe(0);
    });

    it('returns 0 for unchanged commitments', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockLink.MockedResponse[] = [
        {
          request: {
            query: GET_PUBLIC_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              publicUser: {
                id: '1',
                uuid: TEST_UUID,
                userData: '{}',
                commitments: [
                  {
                    id: '10',
                    pledge: { id: '100', slug: 'bike-to-work', name: 'Bike to Work' },
                  },
                ],
              },
            },
          },
        },
      ];

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(mocks),
      });

      await waitFor(() => {
        expect(result.current.committedSlugs.has('bike-to-work')).toBe(true);
      });

      // Same slug is still committed, so adjustment is 0
      expect(result.current.getCommitmentCountAdjustment('bike-to-work')).toBe(0);
      // Slug that was never committed, adjustment is also 0
      expect(result.current.getCommitmentCountAdjustment('other-pledge')).toBe(0);
    });
  });

  describe('commitToPledge', () => {
    it('registers a new user when no UUID exists', async () => {
      const mocks: MockLink.MockedResponse[] = [
        {
          request: { query: REGISTER_PUBLIC_USER },
          result: {
            data: {
              pledge: {
                registerUser: { uuid: TEST_UUID },
              },
            },
          },
        },
        {
          request: {
            query: COMMIT_TO_PLEDGE,
            variables: { user: TEST_UUID, pledge: '100', committed: true },
          },
          result: {
            data: {
              pledge: {
                commitToPledge: { committed: true },
              },
            },
          },
        },
        {
          request: {
            query: GET_PUBLIC_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              publicUser: {
                id: '1',
                uuid: TEST_UUID,
                userData: '{}',
                commitments: [
                  {
                    id: '10',
                    pledge: { id: '100', slug: 'bike-to-work', name: 'Bike to Work' },
                  },
                ],
              },
            },
          },
        },
      ];

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(mocks),
      });

      expect(result.current.userUuid).toBeNull();

      await act(async () => {
        await result.current.commitToPledge('100');
      });

      expect(localStorage.getItem('pledge-user-uuid')).toBe(TEST_UUID);
    });
  });

  describe('stale identity', () => {
    it('forgets a stored UUID the backend no longer recognises', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper([publicUserMock(TEST_UUID, null)]),
      });

      await waitFor(() => {
        expect(result.current.userUuid).toBeNull();
      });
      expect(localStorage.getItem('pledge-user-uuid')).toBeNull();
    });

    it('registers a fresh user on the next commit after forgetting a stale UUID', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper([
          publicUserMock(TEST_UUID, null),
          registerMock(FRESH_UUID),
          commitMock(FRESH_UUID, true),
          publicUserMock(FRESH_UUID, { slugs: ['bike-to-work'] }),
        ]),
      });

      await waitFor(() => {
        expect(result.current.userUuid).toBeNull();
      });

      await act(async () => {
        await result.current.commitToPledge('100');
      });

      expect(localStorage.getItem('pledge-user-uuid')).toBe(FRESH_UUID);
      await waitFor(() => {
        expect(result.current.committedSlugs.has('bike-to-work')).toBe(true);
      });
    });

    it.each(['PUBLIC_USER_NOT_FOUND', 'TOKEN_REQUIRED'])(
      'retries once as a new user when a commit fails with %s',
      async (errorCode) => {
        localStorage.setItem('pledge-user-uuid', TEST_UUID);

        const { result } = renderHook(() => usePublicUser(), {
          wrapper: createWrapper([
            publicUserMock(TEST_UUID, { userData: '{"postal_code": "00100"}' }),
            commitMock(TEST_UUID, true, errorCode),
            registerMock(FRESH_UUID),
            {
              request: {
                query: SET_USER_DATA,
                variables: { user: FRESH_UUID, key: 'postal_code', value: '00100' },
              },
              result: { data: { pledge: { setUserData: { uuid: FRESH_UUID } } } },
            },
            commitMock(FRESH_UUID, true),
            publicUserMock(FRESH_UUID, {
              userData: '{"postal_code": "00100"}',
              slugs: ['bike-to-work'],
            }),
          ]),
        });

        await waitFor(() => {
          expect(result.current.userData).toEqual({ postal_code: '00100' });
        });

        // The value is unchanged for the stale user, so only the retry for the fresh user sends it
        await act(async () => {
          await result.current.commitToPledge('100', { postal_code: '00100' });
        });

        expect(localStorage.getItem('pledge-user-uuid')).toBe(FRESH_UUID);
        await waitFor(() => {
          expect(result.current.committedSlugs.has('bike-to-work')).toBe(true);
        });
      }
    );

    it('does not retry for unrelated errors', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper([
          publicUserMock(TEST_UUID, {}),
          commitMock(TEST_UUID, true, 'COMMUNITY_ENGAGEMENT_DISABLED'),
        ]),
      });

      await waitFor(() => {
        expect(result.current.userData).toEqual({});
      });

      await act(async () => {
        await expect(result.current.commitToPledge('100')).rejects.toThrow();
      });

      expect(localStorage.getItem('pledge-user-uuid')).toBe(TEST_UUID);
    });

    it('keeps the stored UUID when the lookup fails with a network error', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper([
          {
            request: { query: GET_PUBLIC_USER, variables: { user: TEST_UUID } },
            error: new Error('Network down'),
          },
        ]),
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.userUuid).toBe(TEST_UUID);
      expect(localStorage.getItem('pledge-user-uuid')).toBe(TEST_UUID);
    });

    it('signs out when the stored token no longer matches an account', async () => {
      localStorage.setItem('pledge-auth-token', 'dead-token');

      renderHook(() => usePublicUser(), {
        wrapper: createWrapper([
          {
            request: { query: GET_PUBLIC_USER, variables: () => true },
            result: { data: { publicUser: null } },
          },
        ]),
      });

      await waitFor(() => {
        expect(localStorage.getItem('pledge-auth-token')).toBeNull();
      });
    });

    it('forgets a stale UUID instead of failing to un-commit', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper([
          publicUserMock(TEST_UUID, { slugs: ['bike-to-work'] }),
          commitMock(TEST_UUID, false, 'PUBLIC_USER_NOT_FOUND'),
        ]),
      });

      await waitFor(() => {
        expect(result.current.committedSlugs.has('bike-to-work')).toBe(true);
      });

      await act(async () => {
        await result.current.uncommitFromPledge('100');
      });

      expect(result.current.userUuid).toBeNull();
      expect(result.current.committedSlugs.size).toBe(0);
      expect(localStorage.getItem('pledge-user-uuid')).toBeNull();
    });
  });

  describe('uncommitFromPledge', () => {
    it('does nothing when no user UUID exists', async () => {
      const { result } = renderHook(() => usePublicUser(), {
        wrapper: createWrapper(),
      });

      // Should not throw
      await act(async () => {
        await result.current.uncommitFromPledge('100');
      });
    });
  });
});
