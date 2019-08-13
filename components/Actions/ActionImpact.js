import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Icon from '../Common/Icon'

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
    bullets.push({ type: 'bad', idx: 0 });
  } else {
    for (let x = 0; x < max; x += 1) {
      if (x < num) bullets.push({ type: 'on', idx: x });
      else if (x >= num) bullets.push({ type: 'off', idx: x });
    }
  }

  return (
    <div>
      {bullets.map((item) => (
        <>
          {item.type === 'bad' && <ImpactIcon key={item.idx} name="exclamationCircle" className="icon-bad" />}
          {item.type === 'off' && <ImpactIcon key={item.idx} name="circleOutline" className="icon-off" />}
          {item.type === 'on' && <ImpactIcon key={item.idx} name="circleFull" className="icon-on" />}
        </>
      ))}
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
