/* Common utility functions */

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const MAX_WORDS_PER_LINE = 2;
const MIN_CHARACTERS_PER_WORD = 4;

export function splitLines(text, lineSeparator = '<br>') {
  if (text == null || typeof text != 'string') {
    return text;
  }
  const words = text.split(/\s+/);
  if (words.length === 1) {
    return text;
  }
  const lines = [];
  let line = [];
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
