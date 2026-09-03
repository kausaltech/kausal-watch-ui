import { processCommonIndicatorHierarchy } from '../process-indicators';
import { EXPECTED_OUTPUT, INPUT } from './mocks';

describe('processCommonIndicatorHierarchy', () => {
  it('processes indicators', () => {
    expect(
      processCommonIndicatorHierarchy(
        INPUT as unknown as Parameters<typeof processCommonIndicatorHierarchy>[0]
      )
    ).toEqual(EXPECTED_OUTPUT);
  });
});
