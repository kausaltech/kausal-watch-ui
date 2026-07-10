'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import { getThemeStaticURL } from '@common/themes/theme';

type Props = {
  message: string;
  loginEnabled: boolean;
  testId?: string;
};

export default function UnpublishedPlan({ message, loginEnabled, testId }: Props) {
  const session = useSession();
  const router = useRouter();
  const theme = useTheme();
  const t = useTranslations();
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/');
    }
  }, [session]);

  const logo = theme.themeLogoWhiteUrl !== '' && (
    <Box
      component="img"
      src={getThemeStaticURL(theme.themeLogoWhiteUrl)}
      alt=""
      sx={{ height: 48, maxWidth: '100%' }}
    />
  );

  return (
    <Box sx={{ py: 8 }} data-testid={testId}>
      <Container maxWidth="sm">
        <Card elevation={4}>
          {logo && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: theme.footerBackgroundColor,
                p: 3,
              }}
            >
              {theme.footerLogoLink ? <a href={theme.footerLogoLink}>{logo}</a> : logo}
            </Box>
          )}
          <CardContent sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: loginEnabled ? 3 : 0 }}>
              {message}
            </Typography>
            {loginEnabled && (
              <Button variant="contained" onClick={() => signIn('watch-oidc-provider')}>
                {t('ui-sign-in')}
              </Button>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
