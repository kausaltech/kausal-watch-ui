'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';

import styled from '@emotion/styled';

import { useTranslations } from 'next-intl';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import { type SignInStep, usePledgeSignIn } from './use-pledge-auth';

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s200};
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => theme.spaces.s200};
  background: ${({ theme }) => theme.cardBackground.primary};
`;

const StyledHeading = styled.h4`
  font-size: ${({ theme }) => theme.fontSizeBase};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin: 0;
`;

const StyledDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.lineHeightMd};
`;

const StyledTermsLink = styled.a`
  color: ${({ theme }) => theme.linkColor};
  text-decoration: underline;
`;

const StyledActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s100};
  flex-wrap: wrap;
`;

const StyledButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.s050};
  width: 100%;
  text-align: center;

  &:disabled {
    border: 0;
    background: ${({ theme }) => theme.graphColors.grey030};
    color: ${({ theme }) => theme.textColor.secondary};
  }
`;

const StyledLinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  line-height: inherit;
  margin: 0 auto;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledModeToggle = styled.p`
  font-size: ${({ theme }) => theme.fontSizeBase};
  color: ${({ theme }) => theme.textColor.secondary};
  text-align: center;
  margin: 0;
`;

const StyledModeToggleLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  color: ${({ theme }) => theme.linkColor};
  cursor: pointer;
  text-decoration: underline;
  line-height: inherit;

  &:hover {
    opacity: 0.8;
  }
`;

// ---------------------------------------------------------------------------
// PIN input
// ---------------------------------------------------------------------------

const StyledPinWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spaces.s050};
`;

const StyledPinDigit = styled.input`
  width: 44px;
  height: 52px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  border: ${({ theme }) => theme.inputBorderWidth} solid ${({ theme }) => theme.themeColors.dark};
  border-radius: ${({ theme }) => theme.inputBorderRadius};
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.textColor.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.brandDark};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.brandLight};
  }
`;

type PinInputProps = {
  value: string;
  onChange: (pin: string) => void;
  disabled?: boolean;
};

