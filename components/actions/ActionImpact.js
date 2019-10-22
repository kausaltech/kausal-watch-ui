import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Icon from '../common/Icon'
import PlanContext from '../../context/plan'
import { withTranslation } from '../../common/i18n'

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
  const plan = React.useContext(PlanContext);
  const { t, identifier, name } = props;
  const max = plan.actionImpacts.reduce((planMax, item) => {
    const val = parseInt(item.identifier, 10);
    if (!planMax || val > planMax) return val;
    return planMax;
  }, null);
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
        return <ImpactIcon key={item.key} name="exclamationCircle" className="icon-bad" />
      case 'off':
        return <ImpactIcon key={item.key} name="circleOutline" className="icon-off" />
      case 'on':
        return <ImpactIcon key={item.key} name="circleFull" className="icon-on" />
      default:
        return null;
    }
  });

  return (
    <div>
      { impactVisual }
      <h6>
        {name}
        {' '}
        { t('impact') }
      </h6>
    </div>
  );
}

ActionImpact.propTypes = {
  identifier: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ActionImpact);
