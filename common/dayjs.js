import dayjs from 'dayjs';

require('dayjs/locale/fi');
require('dayjs/locale/sv');
require('dayjs/locale/en-gb');

const relativeTime = require('dayjs/plugin/relativeTime');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

export default dayjs;
