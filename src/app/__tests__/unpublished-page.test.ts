import { getDomainSiteVerification } from '@/queries/get-domain-site-verification';

import { generateMetadata } from '../root/[domain]/[lang]/unpublished/page';

const hostname = 'example.com';

jest.mock('@/queries/get-domain-site-verification', () => ({
  getDomainSiteVerification: jest.fn(),
}));

jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));

const mockedQuery = jest.mocked(getDomainSiteVerification);

function mockDomains(domains: Array<{ googleSiteVerificationTag: string | null } | null>) {
  mockedQuery.mockResolvedValue({
    data: { plansForHostname: domains.map((domain) => ({ domain })) },
  } as unknown as Awaited<ReturnType<typeof getDomainSiteVerification>>);
}

const props = {
  params: Promise.resolve({ domain: hostname, lang: 'en' }),
  searchParams: Promise.resolve({ message: '', loginEnabled: 'false' }),
};

describe('unpublished page metadata', () => {
  beforeEach(() => mockedQuery.mockReset());

  it('serves the verification tag of a domain that has one', async () => {
    mockDomains([{ googleSiteVerificationTag: 'token' }]);

    await expect(generateMetadata(props)).resolves.toMatchObject({
      other: { 'google-site-verification': 'token' },
    });
    expect(mockedQuery).toHaveBeenCalledWith(hostname);
  });

  it('omits the verification tag for a domain without one', async () => {
    mockDomains([{ googleSiteVerificationTag: null }]);

    expect('other' in (await generateMetadata(props))).toBe(false);
  });

  it('omits the verification tag when the query fails', async () => {
    mockedQuery.mockRejectedValue(new Error('backend unavailable'));

    expect('other' in (await generateMetadata(props))).toBe(false);
  });

  it.each([
    ['with a verification tag', () => mockDomains([{ googleSiteVerificationTag: 'token' }])],
    ['without one', () => mockDomains([])],
  ])('keeps the page out of search engines %s', async (_case, mock) => {
    mock();

    await expect(generateMetadata(props)).resolves.toMatchObject({ robots: 'noindex' });
  });
});
