import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { useTheme } from 'common/theme';

const camelToKebabCase = (s) => s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const AVAILABLE_ICONS = [
'angle-down.svg',
'angle-left.svg',
'angle-right.svg',
'angle-up.svg',
'arrow-down.svg',
'arrow-left.svg',
'arrow-right.svg',
'arrow-up-down.svg',
'arrow-up.svg',
'bars.svg',
'bullseye.svg',
'calendar.svg',
'chart-line.svg',
'chart-pie.svg',
'check.svg',
'circle-full.svg',
'circle-outline.svg',
'commenting.svg',
'dot-circle.svg',
'exclamation-circle.svg',
'globe.svg',
'heart.svg',
'home.svg',
'link.svg',
'lock.svg',
'pencil.svg',
'scope-global.svg',
'scope-local.svg',
'search.svg',
'sort-down.svg',
'sort-up.svg',
'sort.svg',
'sync.svg',
'tachometer.svg',
'times.svg',
'user.svg',
];

const Icon = (props) => {
  const theme = useTheme();
  const {
    name,
    color,
    width,
    height,
    className,
    alt,
    ...rest
  } = props;

  return (
    <svg className={`icon ${className}`}
         onError={(error) => console.log(error.message)}
         key={`${theme.name}-${name}`}
         style={{width, height}}
         aria-hidden={ alt ? 'false' : 'true' }
         focusable={ alt ? 'true' : 'false' }
    >
      { alt ? <title>{alt}</title> : null}
      <use
        fill={color}
        xlinkHref={`#symbol-icon-${camelToKebabCase(name)}`}
        {...rest} />
    </svg>
  );
}

export const CombinedIconSymbols = () => {
  const theme = useTheme();
  /* Find the correct icon file from static folder for now */
  /* TODO: Get themed icon url from API */
  const iconFileName = camelToKebabCase(theme.combinedIconsFilename);
  const icon = `${theme.iconsUrl}/${iconFileName}.svg`;

  return (
    <SVG
      style={{display: 'none'}}
      src={icon}
    />
  );
}

Icon.defaultProps = {
  name: 'circleOutline',
  color: 'inherit',
  width: '1em',
  height: '1em',
  className: '',
  alt: undefined,
};

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
};

export default React.memo(Icon);
