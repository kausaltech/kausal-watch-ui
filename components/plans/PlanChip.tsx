import React from 'react';
import { transparentize } from 'polished';
import styled from 'styled-components';
import { Theme } from '@kausal/themes/types';

const Tag = styled.div<{ $minWidth: string }>`
  display: flex;
  align-items: center;
  min-width: ${(props) => props.$minWidth};
  max-width: 600px;
  border-radius: 4px;
`;

type PlanAvatarProps = {
  size: keyof Theme['spaces'];
};

const PlanAvatar = styled.img<PlanAvatarProps>`
  display: block;
  width: ${(props) => props.theme.spaces[props.size]};
  height: ${(props) => props.theme.spaces[props.size]};
  margin: 0
    ${(props) =>
      props.size === 's300'
        ? props.theme.spaces.s100
        : props.theme.spaces.s050};
  border-radius: 50%;
  box-shadow: 0 0 3px 1px
    ${(props) => transparentize(0.8, props.theme.themeColors.black)};
`;

const PlanName = styled.div<{ $negative?: boolean }>`
  flex-grow: 1;
  color: ${(props) =>
    props.$negative
      ? props.theme.themeColors.light
      : props.theme.themeColors.dark};
  line-height: 1.2;
`;

const PlanTitle = styled.div<{
  $size: string;
  $weight: 'fontWeightNormal' | 'fontWeightBold';
}>`
  font-size: ${(props) => props.theme[props.$size]};
  font-weight: ${(props) => props.theme[props.$weight]};
  line-height: 1.2;
`;

const PlanOrg = styled.div<{ $negative?: boolean }>`
  font-size: 75%;
  font-weight: ${(props) => props.theme.fontWeightNormal};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  color: ${(props) =>
    props.$negative
      ? props.theme.graphColors.grey030
      : props.theme.graphColors.grey070};
`;

type PlanChipProps = {
  planImage?: string;
  planShortName: string;
  organization: string;
  size: 'xs' | 'sm' | 'md' | 'lg';
  negative?: boolean;
};

const IMAGE_SIZES = {
  xs: 's100',
  sm: 's100',
  md: 's200',
  lg: 's300',
};

const FONT_SIZES = {
  xs: 'fontSizeSm',
  sm: 'fontSizeSm',
  md: 'fontSizeSm',
  lg: 'fontSizeMd',
};

const MIN_WIDTH = {
  xs: '80px',
  sm: '200px',
  md: '200px',
  lg: '240px',
};

const PlanChip = React.forwardRef<HTMLDivElement, PlanChipProps>(
  (props, ref) => {
    const {
      planImage,
      planShortName,
      organization,
      size = 'md',
      negative = false,
    } = props;

    return (
      <Tag ref={ref} $minWidth={MIN_WIDTH[size]}>
        <PlanAvatar
          src={
            planImage ?? '/static/themes/default/images/default-avatar-org.png'
          }
          size={IMAGE_SIZES[size]}
          alt=""
        />
        <PlanName $negative={negative}>
          <PlanTitle
            $weight={size === 'sm' ? 'fontWeightNormal' : 'fontWeightBold'}
            $size={FONT_SIZES[size]}
          >
            {planShortName}
          </PlanTitle>
          <PlanOrg $negative={negative}>{organization}</PlanOrg>
        </PlanName>
      </Tag>
    );
  }
);

PlanChip.displayName = 'PlanChip';

export default PlanChip;
