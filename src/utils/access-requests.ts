import { getWatchBackendUrl } from '@common/env';

export type AccountStatus =
  'sign-in' | 'request-access' | 'approved-without-password' | 'invalid-email';

function getErrorCode(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null || !('code' in body)) return undefined;
  const { code } = body;
  // DRF may serialize the code either as a string or as a one-item list.
  if (Array.isArray(code)) return typeof code[0] === 'string' ? code[0] : undefined;
  return typeof code === 'string' ? code : undefined;
}

export async function checkAccountStatus(email: string): Promise<AccountStatus> {
  const response = await fetch(`${getWatchBackendUrl()}/login/check/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // With `next` pointing at the OAuth authorize view, the backend checks for public site access
    // instead of admin access.
    body: JSON.stringify({ email, next: '/o/authorize/' }),
  });

  if (response.ok) return 'sign-in';

  if (response.status !== 400) {
    throw new Error(`Login check failed with status ${response.status}`);
  }

  const code = getErrorCode(await response.json());

  switch (code) {
    case 'no_user':
    case 'no_site_access':
      return 'request-access';
    case 'no_password':
    case 'no_client':
      return 'approved-without-password';
    case 'invalid_email':
      return 'invalid-email';
    default:
      throw new Error(`Unexpected login check result: ${code ?? 'no code'}`);
  }
}
