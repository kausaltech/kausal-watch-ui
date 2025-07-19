import { stripTrailingSlash } from '@/common/utils';

describe('stripTrailingSlash', () => {
  it('strips trailing slashes', () => {
    expect(stripTrailingSlash('/')).toBe('');
    expect(stripTrailingSlash('foobar/')).toBe('foobar');
    expect(stripTrailingSlash('foobar/lorem')).toBe('foobar/lorem');
    expect(stripTrailingSlash('https://www.foobar.com/foobar/lorem/')).toBe(
      'https://www.foobar.com/foobar/lorem'
    );
  });
});
