import React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon';

const WrapperContainer = styled.div`
  background-color: #fde6e6;
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

function RestrictedBlockWrapper(props: RestrictedBlockWrapperProps) {
  const { isRestricted, isHidden, children } = props;
  if (isHidden) return;

  return (
    <>
      {isRestricted ? (
        <WrapperContainer>
          <WrapperIcon name="lock" />
          {children}
        </WrapperContainer>
      ) : (
        children
      )}
    </>
  );
}

export default RestrictedBlockWrapper;
