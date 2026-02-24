'use client';

import React from 'react';

import Link from 'next/link';

import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

type Props = {
  message?: string;
  type?: 'page' | 'block';
  testId?: string;
  details?: string;
};

export const errorIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" x="0px" y="0px">
    <title>emoticon, emoji, face, sick frowning</title>
    <g data-name="Layer 25">
      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28ZM8.61,14.72,11.2,13,8.61,11.28,9.72,9.61,14.8,13,9.72,16.39Zm14.78-3.44L20.8,13l2.59,1.72-1.11,1.67L17.2,13l5.08-3.39ZM21.62,22.22l.79.62-1.25,1.57-.78-.63c-3-2.39-5.77-2.39-8.76,0l-.78.63L9.59,22.84l.79-.62C14.05,19.27,18,19.27,21.62,22.22Z"></path>
    </g>
  </svg>
);

function ErrorPage({ message, type = 'page', details, testId }: Props) {
  const t = useTranslations();

  return (
    <Box sx={{ bgcolor: 'primary.main', py: 8 }} data-testid={testId}>
      <Container fixed maxWidth="xl">
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }} offset={{ md: 3 }}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ width: 48, height: 48, mb: 1, display: 'inline-block' }}>
                  {errorIcon}
                </Box>
                <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
                  {message || t('error-occurred')}
                </Typography>
                {details && (
                  <Typography variant="body1" sx={{ mb: 2, bgcolor: 'secondary.light' }}>
                    <code>{details}</code>
                  </Typography>
                )}
                <Link href="/">
                  <Button variant="outlined" size="small" color="primary">
                    {t('return-to-front', { ns: 'common' })}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ErrorPage;
