import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import _uniqueId from 'lodash/uniqueId';

import Icon from './Icon';

const InfoTooltip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const { theme, content } = props;
  const [id] = useState(_uniqueId('tooltip-'));

  return (
    <>
      <span id={id} href="#" style={{ cursor: 'pointer' }}>
        <Icon
          name="infoCircle"
          color={theme.themeColors.info}
          height="0.75em"
        />
      </span>
      <Tooltip
        placement="auto"
        isOpen={tooltipOpen}
        autohide={false}
        target={id}
        toggle={toggle}
      >
        { content }
      </Tooltip>
    </>
  );
};

InfoTooltip.defaultProps = {
  content: '',
};

InfoTooltip.propTypes = {
  content: PropTypes.string,
};

export default withTheme(InfoTooltip);
