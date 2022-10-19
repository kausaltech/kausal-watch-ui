import React, { ForwardedRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';

const BadgeWrapper = styled.a<{ref: React.Ref<HTMLAnchorElement>}>`
  &.lg {
    font-size: ${(props) => props.theme.fontSizeLg};
  }
  &.md {
    font-size: ${(props) => props.theme.fontSizeMd};
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
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &.bg-secondary:hover {
    background-color:  ${(props) => lighten(0.05, props.theme.badgeBackground)} !important;
    color: ${(props) => props.theme.badgeColor};
  }
`;

type BadgeTooltipProps = {
  abbreviation?: string,
  name: string,
  size?: 'lg' | 'md',
  id: string,
  href: string,
  ariaLabel: string,
}
const BadgeTooltip = React.forwardRef(function BadgeTooltip(
  props: BadgeTooltipProps, ref: ForwardedRef<HTMLAnchorElement>
) {
  const {
    abbreviation,
    name,
    size = 'md',
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
      { abbreviation &&
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={badgeId}
          toggle={toggle}
        >
          {name}
        </Tooltip>
      }
    </BadgeWrapper>
  );
});

BadgeTooltip.defaultProps = {
  size: 'md',
};

export default BadgeTooltip;
