import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../common/Icon';

const ImpactIcon = styled(Icon)`
  font-size: ${(props) => {
    switch (props.$size) {
      case 'sm':
        return '.8em';
      case 'md':
        return '1.5em';
      default:
        return '1.5em';
    }
  }};

  &.icon-on {
    fill: ${(props) => props.theme.phaseTimelineColor} !important;
  }

  &.icon-off {
    fill: ${(props) => props.theme.themeColors.light} !important;
  }

  &.icon-bad {
    fill: ${(props) => props.theme.graphColors.red070} !important;
  }
`;

function ActionImpact({ identifier, name, max = 4, size = 'md' }) {
  const bullets = [];
  const num = Number(identifier);

  if (num < 0) {
    bullets.push({ type: 'bad', key: '0-bad' });
  } else {
    for (let x = 0; x < max; x += 1) {
      if (x < num) bullets.push({ type: 'on', key: `${x}-on` });
      else if (x >= num) bullets.push({ type: 'off', key: `${x}-off` });
    }
  }

  const impactVisual = bullets.map((item) => {
    switch (item.type) {
      case 'bad':
        return (
          <ImpactIcon
            key={item.key}
            name="exclamation-circle"
            className="icon-bad"
            $size={size}
          />
        );
      case 'off':
        return (
          <ImpactIcon
            key={item.key}
            name="circle-full"
            className="icon-off"
            $size={size}
          />
        );
      case 'on':
        return (
          <ImpactIcon
            key={item.key}
            name="circle-full"
            className="icon-on"
            $size={size}
          />
        );
      default:
        return null;
    }
  });

  return (
    <div>
      <div className="d-flex">
        {impactVisual}
        <strong className="ml-2">{name}</strong>
      </div>
    </div>
  );
}

ActionImpact.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  max: PropTypes.number,
  size: PropTypes.string,
};

export default ActionImpact;
