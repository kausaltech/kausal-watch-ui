import { getMatomoConfig } from '../MatomoAnalytics';

describe('getMatomoConfig', () => {
  it('uses the standard entry points at the root of a Matomo instance', () => {
    expect(getMatomoConfig('https://matomo.example.com?1')).toEqual({
      scriptUrl: 'https://matomo.example.com/matomo.js',
      trackerUrl: 'https://matomo.example.com/matomo.php',
      siteId: '1',
    });
  });

  it('uses the js/ entry points when the base URL ends in /js', () => {
    expect(getMatomoConfig('https://webanalytics.digiaiiris.com/js?1318')).toEqual({
      scriptUrl: 'https://webanalytics.digiaiiris.com/js/piwik.min.js',
      trackerUrl: 'https://webanalytics.digiaiiris.com/js/tracker.php',
      siteId: '1318',
    });
  });

  it('ignores a trailing slash on the base URL', () => {
    expect(getMatomoConfig('https://webanalytics.digiaiiris.com/js/?1318')?.scriptUrl).toBe(
      'https://webanalytics.digiaiiris.com/js/piwik.min.js'
    );
  });

  it('returns null without a site ID', () => {
    expect(getMatomoConfig('https://webanalytics.digiaiiris.com/js/1318')).toBeNull();
    expect(getMatomoConfig(undefined)).toBeNull();
  });
});
