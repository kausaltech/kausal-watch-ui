import React from 'react';
import PropTypes from 'prop-types';
import helsinkiLogo from 'hel-icons/dist/shapes/helsinki-logo.svg';
import globe from 'hel-icons/dist/shapes/globe.svg';
import check from 'hel-icons/dist/shapes/check.svg';
import pencil from 'hel-icons/dist/shapes/pencil.svg';
import angleUp from 'hel-icons/dist/shapes/angle-up.svg';
import angleDown from 'hel-icons/dist/shapes/angle-down.svg';
import times from 'hel-icons/dist/shapes/times.svg';
import commenting from 'hel-icons/dist/shapes/commenting-o.svg';
import arrowRight from 'hel-icons/dist/shapes/arrow-right.svg';
import exclamationCircle from './icons/exclamation-circle.svg';
import chartPie from './icons/chart-pie.svg';
import chartLine from './icons/chart-line.svg';

const icons = {
  helsinkiLogo,
  globe,
  check,
  pencil,
  angleUp,
  angleDown,
  times,
  commenting,
  arrowRight,
  exclamationCircle,
  chartPie,
  chartLine,
};

class Icon extends React.Component {
  static defaultProps = {
    name: 'helsinkiLogo',
    color: 'inherit',
    width: '1em',
    height: '1em',
    className: '',
  }

  render() {
    const {
      name,
      color,
      width,
      height,
      className,
      ...rest
    } = this.props;
    const IconStyled = icons[name];

    return (
      <IconStyled className={`icon ${className}`} style={{ width, height, fill: color }} {...rest} />
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
