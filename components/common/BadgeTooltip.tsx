import React, { useState } from 'react';
import { Badge, Tooltip } from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { shade, readableColor } from 'polished';

const StyledBadge = styled(({isLink, ...rest}) => <Badge {...rest}/>)<{color: string, isLink: boolean}>`
  background-color: ${(props) => props.theme[props.color]} !important;
  color: ${
    (props) => readableColor(props.theme[props.color], props.theme.themeColors.black, props.theme.themeColors.white)
  };
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &:hover {
    background-color:  ${(props) => props.isLink && shade(0.05, props.theme[props.color])} !important;
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

const IconBadge = styled.div<{color: string, isLink: boolean}>`
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.theme[props.color]} !important;
  color: ${
    (props) => readableColor(props.theme[props.color], props.theme.themeColors.black, props.theme.themeColors.white)
  };
  border-radius: ${(props) => props.theme.badgeBorderRadius};

  &:hover {
    background-color: ${(props) => props.isLink && shade(0.05, props.theme[props.color])} !important;
  }
`;

const IconImage = styled.div<{imageSrc?: string}>`
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
`;

type BadgeContentProps = {
  content: string,
  size?: 'lg' | 'md' | 'sm',
  ariaLabel?: string,
  iconSvg?: string,
  iconImage?: string,
  color?: 'brandDark' | 'brandLight'| 'neutralDark'| 'neutralLight',
  isLink: boolean,
}

const BadgeContent = (props: BadgeContentProps) => {
  const { content, size, iconSvg, iconImage, ariaLabel, color, isLink } = props;
  const hasIcon = (iconSvg == null) && (iconImage == null);

  return ( hasIcon ?
    <StyledBadge
      className={size}
      aria-label={ariaLabel}
      color={color}
      isLink={isLink}
    >
      {content}
    </StyledBadge>
    :
    <IconBadge
      color={color}
      isLink={isLink}
    >
      {iconSvg
        ? <IconImage><IconSvg src={iconSvg} preserveAspectRatio="xMinYMid meet" /></IconImage>
        : <IconImage imageSrc={iconImage} />}
      <IconName>{content}</IconName>
    </IconBadge>
  )
};

export type BadgeTooltipProps = {
  content: string,
  tooltip?: string,
  size?: 'lg' | 'md' | 'sm',
  id: string,
  ariaLabel?: string,
  iconSvg?: string,
  iconImage?: string,
  color?: 'brandDark' | 'brandLight'| 'neutralDark'| 'neutralLight',
  isLink: boolean,
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
    color ='brandDark',
    isLink = false
  } = props;
  const badgeId = `btt${id.replace(/[: ]/g, '_')}`;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span id={badgeId}>
      <BadgeContent
        content={content}
        size={size}
        iconSvg={iconSvg}
        iconImage={iconImage}
        ariaLabel={ariaLabel}
        color={color}
        isLink={isLink}
      />
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
    </span>
  );
};

export default BadgeTooltip;
