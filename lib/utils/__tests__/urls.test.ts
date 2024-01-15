import { stripSlashes } from '../urls';

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
