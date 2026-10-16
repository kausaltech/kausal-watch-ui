import { activeScenarioVar } from '@common/apollo/paths-cache';

import ScenarioSelector from '@/components/paths/ScenarioSelector';
import { render, waitFor } from '@/tests/test-utils';
import { usePathsMutation, usePreloadedPathsQuery } from '@/utils/paths/hooks/usePathsApollo';

jest.mock('@/utils/paths/hooks/usePathsApollo', () => ({
  usePathsMutation: jest.fn(),
  usePreloadedPathsQuery: jest.fn(),
}));

jest.mock('@/components/common/SelectDropdown', () => ({
  __esModule: true,
  default: () => <div data-testid="scenario-selector" />,
}));

jest.mock('@/context/paths/paths', () => ({
  __esModule: true,
  default: {},
  usePaths: () => ({ instance: { id: 'zuerich' } }),
}));

const mockedUseMutation = jest.mocked(usePathsMutation);
const mockedUseQuery = jest.mocked(usePreloadedPathsQuery);

describe('ScenarioSelector', () => {
  beforeEach(() => {
    activeScenarioVar({ id: 'baseline', name: 'Baseline', isActive: true, isDefault: true });
    mockedUseMutation.mockReturnValue([
      jest.fn(),
      { loading: false, called: false, client: {} },
    ] as unknown as ReturnType<typeof usePathsMutation>);
  });

  afterEach(() => {
    jest.resetAllMocks();
    activeScenarioVar(null);
  });

  it.each([
    ['loading', { loading: true, error: undefined }],
    ['a failed refresh', { loading: false, error: new Error('Paths unavailable') }],
  ])('preserves the active scenario while the query is %s', async (_description, result) => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      networkStatus: 1,
      previousData: undefined,
      variables: {},
      ...result,
    } as unknown as ReturnType<typeof usePreloadedPathsQuery>);

    render(<ScenarioSelector />);

    await waitFor(() => expect(activeScenarioVar()?.id).toBe('baseline'));
  });

  it('updates the active scenario from a completed query', async () => {
    mockedUseQuery.mockReturnValue({
      data: {
        scenarios: [{ id: 'custom', name: 'Custom', isActive: true, isDefault: false }],
      },
      error: undefined,
      loading: false,
      networkStatus: 7,
      previousData: undefined,
      variables: {},
    } as unknown as ReturnType<typeof usePreloadedPathsQuery>);

    render(<ScenarioSelector />);

    await waitFor(() => expect(activeScenarioVar()?.id).toBe('custom'));
  });
});
