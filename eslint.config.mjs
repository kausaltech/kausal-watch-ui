// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getEslintConfig } from './kausal_common/configs/eslint.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = getEslintConfig(__dirname);

export default config;
