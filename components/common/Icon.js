import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { withTheme } from 'styled-components';

function Icon(props) {
  const {
    theme,
    name,
    color,
    width,
    height,
    className,
    ...rest
  } = props;

  /* Find the correct icon file from static folder for now */
  /* TODO: Get themed icon url from API */
  const iconFileName = name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  const icon = `${theme.iconsUrl}/${iconFileName}.svg`;

  return (
    <SVG
      src={icon}
      onError={(error) => console.log(error.message)}
      className={`icon ${className}`}
      style={{ width, height, fill: color }}
      key={`${theme.name}-${name}`}
      {...rest}
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
  theme: PropTypes.shape({}).isRequired,
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default withTheme(React.memo(Icon));
