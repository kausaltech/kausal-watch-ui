import { type ReactElement, type ReactNode, cloneElement } from 'react';

import styled from '@emotion/styled';

import { readableColor, shade } from 'polished';
import SVG from 'react-inlinesvg';

import { transientOptions } from '@common/themes/styles/styled';

import Tooltip from './Tooltip';

const WrapperButton = styled.button`
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: default;
`;

const StyledBadge = styled.span<{
  $themeColor: ThemeColorOption;
  $isLink: boolean;
  $color?: string;
}>`
  display: inline-block;
  cursor: ${(props) => (props.$isLink ? 'pointer' : 'default')};
  background-color: ${(props) => props.theme[props.$themeColor]} !important;
  color: ${(props) =>
    readableColor(
      props.theme[props.$themeColor],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-left: ${(props) =>
    props.$color
      ? `calc(${props.theme.badgeBorderRadius == '0' ? `4px` : props.theme.badgeBorderRadius} + 4px) solid ${props.$color}`
      : 'none'};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding-top: ${(props) => props.theme.badgePaddingY};
  padding-bottom: ${(props) => props.theme.badgePaddingY};
  padding-left: ${(props) => props.theme.badgePaddingX};
  padding-right: ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  line-height: ${(props) => props.theme.lineHeightSm};
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

// Tall enough that overflow: hidden doesn't clip ascenders/descenders.
const CLAMP_LINE_HEIGHT = 1.3;

const TruncatedContent = styled.span<{
  $maxLines: number;
  $baseLineHeight: 'lineHeightSm' | 'lineHeightMd';
}>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $maxLines }) => $maxLines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: ${CLAMP_LINE_HEIGHT};
  margin: ${({ theme, $baseLineHeight }) =>
    `calc((${theme[$baseLineHeight]} - ${CLAMP_LINE_HEIGHT}) * 0.5em)`}
    0;
`;

const IconBadge = styled.span<{ $themeColor: ThemeColorOption; $isLink: boolean }>`
  overflow: hidden;
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.theme[props.$themeColor]};
  color: ${(props) =>
    readableColor(
      props.theme[props.$themeColor],
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  cursor: ${(props) => (props.$isLink ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props) =>
      props.$isLink && shade(0.05, props.theme[props.$themeColor])} !important;
  }
`;

const IconImage = styled.span<{
  $imageSrc?: string;
  $color?: string;
  $themeColor: ThemeColorOption;
}>`
  display: block;
  text-align: center;
  height: ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
  flex: 0 0 ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
  margin-right: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.$color || props.theme[props.$themeColor]}!important;
  ${(props) => !!props.$imageSrc && `background-image: url(${props.$imageSrc});`};
  background-size: cover;
  background-position: center center;
  min-width: ${(props) => (props.$imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300)};
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
`;

const IconSvg = styled(SVG, transientOptions)<{ $bgcolor?: string; $themeColor: ThemeColorOption }>`
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

const IconName = styled.span`
  display: block;
  padding: ${({ theme }) =>
    `${theme.spaces.s050} ${theme.spaces.s100} ${theme.spaces.s050} ${theme.spaces.s050}`};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightMd};
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

type ThemeColorOption =
  'badgeColor' | 'brandDark' | 'brandLight' | 'neutralDark' | 'neutralLight' | 'badgeColorNeutral';
interface BadgeContentProps {
  content: ReactNode;
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
    <TruncatedContent
      $maxLines={maxLines}
      $baseLineHeight={hasNoIcon ? 'lineHeightSm' : 'lineHeightMd'}
    >
      {content}
    </TruncatedContent>
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
    <IconBadge $themeColor={themeColor} $isLink={isLink}>
      {iconSvg ? (
        <IconImage $color={color} $themeColor={themeColor}>
          <IconSvg
            $bgcolor={color}
            $themeColor={themeColor}
            src={iconSvg}
            preserveAspectRatio="xMinYMid meet"
          />
        </IconImage>
      ) : (
        <IconImage $imageSrc={iconImage} $color={color} $themeColor={themeColor} />
      )}
      <IconName>{renderContent}</IconName>
    </IconBadge>
  );
};

export interface BadgeTooltipProps extends Omit<BadgeContentProps, 'isLink'> {
  tooltip?: string;
  id: string;
  /**
   * A link element to render the badge in, e.g. `<OrganizationLink organizationId={id} />`.
   * The link gets the tooltip, so it is the only interactive element. It must
   * pass its props and ref on to the `<a>`.
   */
  link?: ReactElement<{ children?: ReactNode }>;
}

const BadgeTooltip = (props: BadgeTooltipProps) => {
  const { tooltip, id, link, ...badgeContentProps } = props;
  const badgeId = `btt${id.replace(/[: ]/g, '_')}`;
  const content = <BadgeContent {...badgeContentProps} isLink={!!link} />;

  let trigger: ReactElement | null = null;
  if (link) {
    trigger = cloneElement(link, undefined, content);
  } else if (tooltip) {
    // Focusable, so that keyboard users can open the tooltip.
    trigger = <WrapperButton type="button">{content}</WrapperButton>;
  }

  if (!trigger) {
    return <span id={badgeId}>{content}</span>;
  }

  return (
    <span id={badgeId}>
      {tooltip ? (
        <Tooltip title={tooltip} describeChild>
          {trigger}
        </Tooltip>
      ) : (
        trigger
      )}
    </span>
  );
};

export default BadgeTooltip;
