import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';

const BadgeWrapper = styled.a`
  &.lg {
    font-size: ${(props) => props.theme.fontSizeLg};
  }
`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.badgeBackground} !important;
  color: ${(props) => props.theme.badgeColor};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  margin-bottom: ${(props) => props.theme.spaces.s050};
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
  white-space: normal;
  text-align: left;

  &.bg-secondary:hover {
    background-color:  ${(props) => lighten(0.05, props.theme.badgeBackground)} !important;
    color: ${(props) => props.theme.badgeColor};
  }
`;

const BadgeTooltip = React.forwardRef(function BadgeTooltip(props, ref) {
  const {
    abbreviation,
    name,
    size,
    id,
    href,
    ariaLabel,
  } = props;

  const badgeId = id.replace(/[: ]/g, '_');
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <BadgeWrapper
      className={size}
      href={href}
      id={badgeId}
      aria-label={ariaLabel}
      ref={ref}
    >
      <StyledBadge>
        {abbreviation || name}
      </StyledBadge>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target={badgeId}
        toggle={toggle}
      >
        {name}
      </Tooltip>
    </BadgeWrapper>
  );
});

BadgeTooltip.defaultProps = {
  size: 'md',
};

BadgeTooltip.propTypes = {
  abbreviation: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
BadgeTooltip.defaultProps = {
  ariaLabel: null,
  abbreviation: null,
  href: null,
};

export default BadgeTooltip;
