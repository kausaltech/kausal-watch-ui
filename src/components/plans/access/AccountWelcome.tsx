'use client';

import { useEffect, useRef } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';

import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

import { AccessGateLayout, Heading } from './AccessGate';

type Props = {
  planName: string | null;
  homePath: string;
};

/**
 * Where a visitor lands after setting their password. Setting it signed them in to the backend,
 * so starting sign-in here completes without a form and gives the site its tokens. Only then is
 * the welcome shown. Without a backend session, the backend asks them to sign in and they return
 * here.
 */
export default function AccountWelcome({ planName, homePath }: Props) {
  const t = useTranslations();
  const { status } = useSession();
  const signInStarted = useRef(false);

  useEffect(() => {
    if (status !== 'unauthenticated' || signInStarted.current) return;

    signInStarted.current = true;

    void signIn('watch-oidc-provider', { redirectTo: window.location.pathname });
  }, [status]);

  return (
    <AccessGateLayout planName={planName} homePath={homePath}>
      {status === 'authenticated' ? (
        <>
          <Heading
            title={t('access-welcome-title', { plan: planName ?? t('access-plan-fallback') })}
            description={t('access-welcome-description')}
          />
          <Button variant="contained" size="large" href={homePath} fullWidth>
            {t('access-welcome-continue')}
          </Button>
        </>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress aria-label={t('access-signing-in')} />
        </Box>
      )}
    </AccessGateLayout>
  );
}

/** The welcome page as served inside the plan, once the visitor can see it. */
export function PlanAccountWelcome() {
  const plan = usePlan();

  return (
    <AccountWelcome
      planName={getMetaTitles(plan).navigationTitle}
      homePath={plan.domain?.basePath || '/'}
    />
  );
}
