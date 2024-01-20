import _mockPlan from '@/tests/__mocks__/mock-plan-context.json';
import { PlanContextFragment } from '@/common/__generated__/graphql';
import { isAbsoluteUrl, stripLocaleAndPlan, stripSlashes } from '../urls';

const mockPlan = _mockPlan as PlanContextFragment;

describe('isAbsoluteUrl', () => {
  it('returns true for absolute URLs', () => {
    const tests = [
      'http://foo.com',
      'HTTP://FOO.COM',
      'https://www.kausal.tech',
      'ftp://shabba.com/foo.txt',
      '//cdn.kausal.tech/foo.js',
    ];

    tests.map((test) => expect(isAbsoluteUrl(test)).toBe(true));
  });

  it('returns false for relative URLs', () => {
    const tests = ['/foo/bar/', 'foo/bar', '/foo', 'foo'];

    expect(isAbsoluteUrl('/foo/bar/')).toBe(false);

    // tests.map((test) => expect(isAbsoluteUrl(test)).toBe(false));
  });
});

describe('stripLocaleAndPlan', () => {
  const BASE_PATH = 'base';
  const mockPlanWithBase = {
    ...mockPlan,
    domain: { ...mockPlan.domain, basePath: BASE_PATH, id: 'domain' },
  };

  it('strips the passed locale', () => {
    expect(stripLocaleAndPlan(mockPlan, 'en', '/en/foo')).toBe('foo');
    expect(stripLocaleAndPlan(mockPlan, 'es-US', 'es-US/foo/bar')).toBe(
      'foo/bar'
    );
  });

  it('does not strip different locales', () => {
    expect(stripLocaleAndPlan(mockPlan, 'en', '/es-US/foo')).toBe('es-US/foo');
  });

  it('strips the plan', () => {
    expect(
      stripLocaleAndPlan(mockPlanWithBase, 'en', `/fi/${BASE_PATH}/froyo/yoyo`)
    ).toBe('fi/froyo/yoyo');
    expect(
      stripLocaleAndPlan(mockPlanWithBase, 'en', `/${BASE_PATH}/ice-cream`)
    ).toBe('ice-cream');
    expect(stripLocaleAndPlan(mockPlanWithBase, 'en', `/${BASE_PATH}`)).toBe(
      ''
    );
  });

  it('strips both the plan and locale', () => {
    expect(
      stripLocaleAndPlan(
        mockPlanWithBase,
        'fi',
        `/fi/${BASE_PATH}/peruna/salaatti`
      )
    ).toBe('peruna/salaatti');
    expect(
      stripLocaleAndPlan(mockPlanWithBase, 'de-CH', `/de-CH/${BASE_PATH}/`)
    ).toBe('');
  });
});

describe('stripSlashes', () => {
  it('strips both leading and trailing slashes by default', () => {
    expect(stripSlashes('/')).toBe('');
    expect(stripSlashes('/foobar/')).toBe('foobar');
    expect(stripSlashes('foobar/')).toBe('foobar');
    expect(stripSlashes('/foobar/lorem/')).toBe('foobar/lorem');
    expect(stripSlashes('https://www.foobar.com/foobar/lorem/')).toBe(
      'https://www.foobar.com/foobar/lorem'
    );
  });

  it('strips leading slashes', () => {
    const config = { leading: true };
    expect(stripSlashes('/', config)).toBe('');
    expect(stripSlashes('foobar/', config)).toBe('foobar/');
    expect(stripSlashes('/foobar/lorem', config)).toBe('foobar/lorem');
    expect(stripSlashes('https://www.foobar.com/foobar/lorem/', config)).toBe(
      'https://www.foobar.com/foobar/lorem/'
    );
  });

  it('strips trailing slashes', () => {
    const config = { trailing: true };
    expect(stripSlashes('/', config)).toBe('');
    expect(stripSlashes('foobar/', config)).toBe('foobar');
    expect(stripSlashes('foobar/lorem', config)).toBe('foobar/lorem');
    expect(stripSlashes('https://www.foobar.com/foobar/lorem/', config)).toBe(
      'https://www.foobar.com/foobar/lorem'
    );
  });
});
