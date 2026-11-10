import { getAdaptationGeoid, parsePlanGeoids } from '../config';

let mockDeploymentType = 'testing';

jest.mock('@common/env', () => ({
  getDeploymentType: () => mockDeploymentType,
}));

describe('parsePlanGeoids', () => {
  it('reads plan:geoid pairs and ignores malformed entries', () => {
    expect(parsePlanGeoids(' plan-a:0875640, plan-b:5578650 ,broken,:1,')).toEqual({
      'plan-a': '0875640',
      'plan-b': '5578650',
    });
  });

  it('is empty when the variable is unset', () => {
    expect(parsePlanGeoids(undefined)).toEqual({});
  });
});

describe('getAdaptationGeoid', () => {
  const original = process.env.ADAPTATION_PLAN_GEOIDS;

  beforeEach(() => {
    mockDeploymentType = 'testing';
    process.env.ADAPTATION_PLAN_GEOIDS = 'plan-a:0875640';
  });

  afterAll(() => {
    process.env.ADAPTATION_PLAN_GEOIDS = original;
  });

  it('returns the geoid of a listed plan', () => {
    expect(getAdaptationGeoid('plan-a')).toBe('0875640');
  });

  it('returns null for a plan that is not listed', () => {
    expect(getAdaptationGeoid('plan-b')).toBeNull();
  });

  it('returns null in production, even for a listed plan', () => {
    mockDeploymentType = 'production';
    expect(getAdaptationGeoid('plan-a')).toBeNull();
  });
});