function PinInput({ value, onChange, disabled = false }: PinInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getDigit = (index: number) => value[index] ?? '';

  const focusAt = (index: number) => {
    const inputs = containerRef.current?.querySelectorAll('input');
    (inputs?.[index] as HTMLInputElement | undefined)?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    // Support pasting the full code
    const digits = raw.replace(/\D/g, '').slice(0, 6 - index);
    const arr = (value + ' '.repeat(6)).split('').slice(0, 6);
    for (let i = 0; i < digits.length; i++) {
      arr[index + i] = digits[i];
    }
    const newPin = arr.join('').replace(/\s/g, '');
    onChange(newPin);
    const nextIndex = Math.min(index + digits.length, 5);
    focusAt(nextIndex);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!getDigit(index) && index > 0) {
        // Remove previous digit and focus back
        const arr = (value + ' '.repeat(6)).split('').slice(0, 6);
        arr[index - 1] = ' ';
        onChange(arr.join('').replace(/\s/g, ''));
        focusAt(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusAt(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusAt(index + 1);
    }
  };

  return (
    <StyledPinWrapper ref={containerRef}>
      {Array.from({ length: 6 }, (_, i) => (
        <StyledPinDigit
          key={i}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={6}
          value={getDigit(i)}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </StyledPinWrapper>
  );
}

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type PledgeSignInFlowProps = {
  anonymousUserToken?: string;
  commitmentCount?: number;
  termsUrl?: string;
  onComplete: (pledgeIds: string[]) => void;
  onClose: () => void;
  /** Called when the internal step changes — for hosts that mirror step in their own state */
  onStepChange?: (step: SignInStep) => void;
};

type FlowMode = 'signUp' | 'signIn';

// ---------------------------------------------------------------------------
// Error message resolver
// ---------------------------------------------------------------------------

function getPinErrorKey(code: string | null): string {
  switch (code) {
    case 'PIN_LOCKED':
      return 'pledge-sign-in-error-pin-locked';
    case 'PIN_EXPIRED':
      return 'pledge-sign-in-error-pin-expired';
    case 'NO_ACTIVE_ATTEMPT':
      return 'pledge-sign-in-error-no-active-attempt';
    default:
      return 'pledge-sign-in-error-invalid-pin';
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

function PledgeSignInFlow({
  anonymousUserToken,
  commitmentCount,
  termsUrl,
  onComplete,
  onClose,
  onStepChange,
}: PledgeSignInFlowProps) {
  const t = useTranslations();
  const { step, pendingEmail, loading, error, signUp, signIn, verifyPin, resendCode, editEmail } =
    usePledgeSignIn();

  const [mode, setMode] = useState<FlowMode>('signUp');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pin, setPin] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'email') emailRef.current?.focus();

    onStepChange?.(step);
  }, [step, onStepChange]);

  const handleSwitchMode = useCallback((newMode: FlowMode) => {
    setMode(newMode);
    setEmailError(null);
  }, []);

  const handleEmailSubmit = useCallback(async () => {
    if (!emailRef.current?.validity.valid) {
      setEmailError(t('pledge-sign-in-error-invalid-email'));

      return;
    }

    setEmailError(null);

    if (mode === 'signUp') {
      await signUp(email, termsAccepted, marketingOptIn, anonymousUserToken);
    } else {
      await signIn(email, anonymousUserToken);
    }
  }, [email, termsAccepted, marketingOptIn, anonymousUserToken, mode, signUp, signIn, t]);

  const handlePinSubmit = useCallback(async () => {
    const ids = await verifyPin(pin);

    if (ids.length > 0 || !error) {
      onComplete(ids);
    }
  }, [pin, verifyPin, error, onComplete]);

  const handleResend = useCallback(async () => {
    setPin('');

    await resendCode();
  }, [resendCode]);

  if (step === 'email') {
    const isSignUp = mode === 'signUp';
    const submitDisabled = loading || !email || (isSignUp && !termsAccepted);

    // Map backend error codes to translation keys for the email step
    let emailStepError: string | null = null;
    if (error === 'ACCOUNT_NOT_FOUND') {
      emailStepError = t('pledge-sign-in-error-account-not-found');
    } else if (error === 'ACCOUNT_EXISTS') {
      emailStepError = t('pledge-sign-in-error-account-exists');
    } else if (error) {
      emailStepError = t('pledge-sign-in-error-generic');
    }

    return (
      <StyledSection>
        {commitmentCount !== undefined && (
          <StyledDescription>
            {t('pledge-sign-in-join-count', { count: commitmentCount })}
          </StyledDescription>
        )}

        <StyledCard>
          <StyledHeading>
            {isSignUp ? t('pledge-sign-in-email-heading') : t('pledge-sign-in-existing-heading')}
          </StyledHeading>
          <StyledDescription>
            {isSignUp
              ? t('pledge-sign-in-email-description')
              : t('pledge-sign-in-existing-description')}
          </StyledDescription>

          <Stack spacing={0.5}>
            <TextField
              id="pledge-sign-in-email"
              inputRef={emailRef}
              slotProps={{ input: { disableUnderline: true } }}
              label={t('pledge-sign-in-email-label')}
              type="email"
              autoComplete="email"
              fullWidth
              variant="filled"
              value={email}
              error={!!emailError || !!emailStepError}
              helperText={emailError ?? emailStepError ?? undefined}
              disabled={loading}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              onBlur={(e) => {
                if (email && !e.target.validity.valid) {
                  setEmailError(t('pledge-sign-in-error-invalid-email'));
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !submitDisabled) {
                  void handleEmailSubmit();
                }
              }}
            />

            {isSignUp && (
              <Stack spacing={-0.5}>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <span>
                      {t.rich('pledge-sign-in-terms-label', {
                        termsLink: (chunks) =>
                          termsUrl ? (
                            <StyledTermsLink
                              href={termsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {chunks}
                            </StyledTermsLink>
                          ) : (
                            <strong>{chunks}</strong>
                          ),
                      })}
                    </span>
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                    />
                  }
                  label={t('pledge-sign-in-marketing-label')}
                />
              </Stack>
            )}

            <StyledButton color="primary" onClick={handleEmailSubmit} disabled={submitDisabled}>
              {loading ? <CircularProgress size={16} /> : null}
              {t('pledge-sign-in-continue')}
            </StyledButton>
          </Stack>
        </StyledCard>

        <StyledModeToggle>
          {isSignUp ? (
            <>
              {t('pledge-sign-in-have-account')}{' '}
              <StyledModeToggleLink type="button" onClick={() => handleSwitchMode('signIn')}>
                {t('pledge-sign-in-switch-to-sign-in')}
              </StyledModeToggleLink>
            </>
          ) : (
            <>
              {t('pledge-sign-in-no-account')}{' '}
              <StyledModeToggleLink type="button" onClick={() => handleSwitchMode('signUp')}>
                {t('pledge-sign-in-switch-to-sign-up')}
              </StyledModeToggleLink>
            </>
          )}
        </StyledModeToggle>

        <StyledLinkButton type="button" onClick={onClose}>
          {t('pledge-sign-in-close')}
        </StyledLinkButton>
      </StyledSection>
    );
  }

  // PIN step
  return (
    <StyledSection>
      <StyledHeading>{t('pledge-sign-in-pin-heading')}</StyledHeading>
      <StyledDescription>
        {t('pledge-sign-in-pin-description', { email: pendingEmail })}{' '}
        <StyledLinkButton type="button" onClick={editEmail}>
          {t('pledge-sign-in-pin-edit-email')}
        </StyledLinkButton>
      </StyledDescription>

      <StyledLinkButton type="button" onClick={void handleResend} disabled={loading}>
        {t('pledge-sign-in-pin-resend')}
      </StyledLinkButton>

      <PinInput value={pin} onChange={setPin} disabled={loading} />

      {error && <FormHelperText error>{t(getPinErrorKey(error))}</FormHelperText>}

      <StyledActionRow>
        <StyledButton
          color="primary"
          onClick={handlePinSubmit}
          disabled={loading || pin.length !== 6}
        >
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <Icon name="check" width="16px" height="16px" />
          )}
          {t('pledge-sign-in-verify')}
        </StyledButton>
        <StyledLinkButton type="button" onClick={onClose}>
          {t('pledge-sign-in-close')}
        </StyledLinkButton>
      </StyledActionRow>
    </StyledSection>
  );
}

export default PledgeSignInFlow;
