import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import styled from 'styled-components';

const Icon = styled.span`
  display: inline-block;
  font-family: sans-serif;
  font-size: 1.8em;
  line-height: 0.5;
  position: relative;
  top: 0.15em;
`;

const MQPointIcon = (props) => {
  const {
    id,
    completed,
    style,
    description,
  } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const symbol = completed ? '★' : '☆';
  let className = 'mqpoint-icon';
  if (completed) {
    className += ' completed';
  }
  const icon = <Icon id={id} className={className} style={style}>{symbol}</Icon>;
  if (!description) {
    return icon;
  }
  return (
    <>
      {icon}
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={id}
        toggle={toggle}
        offset="0,10"
        fade={false}
      >
        {description}
      </Tooltip>
    </>
  );
};

MQPointIcon.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string,
  style: PropTypes.object,
};

export default MQPointIcon;

