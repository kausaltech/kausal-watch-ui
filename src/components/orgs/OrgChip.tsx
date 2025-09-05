import React from 'react';

import type { Theme } from '@kausal/themes/types';
import styled from 'styled-components';

const Tag = styled.div`
  display: flex;
  max-width: 600px;
  margin-bottom: ${(props) => props.theme.spaces.s025};
`;

const OrgAvatar = styled.img<{ $size: keyof Theme['spaces'] }>`
  display: block;
  width: ${(props) => props.theme.spaces[props.$size]};
  height: ${(props) => props.theme.spaces[props.$size]};
`;

const OrgName = styled.div`
  margin-left: ${(props) => props.theme.spaces.s050};
  line-height: 1.2;
`;

const OrgTitle = styled.div<{ $weight: 'fontWeightNormal' | 'fontWeightBold' }>`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  font-weight: ${(props) => props.theme[props.$weight]};
`;

type OrgChipProps = {
  image: string;
  name: string;
  size?: 'sm' | 'md';
};

const OrgChip = React.forwardRef<HTMLDivElement, OrgChipProps>((props, ref) => {
  const { image, name, size = 'md', ...otherProps } = props;

  const IMAGE_SIZES: Record<NonNullable<OrgChipProps['size']>, keyof Theme['spaces']> = {
    sm: 's100',
    md: 's200',
  };

  return (
    <Tag ref={ref} {...otherProps}>
      <OrgAvatar src={image} $size={IMAGE_SIZES[size]} alt="" />
      <OrgName>
        <OrgTitle $weight={size === 'sm' ? 'fontWeightNormal' : 'fontWeightBold'}>{name}</OrgTitle>
      </OrgName>
    </Tag>
  );
});

OrgChip.displayName = 'OrgChip';

export default OrgChip;
