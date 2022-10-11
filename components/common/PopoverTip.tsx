import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Tooltip } from 'reactstrap';

const InfoButton = styled(Button)`
  padding: 0 .5rem .1rem;
  line-height: .5rem;
  opacity: .5;
  svg {
    fill: ${(props) => props.invert === 'true'
      ? props.theme.themeColors.white
      : props.theme.themeColors.black};
  }

  &:hover {
    opacity: 1;
  }
`;

/* TODO: make this accessible */
/* TODO: Use icon from theme */
type PopoverTipProps = {
  content: string,
  identifier: string,
  invert?: boolean,
}

const PopoverTip = (props :PopoverTipProps) => {
  const { content, identifier, invert = false } = props;
  const id = `tt-${identifier}`
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <InfoButton
        id={id}
        color="link"
        invert={invert.toString()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          className="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      </InfoButton>
      <Tooltip
        target={id}
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        toggle={toggle}
      >
        { content }
      </Tooltip>
    </>
  );
};

export default PopoverTip;
