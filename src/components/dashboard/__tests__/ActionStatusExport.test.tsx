import userEvent from '@testing-library/user-event';
import { useSession } from 'next-auth/react';

import { render, screen, waitFor } from '@/tests/test-utils';

import ActionStatusExport from '../ActionStatusExport';

jest.mock('next-auth/react', () => ({ useSession: jest.fn() }));
jest.mock('@/context/plan', () => ({ usePlan: () => ({ identifier: 'my-plan' }) }));

const mockedUseSession = useSession as unknown as jest.Mock;
const fetchMock = jest.fn<Promise<Response>, [string, RequestInit]>();
const createObjectURL = jest.fn(() => 'blob:export');

const actions = [{ id: '1' }, { id: '2' }];

/* jsdom has no fetch `Response`; the component only reads these members. */
function fakeResponse(status: number, body: string, headers: Record<string, string> = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (name: string) => headers[name] ?? null },
    blob: () => Promise.resolve(new Blob([body])),
    json: () => Promise.resolve(JSON.parse(body) as unknown),
  } as unknown as Response;
}

function mockSession(status: 'authenticated' | 'unauthenticated', idToken?: string) {
  mockedUseSession.mockReturnValue({
    status,
    data: status === 'authenticated' ? { idToken, expires: '' } : null,
  });
}

async function openMenu() {
  await userEvent.click(screen.getByRole('button', { name: 'Export' }));
}

function allColumnsItems() {
  // The all-columns items follow the "All columns" header.
  const header = screen.getByText('All columns');
  return Array.from(header.parentElement!.querySelectorAll('[role="menuitem"]')).filter(
    (item) => header.compareDocumentPosition(item) & Node.DOCUMENT_POSITION_FOLLOWING
  );
}

describe('ActionStatusExport', () => {
  beforeEach(() => {
    mockedUseSession.mockReset();
    fetchMock.mockReset();
    global.fetch = fetchMock;
    createObjectURL.mockClear();
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = jest.fn();
  });

  it('offers only visible columns to anonymous visitors', async () => {
    mockSession('unauthenticated');
    render(<ActionStatusExport actions={actions} />);
    await openMenu();

    expect(screen.queryByText('All columns')).not.toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
  });

  it('hides all columns once the ID token has expired', async () => {
    mockSession('authenticated');
    render(<ActionStatusExport actions={actions} />);
    await openMenu();

    expect(screen.queryByText('All columns')).not.toBeInTheDocument();
  });

  it('downloads all columns through the export route', async () => {
    mockSession('authenticated', 'id-token');
    fetchMock.mockResolvedValue(
      fakeResponse(200, 'data', {
        'Content-Disposition': 'attachment; filename="plan-actions.xlsx"',
      })
    );
    render(<ActionStatusExport actions={actions} />);
    await openMenu();

    await userEvent.click(allColumnsItems()[0]);

    await waitFor(() => expect(createObjectURL).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/export-actions');
    expect(JSON.parse(init.body as string)).toEqual({
      plan: 'my-plan',
      actions: ['1', '2'],
      format: 'xlsx',
      allFields: true,
    });
  });

  it('asks the user to sign in again when the token is rejected', async () => {
    mockSession('authenticated', 'id-token');
    fetchMock.mockResolvedValue(fakeResponse(401, '{"error": "x"}'));
    render(<ActionStatusExport actions={actions} />);
    await openMenu();

    await userEvent.click(allColumnsItems()[1]);

    expect(await screen.findByText(/sign in again/i)).toBeInTheDocument();
  });

  it('shows an error when the export fails', async () => {
    mockSession('unauthenticated');
    fetchMock.mockResolvedValue(fakeResponse(500, '{"error": "x"}'));
    render(<ActionStatusExport actions={actions} />);
    await openMenu();

    await userEvent.click(screen.getAllByRole('menuitem')[1]);

    expect(await screen.findByText(/export failed/i)).toBeInTheDocument();
  });
});
