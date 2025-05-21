import React from 'react';
import { Badge } from 'reactstrap';
import SVG from 'react-inlinesvg';
import { Button, TooltipTrigger } from 'react-aria-components';
import styled from 'styled-components';

import Tooltip from './Tooltip';
import { shade, readableColor } from 'polished';

const WrapperButton = styled(Button)`
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
`;

const StyledBadge = styled(Badge)<{ color: string; $isLink: boolean }>`
  background-color: ${(props) => props.theme[props.color]} !important;
  color: ${(props) =>
    readableColor(
      props.theme[props.color],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding-top: ${(props) => props.theme.badgePaddingY};
  padding-bottom: ${(props) => props.theme.badgePaddingY};
  padding-left: ${(props) => props.theme.badgePaddingX};
  padding-right: ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  line-height: 1.5;
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &:hover {
    background-color: ${(props) =>
      props.$isLink && shade(0.05, props.theme[props.color])} !important;
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

const TruncatedContent = styled.span<{ $maxLines: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $maxLines }) => $maxLines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const IconBadge = styled.div<{ color: string; $isLink: boolean }>`
  overflow: hidden;
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.theme[props.color]} !important;
  color: ${(props) =>
    readableColor(
      props.theme[props.color],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};

  &:hover {
    background-color: ${(props) =>
      props.$isLink && shade(0.05, props.theme[props.color])} !important;
  }
`;

const IconImage = styled.div<{ $imageSrc?: string }>`
  display: block;
  text-align: center;
  height: ${(props) =>
    props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  flex: 0 0
    ${(props) =>
      props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  margin-right: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  ${(props) =>
    !!props.$imageSrc && `background-image: url(${props.$imageSrc});`};
  background-size: cover;
  background-position: center center;
  min-width: ${(props) =>
    props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
`;

const IconSvg = styled(SVG)<{ $color?: string }>`
  height: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s050};
  fill: ${(props) => props.$color || props.theme.brandDark} !important;
  path,
  stroke {
    fill: ${(props) => props.$color || props.theme.brandDark} !important;
  }
`;

const IconName = styled.div`
  padding: ${({ theme }) =>
    `${theme.spaces.s050} ${theme.spaces.s100} ${theme.spaces.s050} ${theme.spaces.s050}`};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

interface BadgeContentProps {
  content: string | React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
  ariaLabel?: string;
  iconSvg?: string;
  iconImage?: string;
  color?:
    | 'badgeColor'
    | 'brandDark'
    | 'brandLight'
    | 'neutralDark'
    | 'neutralLight';
  isLink: boolean;
  maxLines?: number;
}

const BadgeContent = (props: BadgeContentProps) => {
  const {
    content,
    size = 'md',
    iconSvg,
    iconImage,
    ariaLabel,
    color = 'badgeColor',
    isLink = false,
    maxLines,
  } = props;
  const hasNoIcon = iconSvg == null && iconImage == null;

  const renderContent = maxLines ? (
    <TruncatedContent $maxLines={maxLines}>{content}</TruncatedContent>
  ) : (
    content
  );

  return hasNoIcon ? (
    <StyledBadge
      className={size}
      aria-label={ariaLabel}
      color={color}
      $isLink={isLink}
    >
      {renderContent}
    </StyledBadge>
  ) : (
    <IconBadge color={color} $isLink={isLink}>
      {iconSvg ? (
        <IconImage>
          <IconSvg src={iconSvg} preserveAspectRatio="xMinYMid meet" />
        </IconImage>
      ) : (
        <IconImage $imageSrc={iconImage} />
      )}
      <IconName>{renderContent}</IconName>
    </IconBadge>
  );
};

export interface BadgeTooltipProps extends BadgeContentProps {
  tooltip?: string;
  id: string;
}

const BadgeTooltip = (props: BadgeTooltipProps) => {
  const { tooltip, id, ...badgeContentProps } = props;
  const badgeId = `btt${id.replace(/[: ]/g, '_')}`;

  return (
    <span id={badgeId}>
      <TooltipTrigger>
        <WrapperButton>
          <BadgeContent {...badgeContentProps} />
        </WrapperButton>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </TooltipTrigger>
    </span>
  );
};

export default BadgeTooltip;
