'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { TextField } from '@mui/material';

import styled from '@emotion/styled';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Container, Spinner } from 'reactstrap';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import PledgeCard from './PledgeCard';
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
  max-width: 800px;
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

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
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

const StyledDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  margin-bottom: ${({ theme }) => theme.spaces.s200};
  line-height: ${({ theme }) => theme.lineHeightMd};
  max-width: 800px;
`;

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s050};
  background: ${({ theme }) => theme.cardBackground.primary};
  padding: ${({ theme }) => theme.spaces.s150};
`;

const StyledFormHeader = styled.h4`
  font-size: ${({ theme }) => theme.fontSizeBase};
`;

const StyledDrawerFooter = styled.div`
  padding: ${({ theme }) => theme.spaces.s200};
  border-top: 1px solid ${({ theme }) => theme.graphColors.grey020};

  @media (max-width: ${({ theme }) => theme.breakpointMd}) {
    padding: ${({ theme }) => theme.spaces.s100};
  }
`;

const StyledButton = styled(Button)`
  min-width: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.s050};

  @media (max-width: ${({ theme }) => theme.breakpointLg}) {
    width: 100%;
  }
`;

type FormField = {
  id: string;
  label: string;
  helpText?: string;
  required: boolean;
  placeholder?: string;
};

type ConfirmPledgeProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: Record<string, string>) => Promise<void>;
  onSignInComplete?: (preExistingPledgeIds: string[]) => void;
  pledgeName: string;
  pledgeSlug: string;
  pledgeImage?: string | null;
  commitmentCount: number;
  formFields?: FormField[];
  userData?: Record<string, string>;
  anonymousUserToken?: string;
  isSignedIn?: boolean;
  termsUrl?: string;
};

type Step = 'form' | 'account' | 'pin' | 'success';

function ConfirmPledge({
  isOpen,
  onClose,
  onConfirm,
  onSignInComplete,
  pledgeName,
  pledgeSlug,
  pledgeImage,
  commitmentCount,
  formFields = [],
  userData = {},
  anonymousUserToken,
  isSignedIn = false,
  termsUrl,
}: ConfirmPledgeProps) {
  const t = useTranslations();
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const prevIsOpen = useRef(false);

  // Pre-fill form data from userData when the drawer opens
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      const initialData: Record<string, string> = {};

      formFields.forEach((field) => {
        const existing = userData[field.id];

        if (existing) {
          initialData[field.id] = existing;
        }
      });

      setStep('form');
      setFormData(initialData);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen, formFields, userData]);

  const handleClose = () => {
    setStep('form');
    setFormData({});
    onClose();
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      await onConfirm(formData);
      // Skip account creation flow if already signed in
      setStep(isSignedIn ? 'success' : 'account');
    } catch (error) {
      // TODO: Handle and report the error
      console.error('Failed to commit:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignInComplete = useCallback(
    (preExistingPledgeIds: string[]) => {
      onSignInComplete?.(preExistingPledgeIds);
      setStep('success');
    },
    [onSignInComplete]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <StyledBackdrop
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
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
              <StyledIcon name="award" width="20px" height="20px" />
              <StyledDrawerTitle>
                {step === 'form'
                  ? t('pledge-confirm-title')
                  : step === 'account' || step === 'pin'
                    ? t('pledge-sign-in-banner-title')
                    : t('pledge-success-title')}
              </StyledDrawerTitle>
              <StyledCloseButton onClick={handleClose} aria-label={t('close')}>
                <Icon name="times" width="32px" height="32px" />
              </StyledCloseButton>
            </StyledDrawerHeader>

            <StyledDrawerContent>
              {step === 'form' && (
                <>
                  <StyledDescription>{t('pledge-confirm-description')}</StyledDescription>

                  {formFields.length > 0 && (
                    <StyledFormSection>
                      <StyledFormHeader>{t('pledge-confirm-form-heading')}</StyledFormHeader>
                      {formFields.map((field) => (
                        <TextField
                          key={field.id}
                          id={field.id}
                          label={
                            field.required ? (
                              field.label
                            ) : (
                              <>
                                {field.label}{' '}
                                <span style={{ fontWeight: 'normal' }}>({t('optional')})</span>
                              </>
                            )
                          }
                          type="text"
                          variant="filled"
                          size="small"
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          slotProps={{ input: { disableUnderline: true } }}
                          helperText={field.helpText}
                        />
                      ))}
                    </StyledFormSection>
                  )}
                </>
              )}

              {(step === 'account' || step === 'pin') && (
                <PledgeSignInFlow
                  anonymousUserToken={anonymousUserToken}
                  commitmentCount={commitmentCount + 1}
                  termsUrl={termsUrl}
                  onComplete={handleSignInComplete}
                  onClose={handleClose}
                  onStepChange={(signInStep) => setStep(signInStep === 'email' ? 'account' : 'pin')}
                />
              )}

              {step === 'success' && (
                <>
                  <StyledDescription>{t('pledge-success-message')}</StyledDescription>

                  <PledgeCard
                    layout="share"
                    title={pledgeName}
                    slug={pledgeSlug}
                    image={pledgeImage ?? undefined}
                    committedCount={commitmentCount + 1}
                    shareUrl={window.location.href}
                  />
                </>
              )}
            </StyledDrawerContent>

            {(step === 'form' || step === 'success') && (
              <StyledDrawerFooter>
                <StyledButton
                  color="primary"
                  onClick={step === 'form' ? handleSubmit : handleClose}
                  disabled={submitting}
                >
                  {submitting ? (
                    <Spinner size="sm" />
                  ) : step === 'form' ? (
                    <Icon name="award" width="18px" height="18px" />
                  ) : null}
                  {step === 'form' ? t('pledge-confirm-button') : t('close')}
                </StyledButton>
              </StyledDrawerFooter>
            )}
          </StyledDrawer>
        </StyledDrawerWrapper>
      )}
    </AnimatePresence>
  );
}

export default ConfirmPledge;
