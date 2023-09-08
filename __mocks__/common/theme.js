import defaultTheme from '@kausal/themes/dist/themes/default/theme';

const theme = jest.mock('common/theme');

theme.themeProp = {};
theme.useTheme = jest.fn(() => defaultTheme);

module.exports = theme;
