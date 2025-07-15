// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getEslintConfig } from './kausal_common/configs/eslint.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getEslintConfig(__dirname);

export default config;
