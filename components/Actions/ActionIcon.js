import React from 'react';

import HelIcon from '../common/HelIcon';


class ActionIcon extends React.Component {
  render() {
    const actionIcons = {
      0: 'bars',
      58: 'home',
      59: 'sync',
      64: 'heart-o',
      67: 'globe',
      68: 'pencil',
      69: 'map',
      73: 'share-alt',
      75: 'sync',
      77: 'smile-o',
    };

    return (
      <HelIcon iconName={actionIcons[this.props.category]} />
    );
  }
}

export default ActionIcon;
