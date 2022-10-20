import React, { ForwardedRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Tooltip } from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

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

  &.lg {
    font-size: ${(props) => props.theme.fontSizeMd};
  }
  &.md {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
  &.sm {
    font-size: ${(props) => props.theme.fontSizeSm};
  }
`;

const IconBadge = styled.div`
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.theme.neutralLight} !important;
  border-radius: ${(props) => props.theme.badgeBorderRadius};

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.neutralLight)} !important;
  }
`;

const IconImage = styled.div`
  display: block;
  text-align: center;
  height: ${(props) => props.imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  flex: 0 0 ${(props) => props.imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  margin-right: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  background-image: url(${(props) => props.imageSrc || 'none'});
  background-size: cover;
  background-position: center center;
`;

const IconSvg = styled(SVG)`
  height: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s050};
  fill: ${(props) => props.theme.brandDark};
`;

const IconName = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: black;
`;

const BadgeContent = (props) => {
  const { content, size, iconSvg, iconImage, ariaLabel } = props;
  console.log("badge content", props);
  const hasIcon = (iconSvg == null) && (iconImage == null);

  return ( hasIcon ?
  <StyledBadge
    className={size}
    aria-label={ariaLabel}
  >
    {content}
  </StyledBadge>
  :
  <IconBadge>
    {iconSvg
      ? <IconImage><IconSvg src={iconSvg} preserveAspectRatio="xMinYMid meet" /></IconImage>
      : <IconImage imageSrc={iconImage} />}
    <IconName>{content}</IconName>
  </IconBadge>
  )
};

type BadgeTooltipProps = {
  content: string,
  tooltip?: string,
  size?: 'lg' | 'md' | 'sm',
  id: string,
  href: string,
  ariaLabel: string,
  iconSvg?: string,
  iconImage?: string,
}

const BadgeTooltip = (
  props: BadgeTooltipProps
) => {
  const {
    content,
    tooltip,
    size = 'md',
    id,
    ariaLabel,
    iconSvg = null,
    iconImage = null,
  } = props;
  console.log("badge with tooltip",props);
  const badgeId = `btt${id.replace(/[: ]/g, '_')}`;
  console.log("ID for", content, badgeId);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
        <a id={badgeId}>
          <BadgeContent
            content={content}
            size={size}
            iconSvg={iconSvg}
            iconImage={iconImage}
            ariaLabel={ariaLabel}
          />
        </a>
      { tooltip &&
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={badgeId}
            toggle={toggle}
          >
            {tooltip}
          </Tooltip>
        }
    </>
  );
};

export default BadgeTooltip;
