import React from 'react';
import { ReactNode } from 'react';

import { transparentize } from 'polished';
import styled from 'styled-components';

import Icon from '@/components/common/Icon';

const WrapperContainer = styled.div`
  background-color: ${({ theme }) => transparentize(0.5, theme.graphColors.red010)};
  position: relative;
  padding: 10px;
  margin-bottom: 15px;
`;

const WrapperIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

type RestrictedBlockWrapperProps = {
  isRestricted: boolean;
  isHidden: boolean;
  children: ReactNode;
};

function RestrictedBlockWrapper({ isRestricted, isHidden, children }: RestrictedBlockWrapperProps) {
  if (isHidden) return;

  return (
    <>
      {isRestricted ? (
        <WrapperContainer>
          <WrapperIcon name="hidden" />
          {children}
        </WrapperContainer>
      ) : (
        children
      )}
    </>
  );
}

export default RestrictedBlockWrapper;
