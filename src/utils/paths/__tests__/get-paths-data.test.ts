import type { ApolloClient } from '@apollo/client';

import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';

import { getPathsData } from '../get-paths-data';

jest.mock('@/queries/paths/get-paths-instance', () => ({
  getPathsInstance: jest.fn(),
}));

describe('getPathsData', () => {
  it('accepts the successful result shape returned by ApolloClient.query', async () => {
    const data = {
      instance: { id: 'zuerich' },
    } as GetInstanceContextQuery;
    const request = jest
      .fn()
      .mockResolvedValue({ data } satisfies ApolloClient.QueryResult<GetInstanceContextQuery>);

    await expect(getPathsData('zuerich', request)).resolves.toBe(data);
    expect(request).toHaveBeenCalledWith('zuerich');
  });
});
