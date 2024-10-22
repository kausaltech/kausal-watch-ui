import { customAlphabet } from 'nanoid';

const NANOID_ALPHABET = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz';

export const nanoid = customAlphabet(NANOID_ALPHABET, 8);
