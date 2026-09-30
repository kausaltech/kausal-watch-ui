/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { auth } from '@/config/auth';

import { POST } from '../route';

jest.mock('@/config/auth', () => ({ auth: jest.fn() }));
jest.mock('@common/env', () => ({ getWatchBackendUrl: () => 'https://backend.example.com' }));
jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }));

const mockedAuth = auth as unknown as jest.Mock;
const fetchMock = jest.fn<Promise<Response>, [string, RequestInit]>();

function exportRequest(body: unknown) {
  return new NextRequest('https://plan.example.com/api/export-actions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const validBody = { plan: 'my-plan', actions: ['1', '2'], format: 'csv', allFields: true };

function backendResponse(status = 200, body = 'a,b\n') {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="export.csv"',
    },
  });
}

describe('POST /api/export-actions', () => {
  beforeEach(() => {
    mockedAuth.mockReset();
    fetchMock.mockReset();
    global.fetch = fetchMock;
  });

  it.each([
    ['a plan identifier with unexpected characters', { ...validBody, plan: '../admin' }],
    ['a non-numeric action id', { ...validBody, actions: ['1', 'x'] }],
    ['an unknown format', { ...validBody, format: 'pdf' }],
    ['a missing body field', { plan: 'my-plan', format: 'csv' }],
  ])('rejects %s', async (_label, body) => {
    mockedAuth.mockResolvedValue({ idToken: 'id-token' });

    const response = await POST(exportRequest(body));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards the ID token to the backend export', async () => {
    mockedAuth.mockResolvedValue({ idToken: 'id-token' });
    fetchMock.mockResolvedValue(backendResponse());

    await POST(exportRequest(validBody));

    const [url, init] = fetchMock.mock.calls[0];
    const parsed = new URL(url);
    expect(`${parsed.origin}${parsed.pathname}`).toBe(
      'https://backend.example.com/report_export/my-plan/'
    );
    expect(parsed.searchParams.get('actions')).toBe('1,2');
    expect(parsed.searchParams.get('format')).toBe('csv');
    expect(parsed.searchParams.get('fields')).toBe('all');
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer id-token');
  });

  it('exports visible columns anonymously without an ID token', async () => {
    mockedAuth.mockResolvedValue(null);
    fetchMock.mockResolvedValue(backendResponse());

    const response = await POST(exportRequest({ ...validBody, allFields: false }));

    expect(response.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(new URL(url).searchParams.has('fields')).toBe(false);
    expect(new Headers(init.headers).has('Authorization')).toBe(false);
  });

  it('refuses all fields without an ID token, without calling the backend', async () => {
    mockedAuth.mockResolvedValue({ user: { name: 'Someone' } });

    const response = await POST(exportRequest(validBody));

    expect(response.status).toBe(401);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('passes the file through', async () => {
    mockedAuth.mockResolvedValue({ idToken: 'id-token' });
    fetchMock.mockResolvedValue(backendResponse());

    const response = await POST(exportRequest(validBody));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/csv');
    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="export.csv"');
    await expect(response.text()).resolves.toBe('a,b\n');
  });

  it.each([401, 403, 404])('passes backend status %i through as a JSON error', async (status) => {
    mockedAuth.mockResolvedValue({ idToken: 'id-token' });
    fetchMock.mockResolvedValue(backendResponse(status, 'Forbidden'));

    const response = await POST(exportRequest(validBody));

    expect(response.status).toBe(status);
    const body = (await response.json()) as { error?: unknown };
    expect(typeof body.error).toBe('string');
  });

  it('answers 502 when the backend cannot be reached', async () => {
    mockedAuth.mockResolvedValue({ idToken: 'id-token' });
    fetchMock.mockRejectedValue(new Error('connection refused'));

    const response = await POST(exportRequest(validBody));

    expect(response.status).toBe(502);
  });
});
