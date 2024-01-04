import dayjs from 'dayjs';

// TODO: Switch tot imports

require('dayjs/locale/fi');
require('dayjs/locale/sv');
require('dayjs/locale/en-gb');
require('dayjs/locale/en-au');
require('dayjs/locale/de');
require('dayjs/locale/es');

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(isSameOrAfter);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default dayjs;
