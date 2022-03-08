import dayjs from 'dayjs';

require('dayjs/locale/fi');
require('dayjs/locale/sv');
require('dayjs/locale/en-gb');
require('dayjs/locale/de');

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default dayjs;
