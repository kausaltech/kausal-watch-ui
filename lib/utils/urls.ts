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
