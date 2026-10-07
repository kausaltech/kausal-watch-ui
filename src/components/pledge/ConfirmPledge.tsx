'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { FormHelperText, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import styled from '@emotion/styled';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { Container } from '@/components/common/layout/LayoutGrid';

import PledgeCard from './PledgeCard';
import PledgeSignInFlow from './PledgeSignInFlow';
import { PLEDGE_FORM_FIELD_VALUE_MAX_LENGTH, type PledgeFormField } from './use-pledge-form-fields';

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

  ${({ theme }) => theme.breakpoints.down('md')} {
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

  ${({ theme }) => theme.breakpoints.down('md')} {
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

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spaces.s100};
  }
`;

const StyledButton = styled(Button)`
  min-width: 100px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.s050};

  ${({ theme }) => theme.breakpoints.down('lg')} {
    width: 100%;
  }
`;

type ConfirmPledgeProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (formData: Record<string, string>) => Promise<void>;
  onSignInComplete?: (preExistingPledgeIds: string[]) => void;
  pledgeName: string;
  pledgeSlug: string;
  pledgeImage?: string | null;
  commitmentCount: number;
  formFields?: PledgeFormField[];
  userData?: Record<string, string>;
  anonymousUserToken?: string;
  isSignedIn?: boolean;
  /** Offer to create an account after confirming. When false, confirming goes straight to the success step. */
  offerAccount?: boolean;
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
  offerAccount = true,
}: ConfirmPledgeProps) {
  const t = useTranslations();
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
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
      setSubmitError(false);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen, formFields, userData]);

  // Signed-in users have already provided their data, so only prompt for fields they haven't.
  const visibleFormFields = isSignedIn
    ? formFields.filter((field) => !userData[field.id])
    : formFields;
  const isMissingRequiredField = visibleFormFields.some(
    (field) => field.required && !formData[field.id]?.trim()
  );

  const handleClose = () => {
    setStep('form');
    setFormData({});
    setSubmitError(false);
    onClose();
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(false);

    try {
      await onConfirm(formData);
      // Skip account creation if already signed in or the plan doesn't offer accounts
      setStep(isSignedIn || !offerAccount ? 'success' : 'account');
    } catch (error) {
      console.error('Failed to commit:', error);
      setSubmitError(true);
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

                  {visibleFormFields.length > 0 && (
                    <StyledFormSection>
                      <StyledFormHeader>{t('pledge-confirm-form-heading')}</StyledFormHeader>
                      {visibleFormFields.map((field) => (
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
                          required={field.required}
                          placeholder={field.placeholder}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleFieldChange(field.id, e.target.value)}
                          slotProps={{
                            input: { disableUnderline: true },
                            htmlInput: { maxLength: PLEDGE_FORM_FIELD_VALUE_MAX_LENGTH },
                          }}
                          helperText={field.helpText}
                        />
                      ))}
                    </StyledFormSection>
                  )}

                  {submitError && (
                    <FormHelperText error role="alert">
                      {t('pledge-confirm-error')}
                    </FormHelperText>
                  )}
                </>
              )}

              {(step === 'account' || step === 'pin') && (
                <PledgeSignInFlow
                  anonymousUserToken={anonymousUserToken}
                  commitmentCount={commitmentCount + 1}
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
                  disabled={submitting || (step === 'form' && isMissingRequiredField)}
                >
                  {submitting ? (
                    <CircularProgress size="1rem" color="inherit" />
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
