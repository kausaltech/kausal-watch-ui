import { getMergedName } from '@/utils/action.utils';

const otherPlan = (overrides: { shortName?: string | null; name?: string }) => ({
  identifier: '1',
  plan: {
    id: '42',
    shortName: null,
    name: 'Other Plan',
    ...overrides,
  },
});

describe('getMergedName', () => {
  it('returns just the identifier when merged within the same plan', () => {
    const mergedWith = {
      identifier: '7',
      plan: { id: '1', shortName: 'SP', name: 'Same Plan' },
    };

    expect(getMergedName(mergedWith, '1')).toBe('7');
  });

  it('prefixes the shortName when merged with an action in another plan', () => {
    const mergedWith = otherPlan({ shortName: 'OP' });

    expect(getMergedName(mergedWith, '1')).toBe('OP 1');
  });

  it('falls back to the plan name when the other plan has no shortName', () => {
    const mergedWith = otherPlan({ shortName: null });

    expect(getMergedName(mergedWith, '1')).toBe('Other Plan 1');
  });

  it('falls back to the plan name when shortName is an empty string', () => {
    const mergedWith = otherPlan({ shortName: '' });

    expect(getMergedName(mergedWith, '1')).toBe('Other Plan 1');
  });
});
