import React from 'react';

import { gql } from '@apollo/client';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { act, renderHook, waitFor } from '@testing-library/react';

import { usePledgeUser } from '../../components/pledge/use-pledge-user';

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

const TEST_UUID = 'test-uuid-1234';

function createWrapper(mocks: MockedResponse[] = []) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
  };
}

beforeEach(() => {
  localStorage.clear();
});

describe('usePledgeUser', () => {
  describe('initialization', () => {
    it('returns null userUuid when no stored UUID', () => {
      const { result } = renderHook(() => usePledgeUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.userUuid).toBeNull();
      expect(result.current.committedSlugs.size).toBe(0);
      expect(result.current.userData).toEqual({});
    });

    it('reads UUID from localStorage on init', () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_PLEDGE_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              pledgeUser: {
                id: '1',
                uuid: TEST_UUID,
                userData: '{}',
                commitments: [],
              },
            },
          },
        },
      ];

      const { result } = renderHook(() => usePledgeUser(), {
        wrapper: createWrapper(mocks),
      });

      expect(result.current.userUuid).toBe(TEST_UUID);
    });

    it('fetches user data when UUID exists in localStorage', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_PLEDGE_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              pledgeUser: {
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

      const { result } = renderHook(() => usePledgeUser(), {
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
      const { result } = renderHook(() => usePledgeUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.getCommitmentCountAdjustment('any-slug')).toBe(0);
    });

    it('returns 0 for unchanged commitments', async () => {
      localStorage.setItem('pledge-user-uuid', TEST_UUID);

      const mocks: MockedResponse[] = [
        {
          request: {
            query: GET_PLEDGE_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              pledgeUser: {
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

      const { result } = renderHook(() => usePledgeUser(), {
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
      const mocks: MockedResponse[] = [
        {
          request: { query: REGISTER_PLEDGE_USER },
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
            query: GET_PLEDGE_USER,
            variables: { user: TEST_UUID },
          },
          result: {
            data: {
              pledgeUser: {
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

      const { result } = renderHook(() => usePledgeUser(), {
        wrapper: createWrapper(mocks),
      });

      expect(result.current.userUuid).toBeNull();

      await act(async () => {
        await result.current.commitToPledge('100');
      });

      expect(localStorage.getItem('pledge-user-uuid')).toBe(TEST_UUID);
    });
  });

  describe('uncommitFromPledge', () => {
    it('does nothing when no user UUID exists', async () => {
      const { result } = renderHook(() => usePledgeUser(), {
        wrapper: createWrapper(),
      });

      // Should not throw
      await act(async () => {
        await result.current.uncommitFromPledge('100');
      });
    });
  });
});
