import React from 'react';
import helIcons from 'hel-icons/dist/symbol/svg/hel-icons.svg';

class HelIcon extends React.Component {
  render() {
    const iconUrl = `${helIcons}#${this.props.iconName}`;
    const styles = `icon ${this.props.className}`;
    return (
      <svg className={styles} aria-hidden="true"><use xlinkHref={iconUrl} /></svg>
    );
  }
}

export default HelIcon;
