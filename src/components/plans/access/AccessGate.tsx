'use client';

import { type ReactNode, type SyntheticEvent, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Container as BootstrapContainer } from 'reactstrap';

import { HomeLink, OrgLogo, Site, SiteTitle, TopNav } from '@/components/common/GlobalNav';
import { checkAccountStatus, submitAccessRequest } from '@/utils/access-requests';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Step = 'email' | 'request-access' | 'pending' | 'approved';

type Props = {
  planName: string | null;
};

const GateFooter = styled.footer`
  background-color: ${(props) => props.theme.footerBackgroundColor};
  color: ${(props) => props.theme.footerColor};
  padding: ${(props) => props.theme.spaces.s200} 0;

  a {
    color: ${(props) => props.theme.footerColor};
    text-decoration: underline;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spaces.s100};
`;

function AccessGateLayout({
  planName,
  children,
}: {
  planName: string | null;
  children: ReactNode;
}) {
  const t = useTranslations();
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'grey.100' }}>
      <header>
        <TopNav expand="md" id="branding-navigation-bar" container>
          <Site>
            <HomeLink href="/">
              <OrgLogo label={`${planName ?? ''} ${t('front-page')}`.trim()} />
            </HomeLink>
            {planName && (
              <HomeLink href="/" aria-label={!theme.navTitleVisible ? planName : undefined}>
                <SiteTitle aria-hidden={!theme.navTitleVisible}>
                  {theme.navTitleVisible ? planName : '\u00A0'}
                </SiteTitle>
              </HomeLink>
            )}
          </Site>
        </TopNav>
      </header>
      <Box component="main" id="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="sm" sx={{ py: { xs: 4, md: 10 } }}>
          <Card sx={{ backgroundColor: (muiTheme) => muiTheme.cardBackground }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Stack spacing={2}>{children}</Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <GateFooter>
        <BootstrapContainer>
          <FooterContent>
            {planName && <strong>{planName}</strong>}
            <span>
              {t('published-on')}{' '}
              <a href="https://kausal.tech" target="_blank" rel="noreferrer">
                Kausal Watch
              </a>
            </span>
          </FooterContent>
        </BootstrapContainer>
      </GateFooter>
    </Box>
  );
}

function Heading({ title, description }: { title: string; description?: string }) {
  return (
    <Stack spacing={1.5}>
      <Typography variant="h1" component="h1">
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
  );
}

function EmailChip({ email, onChange }: { email: string; onChange: () => void }) {
  const t = useTranslations();
  return (
    <Box
      sx={{
        bgcolor: 'grey.100',
        borderRadius: 1,
        px: 2,
        py: 1.25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>
        {email}
      </Typography>
      <Link component="button" type="button" variant="body2" onClick={onChange}>
        {t('access-change')}
      </Link>
    </Box>
  );
}

function StartAgain({
  prompt,
  label,
  onClick,
}: {
  prompt?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Typography variant="body2" color="text.secondary">
      {prompt && `${prompt} `}
      <Link component="button" type="button" variant="body2" onClick={onClick}>
        {label}
      </Link>
    </Typography>
  );
}

function EmailStep({
  planName,
  initialEmail,
  onContinue,
}: {
  planName: string | null;
  initialEmail: string;
  onContinue: (email: string, step: 'request-access' | 'approved') => void;
}) {
  const t = useTranslations();
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError(t('access-email-invalid'));
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const status = await checkAccountStatus(trimmed);
      if (status === 'invalid-email') {
        setError(t('access-email-invalid'));
        return;
      }
      if (status === 'sign-in') {
        await signIn(
          'watch-oidc-provider',
          { redirectTo: window.location.pathname },
          // Not yet read by the backend login page, so the email may have to be entered again.
          { login_hint: trimmed }
        );
        return;
      }
      onContinue(trimmed, status === 'request-access' ? 'request-access' : 'approved');
    } catch {
      setError(t('access-check-failed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Heading
        title={t('access-sign-in-title')}
        description={t('access-sign-in-description', {
          plan: planName ?? t('access-plan-fallback'),
        })}
      />
      <Stack component="form" spacing={3} onSubmit={(e) => void handleSubmit(e)} noValidate>
        <Box>
          <FormLabel htmlFor="access-email" required sx={{ mb: 0.5, display: 'block' }}>
            {t('access-email-label')}
          </FormLabel>
          <TextField
            id="access-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" size="large" disabled={submitting} fullWidth>
          {t('access-next')}
        </Button>
      </Stack>
    </>
  );
}

function RequestAccessStep({
  email,
  onSent,
  onBack,
}: {
  email: string;
  onSent: () => void;
  onBack: () => void;
}) {
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSend() {
    setError(null);
    setSubmitting(true);
    try {
      await submitAccessRequest(email);
      onSent();
    } catch {
      setError(t('access-request-failed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Heading title={t('access-request-title')} description={t('access-request-description')} />
      <EmailChip email={email} onChange={onBack} />
      <Alert severity="info">{t('access-request-notice')}</Alert>
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        variant="contained"
        size="large"
        disabled={submitting}
        onClick={() => void handleSend()}
        fullWidth
      >
        {t('access-send-request')}
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <Link component="button" type="button" variant="body2" onClick={onBack}>
          {t('access-cancel')}
        </Link>
      </Box>
    </>
  );
}

export default function AccessGate({ planName }: Props) {
  const t = useTranslations();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');

  const startAgain = () => {
    setEmail('');
    setStep('email');
  };

  if (step === 'request-access') {
    return (
      <AccessGateLayout planName={planName}>
        <RequestAccessStep
          email={email}
          onSent={() => setStep('pending')}
          onBack={() => setStep('email')}
        />
      </AccessGateLayout>
    );
  }

  if (step === 'pending') {
    return (
      <AccessGateLayout planName={planName}>
        <Heading
          title={t('access-pending-title')}
          description={t('access-pending-description', { email })}
        />
        <StartAgain
          prompt={t('access-wrong-email')}
          label={t('access-start-again')}
          onClick={startAgain}
        />
      </AccessGateLayout>
    );
  }

  if (step === 'approved') {
    return (
      <AccessGateLayout planName={planName}>
        <Heading
          title={t('access-approved-title')}
          description={t('access-approved-description', { email })}
        />
        <StartAgain label={t('access-back-to-sign-in')} onClick={startAgain} />
      </AccessGateLayout>
    );
  }

  return (
    <AccessGateLayout planName={planName}>
      <EmailStep
        planName={planName}
        initialEmail={email}
        onContinue={(enteredEmail, nextStep) => {
          setEmail(enteredEmail);
          setStep(nextStep);
        }}
      />
    </AccessGateLayout>
  );
}
