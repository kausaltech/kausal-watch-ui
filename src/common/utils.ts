/* Common utility functions */

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const MAX_WORDS_PER_LINE = 2;
const MIN_CHARACTERS_PER_WORD = 4;

export function splitLines(text: string, lineSeparator = '<br>') {
  if (text == null || typeof text != 'string') {
    return text;
  }
  const words = text.split(/\s+/);
  if (words.length === 1) {
    return text;
  }
  const lines: string[][] = [];
  let line: string[] = [];
  for (const word of words) {
    line.push(word);
    if (
      line.filter((w) => w.length >= MIN_CHARACTERS_PER_WORD).length === MAX_WORDS_PER_LINE ||
      word === words[words.length - 1]
    ) {
      lines.push(line);
      line = [];
    }
  }

  return lines.map((l) => l.join(' ')).join(lineSeparator);
}

export const stripTrailingSlash = (path: string) => path.replace(/\/$/, '');

export function excludeNullish<T>(array: T[]): NonNullable<T>[] {
  return array.filter((item) => item !== null && item !== undefined) as NonNullable<T>[];
}

export function typenameMatches<T extends { __typename: string }, U extends T['__typename'][]>(
  item: T,
  ...typenames: U
): item is T & { __typename: U[number] } {
  return typenames.includes(item.__typename as U[number]);
}
