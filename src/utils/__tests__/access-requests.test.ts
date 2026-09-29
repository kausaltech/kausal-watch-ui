import { checkAccountStatus } from '@/utils/access-requests';

jest.mock('@common/env', () => ({ getWatchBackendUrl: () => 'https://backend.test' }));

function mockResponse(status: number, body: unknown) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('checkAccountStatus', () => {
  it('signs in a user the backend knows', async () => {
    mockResponse(200, { method: 'password' });

    await expect(checkAccountStatus('a@example.com')).resolves.toBe('sign-in');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://backend.test/login/check/',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('treats a 404 as a known user', async () => {
    mockResponse(404, {});

    await expect(checkAccountStatus('a@example.com')).resolves.toBe('sign-in');
  });

  it.each([
    ['no_user', 'request-access'],
    ['no_site_access', 'request-access'],
    ['no_password', 'approved-without-password'],
    ['no_client', 'approved-without-password'],
    ['invalid_email', 'invalid-email'],
  ])('maps %s to %s', async (code, expected) => {
    mockResponse(400, { detail: 'x', code });

    await expect(checkAccountStatus('a@example.com')).resolves.toBe(expected);
  });

  it('accepts codes serialized as lists', async () => {
    mockResponse(400, { detail: ['x'], code: ['no_user'] });

    await expect(checkAccountStatus('a@example.com')).resolves.toBe('request-access');
  });

  it('throws on unexpected responses', async () => {
    mockResponse(400, { code: 'no_admin_access' });
    await expect(checkAccountStatus('a@example.com')).rejects.toThrow();

    mockResponse(500, {});
    await expect(checkAccountStatus('a@example.com')).rejects.toThrow();
  });
});
