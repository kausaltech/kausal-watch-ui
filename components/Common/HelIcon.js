import React from 'react';
import helIcons from 'hel-icons/dist/symbol/svg/hel-icons.svg';

class HelIcon extends React.Component {
  render() {
    let iconUrl = `${helIcons}#${this.props.iconName}`;
    let styles = `icon ${this.props.className}`;
    return (
      <svg className={styles} aria-hidden="true"><use xlinkHref={iconUrl}></use></svg>
    );
  }
}

export default HelIcon
