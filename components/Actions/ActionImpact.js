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
  const { identifier, name } = props
  const max = 5
  const [impact] = useState([])

  if (Number(identifier) < 0) {
    impact.push(-1)
  } else {
    for (let x = 0; x < max; x += 1) {
      if (x < Number(identifier)) impact.push(1)
      if (x >= Number(identifier)) impact.push(0)
    }
  }

  return (
    <div>
      {impact.map((item) => (
        <>
          {item < 0 && <ImpactIcon name="exclamationCircle" className="icon-bad" />}
          {item === 0 && <ImpactIcon name="circleOutline" className="icon-off" />}
          {item > 0 && <ImpactIcon name="circleFull" className="icon-on" />}
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
