import React from 'react';

import styled from '@emotion/styled';

import { transientOptions } from '@common/themes/styles/styled';

import Icon from '../common/Icon';

const ImpactIcon = styled(Icon, transientOptions)<{ $size: string }>`
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

interface Props {
  identifier: string;
  name: string;
  max?: number;
  size?: string;
}

function ActionImpact({ identifier, name, max = 4, size = 'md' }: Props) {
  const bullets: { type: string; key: string }[] = [];
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
          <ImpactIcon key={item.key} name="exclamation-circle" className="icon-bad" $size={size} />
        );
      case 'off':
        return <ImpactIcon key={item.key} name="circle-full" className="icon-off" $size={size} />;
      case 'on':
        return <ImpactIcon key={item.key} name="circle-full" className="icon-on" $size={size} />;
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

export default ActionImpact;
