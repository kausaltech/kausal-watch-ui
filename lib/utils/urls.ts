/**
 * Strips leading and trailing slashes
 */
export function stripSlashes(path: string) {
  return path.replace(/^\/|\/$/g, '');
}
