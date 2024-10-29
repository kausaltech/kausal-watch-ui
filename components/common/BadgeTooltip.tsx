import React, { useState } from 'react';
import { Badge, Tooltip } from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { shade, readableColor } from 'polished';

const StyledBadge = styled(({ isLink, ...rest }) => <Badge {...rest} />)<{
  color: string;
  isLink: boolean;
}>`
  background-color: ${(props) => props.theme[props.color]} !important;
  color: ${(props) =>
    readableColor(
      props.theme[props.color],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY}
    ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  line-height: 1.5;
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.isLink && shade(0.05, props.theme[props.color])} !important;
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

const IconBadge = styled.div<{ color: string; isLink: boolean }>`
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
      props.isLink && shade(0.05, props.theme[props.color])} !important;
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

interface BadgeContentProps {
  content: string | React.ReactNode;
  size?: 'lg' | 'md' | 'sm';
  ariaLabel?: string;
  iconSvg?: string;
  iconImage?: string;
  color?: 'brandDark' | 'brandLight' | 'neutralDark' | 'neutralLight';
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
    color = 'brandDark',
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
      isLink={isLink}
    >
      {renderContent}
    </StyledBadge>
  ) : (
    <IconBadge color={color} isLink={isLink}>
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
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span id={badgeId}>
      <BadgeContent
        aria-describedby={`tt-content-${badgeId}`}
        {...badgeContentProps}
      />
      {tooltip && (
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={badgeId}
          toggle={toggle}
          role="tooltip"
          id={`tt-content-${badgeId}`}
        >
          {tooltip}
        </Tooltip>
      )}
    </span>
  );
};

export default BadgeTooltip;
