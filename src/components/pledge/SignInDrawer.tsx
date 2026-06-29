'use client';

import styled from '@emotion/styled';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Container } from 'reactstrap';

import Icon from '@/components/common/Icon';

import PledgeSignInFlow from './PledgeSignInFlow';

const StyledBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1040;
`;

const StyledDrawerWrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1050;
`;

const StyledDrawer = styled(Container)`
  background: ${({ theme }) => theme.cardBackground.secondary};
  border-radius: ${({ theme }) => theme.cardBorderRadius} ${({ theme }) => theme.cardBorderRadius} 0
    0;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
`;

const StyledDrawerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => theme.spaces.s100} ${({ theme }) => theme.spaces.s150};
  border-bottom: 1px solid ${({ theme }) => theme.graphColors.grey020};

  @media (max-width: ${({ theme }) => theme.breakpointMd}) {
    padding: ${({ theme }) => theme.spaces.s100};
  }
`;

const StyledDrawerTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin: 0;
  flex: 1;
`;

const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spaces.s025};
  cursor: pointer;
  color: ${({ theme }) => theme.textColor.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.textColor.primary};
  }
`;

const StyledDrawerContent = styled.div`
  padding: ${({ theme }) => theme.spaces.s200};

  @media (max-width: ${({ theme }) => theme.breakpointMd}) {
    padding: ${({ theme }) => theme.spaces.s100};
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preExistingPledgeIds: string[]) => void;
  anonymousUserToken?: string;
  termsUrl?: string;
};

function SignInDrawer({ isOpen, onClose, onComplete, anonymousUserToken, termsUrl }: Props) {
  const t = useTranslations();

  const handleComplete = (ids: string[]) => {
    onComplete(ids);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledBackdrop
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        />
      )}

      {isOpen && (
        <StyledDrawerWrapper
          key="drawer"
          initial={{ opacity: 0.8, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.3, ease: 'circOut' }}
        >
          <StyledDrawer>
            <StyledDrawerHeader>
              <Icon name="user" width="20px" height="20px" />
              <StyledDrawerTitle>{t('pledge-sign-in-banner-title')}</StyledDrawerTitle>
              <StyledCloseButton onClick={onClose} aria-label={t('close')}>
                <Icon name="times" width="32px" height="32px" />
              </StyledCloseButton>
            </StyledDrawerHeader>

            <StyledDrawerContent>
              <PledgeSignInFlow
                anonymousUserToken={anonymousUserToken}
                termsUrl={termsUrl}
                onComplete={handleComplete}
                onClose={onClose}
              />
            </StyledDrawerContent>
          </StyledDrawer>
        </StyledDrawerWrapper>
      )}
    </AnimatePresence>
  );
}

export default SignInDrawer;
