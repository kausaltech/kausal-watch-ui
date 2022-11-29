import dayjs from 'dayjs';

require('dayjs/locale/fi');
require('dayjs/locale/sv');
require('dayjs/locale/en-gb');
require('dayjs/locale/en-au');
require('dayjs/locale/de');

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const relativeTime = require('dayjs/plugin/relativeTime');
const duration = require('dayjs/plugin/duration');

dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default dayjs;
