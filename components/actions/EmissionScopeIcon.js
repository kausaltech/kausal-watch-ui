import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'reactstrap';
import styled from 'styled-components';
import Icon from '../common/Icon';

const IconContainer = styled.a`
  display: inline-block;
  margin-right: 0.5em;
`;

const EmissionScopeIcon = (props) => {
  const { category, color, size } = props;
  const { id, identifier, name, shortDescription } = category;
  const iconId = `em-sc-${id}`;
  const fade = false;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  function mapIcon(scope) {
    // TODO: move scope -> icon mapping somewhere else
    // TODO: use (create) more fitting icons
    switch (scope) {
      case 'scope1_2':
        return 'home';
      case 'scope3':
        return 'globe';
      default:
        return 'circleOutline';
    }
  };

  return (
    <IconContainer
      id={iconId}
      style={{ width: size, height: size }}
      href="#"
    >
      <span className="sr-only">
        {name}
        {shortDescription}
      </span>
      <Icon name={mapIcon(identifier)} color={color} width={size} height={size} />
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={iconId}
        toggle={toggle}
        fade={fade}
        innerClassName="emission-scope-icon-tooltip"
        trigger="focus hover click"
      >
        <strong>{name}</strong><br/>
        {shortDescription}
      </Tooltip>
    </IconContainer>
  );
}

EmissionScopeIcon.propTypes = {
  category: PropTypes.shape({}).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default EmissionScopeIcon;
