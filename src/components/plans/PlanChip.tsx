import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { Theme } from '@kausal/themes/types';
import { transparentize } from 'polished';

import { getThemeStaticURL } from '@common/themes/theme';

const Tag = styled.div<{ $minWidth: string; $link?: boolean; $size: string }>`
  display: flex;
  align-items: flex-start;
  min-width: ${(props) => props.$minWidth};
  max-width: 600px;
  padding: ${(props) => (props.$size === 'lg' ? props.theme.spaces.s050 : 0)};

  ${(props) =>
    props.$link === true &&
    `
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `}
`;

type PlanAvatarProps = {
  size: keyof Theme['spaces'];
};

const PlanAvatar = styled.img<PlanAvatarProps>`
  display: block;
  width: ${(props) => props.theme.spaces[props.size]};
  height: ${(props) => props.theme.spaces[props.size]};
  object-fit: cover;
  margin: 0
    ${(props) => (props.size === 's400' ? props.theme.spaces.s100 : props.theme.spaces.s050)} 0 0;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px ${(props) => transparentize(0.9, props.theme.themeColors.black)};
`;

const PlanName = styled.div<{ $negative?: boolean }>`
  flex-grow: 1;
  color: ${(props) =>
    props.$negative ? props.theme.themeColors.light : props.theme.themeColors.dark};
  line-height: 1.2;
`;

const PlanTitle = styled.div<{
  $size: 'fontSizeSm' | 'fontSizeMd';
  $weight: 'fontWeightNormal' | 'fontWeightBold';
}>`
  font-size: ${(props) => props.theme[props.$size]};
  font-weight: ${(props) => props.theme[props.$weight]};
  line-height: ${(props) => props.theme.lineHeightSm};
  margin-bottom: ${(props) => props.theme.spaces.s050};
`;

const PlanOrg = styled.div<{ $negative?: boolean }>`
  font-size: 75%;
  font-weight: ${(props) => props.theme.fontWeightNormal};
  font-family: ${(props) => `${props.theme.fontFamilyContent}, ${props.theme.fontFamilyFallback}`};
  color: ${(props) =>
    props.$negative ? props.theme.graphColors.grey020 : props.theme.graphColors.grey070};
`;

interface PlanChipProps {
  /**
   * Path to plan image
   */
  planImage?: string;
  /**
   * Short name of the plan
   */
  planShortName?: string;
  /**
   * Organization name
   */
  organization?: string;
  /**
   * Chip size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Is this a negative variant?
   */
  negative?: boolean;
  /**
   * Should this chip be a link?
   */
  link?: boolean;
}

const IMAGE_SIZES = {
  xs: 's100',
  sm: 's100',
  md: 's200',
  lg: 's400',
} satisfies Record<NonNullable<PlanChipProps['size']>, keyof Theme['spaces']>;

const FONT_SIZES = {
  xs: 'fontSizeSm',
  sm: 'fontSizeSm',
  md: 'fontSizeSm',
  lg: 'fontSizeMd',
} satisfies Record<NonNullable<PlanChipProps['size']>, 'fontSizeSm' | 'fontSizeMd'>;

const MIN_WIDTH = {
  xs: '80px',
  sm: '200px',
  md: '200px',
  lg: '240px',
};

const PlanChip = React.forwardRef<HTMLDivElement, PlanChipProps>((props, ref) => {
  const {
    planImage,
    planShortName,
    organization,
    size = 'md',
    negative = false,
    link = false,
  } = props;
  const theme = useTheme();
  const avatarOnly = !planShortName && !organization;
  return (
    <Tag
      ref={ref}
      $minWidth={avatarOnly ? 'auto' : MIN_WIDTH[size]}
      $link={link ? true : undefined}
      $size={size}
    >
      <PlanAvatar
        src={planImage ?? getThemeStaticURL(theme.defaultAvatarOrgImage)}
        size={IMAGE_SIZES[size]}
        alt=""
      />
      {!avatarOnly ? (
        <PlanName $negative={negative}>
          <PlanTitle
            $weight={size === 'sm' ? 'fontWeightNormal' : 'fontWeightBold'}
            $size={FONT_SIZES[size]}
          >
            {planShortName}
          </PlanTitle>
          <PlanOrg $negative={negative}>{organization}</PlanOrg>
        </PlanName>
      ) : null}
    </Tag>
  );
});

PlanChip.displayName = 'PlanChip';

export default PlanChip;
