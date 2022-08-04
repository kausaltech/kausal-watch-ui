import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { useTheme } from 'common/theme';

const camelToKebabCase = (s) => s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const Icon = (props) => {
  const theme = useTheme();
  const {
    name,
    color,
    width,
    height,
    className,
    ...rest
  } = props;

  return (
    <svg className={`icon ${className}`}
         onError={(error) => console.log(error.message)}
         key={`${theme.name}-${name}`}
         style={{width, height}}>
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
};

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default React.memo(Icon);
