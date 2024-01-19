import { isAbsoluteUrl, stripSlashes } from '../urls';

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
