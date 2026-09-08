import { getSitemapUrlsForOrigin } from '@/utils/sitemap.server';

import sitemap from '../sitemap';

const origin = 'https://example.com';

jest.mock('@common/utils/request.server', () => ({
  getRequestOrigin: jest.fn(() => Promise.resolve('https://example.com')),
}));

jest.mock('@/utils/sitemap.server', () => ({
  getSitemapUrlsForOrigin: jest.fn(() => Promise.resolve(['https://example.com/actions/foo'])),
}));

jest.mock('@/common/environment', () => ({
  get deploymentType() {
    return mockDeploymentType;
  },
}));

let mockDeploymentType = 'production';

describe('sitemap', () => {
  beforeEach(() => {
    mockDeploymentType = 'production';
    jest.mocked(getSitemapUrlsForOrigin).mockClear();
  });

  it('leaves out plans that are hidden from search engines', async () => {
    await sitemap();

    expect(getSitemapUrlsForOrigin).toHaveBeenCalledWith(
      origin,
      expect.objectContaining({ excludeHiddenFromSearchEngines: true })
    );
  });

  it('returns the plan urls on production deployments', async () => {
    await expect(sitemap()).resolves.toEqual([{ url: `${origin}/actions/foo` }]);
  });

  it.each(['preview', 'wip', 'testing', 'development'])(
    'returns an empty sitemap on %s deployments',
    async (deploymentType) => {
      mockDeploymentType = deploymentType;

      await expect(sitemap()).resolves.toEqual([]);
      expect(getSitemapUrlsForOrigin).not.toHaveBeenCalled();
    }
  );
});
