import React from 'react';

import { readableColor, shade } from 'polished';
import { Button, TooltipTrigger } from 'react-aria-components';
import SVG from 'react-inlinesvg';
import { Badge } from 'reactstrap';
import styled from 'styled-components';

import Tooltip from './Tooltip';

const WrapperButton = styled(Button)<{ $isLink: boolean }>`
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: ${({ $isLink }) => ($isLink ? 'pointer' : 'default')};
`;

const StyledBadge = styled(Badge)<{
  $themeColor: ThemeColorOption;
  $isLink: boolean;
  $color?: string;
}>`
  cursor: ${(props) => (props.$isLink ? 'pointer' : 'default')};
  background-color: ${(props) => props.theme[props.$themeColor]} !important;
  color: ${(props) =>
    readableColor(
      props.theme[props.$themeColor],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-left: ${(props) =>
    props.$color ? `calc(${props.theme.badgeBorderRadius} + 4px) solid ${props.$color}` : 'none'};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding-top: ${(props) => props.theme.badgePaddingY};
  padding-bottom: ${(props) => props.theme.badgePaddingY};
  padding-left: ${(props) => props.theme.badgePaddingX};
  padding-right: ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  line-height: ${(props) => props.theme.lineHeightMd};
  max-width: 100%;
  overflow-wrap: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &:hover {
    background-color: ${(props) =>
      props.$isLink && shade(0.05, props.theme[props.$themeColor])} !important;
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

const IconBadge = styled.div<{ $themeColor: ThemeColorOption; $isLink: boolean; $color?: string }>`
  overflow: hidden;
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.$color || props.theme[props.$themeColor]} !important;
  color: ${(props) =>
    readableColor(
      props.$color || props.theme[props.$themeColor],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  cursor: ${(props) => (props.$isLink ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props) =>
      props.$isLink && shade(0.05, props.$color || props.theme[props.$themeColor])} !important;
  }
`;

const IconImage = styled.div<{ $imageSrc?: string }>`
  display: block;
  text-align: center;
  height: ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
  flex: 0 0 ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
  margin-right: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  ${(props) => !!props.$imageSrc && `background-image: url(${props.$imageSrc});`};
  background-size: cover;
  background-position: center center;
  min-width: ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
`;

const IconSvg = styled(SVG)<{ $bgcolor?: string; $themeColor: string }>`
  height: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s050};

  &,
  path,
  stroke {
    fill: ${(props) =>
      readableColor(
        props.$bgcolor || props.theme[props.$themeColor],
        props.theme.brandDark,
        props.theme.themeColors.white
      )} !important;
  }
`;

const IconName = styled.div`
  padding: ${({ theme }) =>
    `${theme.spaces.s050} ${theme.spaces.s100} ${theme.spaces.s050} ${theme.spaces.s050}`};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

type ThemeColorOption = 'badgeColor' | 'brandDark' | 'brandLight' | 'neutralDark' | 'neutralLight';
interface BadgeContentProps {
  content: string | React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
  ariaLabel?: string;
  iconSvg?: string;
  iconImage?: string;
  themeColor?: ThemeColorOption;
  color?: string;
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
    themeColor = 'badgeColor',
    color,
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
      $themeColor={themeColor}
      $isLink={isLink}
      $color={color}
    >
      {renderContent}
    </StyledBadge>
  ) : (
    <IconBadge $themeColor={themeColor} $isLink={isLink} $color={color}>
      {iconSvg ? (
        <IconImage>
          <IconSvg
            $bgcolor={color}
            $themeColor={themeColor}
            src={iconSvg}
            preserveAspectRatio="xMinYMid meet"
          />
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

  if (!badgeContentProps.isLink && !tooltip) {
    return (
      <span id={badgeId}>
        <BadgeContent {...badgeContentProps} />
      </span>
    );
  }

  return (
    <span id={badgeId}>
      <TooltipTrigger>
        <WrapperButton $isLink={badgeContentProps.isLink}>
          <BadgeContent {...badgeContentProps} />
        </WrapperButton>
        {tooltip && <Tooltip>{tooltip}</Tooltip>}
      </TooltipTrigger>
    </span>
  );
};

export default BadgeTooltip;
