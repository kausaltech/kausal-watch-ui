import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Icon from '../common/Icon'

const ImpactIcon = styled(Icon)`
  font-size: 1.5em;

  &.icon-on {
    fill: ${props => props.theme.brandDark} !important;
  }

  &.icon-off {
    fill: ${props => props.theme.themeColors.light} !important;
  }

  &.icon-bad {
    fill: ${props => props.theme.themeColors.danger} !important;
  }
`;

function ActionImpact(props) {
  const { identifier, name } = props;
  const max = 5;
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

  return (
    <div>
      {bullets.map((item) => {
        if (item.type === 'bad')
          return <ImpactIcon key={item.key} name="exclamationCircle" className="icon-bad" />
        else if (item.type === 'off')
          return <ImpactIcon key={item.key} name="circleOutline" className="icon-off" />
        else if (item.type === 'on')
          return <ImpactIcon key={item.key} name="circleFull" className="icon-on" />
      })}
      <h6>
        {name}
        {' '}
        vaikutus
      </h6>
    </div>
  )
}

ActionImpact.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default ActionImpact
