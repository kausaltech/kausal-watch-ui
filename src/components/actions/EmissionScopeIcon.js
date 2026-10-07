import { useState } from 'react';

import ClickAwayListener from '@mui/material/ClickAwayListener';

import styled from '@emotion/styled';

import PropTypes from 'prop-types';

import Tooltip from '@/components/common/Tooltip';

import Icon from '../common/Icon';

const IconContainer = styled.button`
  display: inline-block;
  margin-right: 0.5em;
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
`;

const EmissionScopeIcon = (props) => {
  const { category, color, size } = props;
  const { id, identifier, name, leadParagraph } = category;
  const iconId = `em-sc-${id}`;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  function mapIcon(scope) {
    // TODO: move scope -> icon mapping somewhere else
    // TODO: use (create) more fitting icons
    switch (scope) {
      case 'scope1_2':
        return 'home';
      case 'scope3':
        return 'globe';
      default:
        return 'circle-outline';
    }
  }

  // Controlled so that a plain tap opens the tooltip on touch devices; MUI's
  // own touch handling only reacts to a long press. Hover and focus still open
  // and close it through onOpen/onClose.
  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <Tooltip
        open={tooltipOpen}
        onOpen={() => setTooltipOpen(true)}
        onClose={() => setTooltipOpen(false)}
        disableTouchListener
        title={
          <>
            <strong>{name}</strong>
            <br />
            {leadParagraph}
          </>
        }
      >
        <IconContainer
          id={iconId}
          type="button"
          style={{ width: size, height: size }}
          onClick={() => setTooltipOpen(true)}
        >
          <span className="visually-hidden">
            {name}
            {leadParagraph}
          </span>
          <Icon name={mapIcon(identifier)} color={color} width={size} height={size} />
        </IconContainer>
      </Tooltip>
    </ClickAwayListener>
  );
};

EmissionScopeIcon.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    leadParagraph: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default EmissionScopeIcon;
