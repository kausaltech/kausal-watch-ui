import { PlanContextFragment } from '../__generated__/graphql';
import { prependPlanAndLocale } from '../links';
import _mockPlan from '@/tests/__mocks__/mock-plan-context.json';

const mockPlan = _mockPlan as PlanContextFragment;

const BASE_PATH = 'base';

const mockPlanWithBase = {
  ...mockPlan,
  domain: { ...mockPlan.domain, basePath: BASE_PATH, id: 'domain' },
};

describe('prependPlanAndLocale', () => {
  it('prepends non-primary locales', () => {
    expect(prependPlanAndLocale(mockPlan, '/foo/bar', 'de')).toBe(
      '/de/foo/bar'
    );
    expect(prependPlanAndLocale(mockPlan, '', 'en-US')).toBe('/en-US/');
    expect(prependPlanAndLocale(mockPlan, 'fi/peruna', 'fi')).toBe(
      '/fi/peruna'
    );
  });

  it('does not prepend primary locales', () => {
    expect(prependPlanAndLocale(mockPlan, '/foo/bar', 'en')).toBe('/foo/bar');
    expect(prependPlanAndLocale(mockPlan, '/', 'en')).toBe('/');
  });

  it('prepends plan base paths', () => {
    expect(prependPlanAndLocale(mockPlanWithBase, '/hello/there', 'en')).toBe(
      '/base/hello/there'
    );
    expect(prependPlanAndLocale(mockPlanWithBase, '/', 'en')).toBe('/base/');
    expect(prependPlanAndLocale(mockPlanWithBase, '/base', 'en')).toBe(
      '/base/'
    );
  });

  it('prepends plan base paths and non-primary locales', () => {
    expect(prependPlanAndLocale(mockPlanWithBase, '/pasta/please', 'it')).toBe(
      '/it/base/pasta/please'
    );
    expect(prependPlanAndLocale(mockPlanWithBase, '/fi/base/', 'fi')).toBe(
      '/fi/base/'
    );
  });
});
