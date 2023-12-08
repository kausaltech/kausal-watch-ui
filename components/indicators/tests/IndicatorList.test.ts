import { processCommonIndicatorHierarchy } from '../process-indicators';
import { EXPECTED_OUTPUT, INPUT } from './mocks';

describe('processCommonIndicatorHierarchy', () => {
  it('processes indicators', () => {
    expect(processCommonIndicatorHierarchy(INPUT)).toEqual(EXPECTED_OUTPUT);
  });
});
