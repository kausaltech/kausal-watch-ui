type StripSlashConfig = {
  leading?: boolean;
  trailing?: boolean;
};

/**
 * Strips slashes from a URL path. By default both leading and trailing
 * slashes are removed, specify leading or trailing booleans in the config
 * to only strip one of them.
 */
export function stripSlashes(path: string, config?: StripSlashConfig) {
  if (config?.leading && !config.trailing) {
    return path.replace(/^\//, '');
  }

  if (config?.trailing && !config.leading) {
    return path.replace(/\/$/, '');
  }

  return path.replace(/^\/|\/$/g, '');
}

/**
 * Matches absolute URLs e.g. https://foo.com/
 */
export const isAbsoluteUrl = (url: string) => !!url.match(/^(?:[a-z+]+:)?\/\//i);

export function stripLocaleAndPlan(
  plan: { domain?: { basePath?: string | null } | null },
  locale: string,
  pathname: string
) {
  return stripSlashes(pathname)
    .split('/')
    .filter((part, i) => {
      const isLocalePosition = i === 0;
      const isPlanPosition = i === 0 || i === 1;

      return !(
        (part === locale && isLocalePosition) ||
        (plan.domain &&
          plan.domain?.basePath &&
          stripSlashes(plan.domain.basePath) === part &&
          isPlanPosition)
      );
    })
    .join('/');
}
