'use client';

import { Box, Paper, Typography } from '@mui/material';

import { useTranslations } from 'next-intl';

import { useAdaptationFormat } from './formatting';

const PROVIDER_URL = 'https://riaresilience.com/';

/**
 * Credits the risk data provider. Part of the terms for showing its data, so
 * every page of the section carries this panel or the footer below.
 */
export function AttributionPanel({ updatedAt }: { updatedAt: string | null }) {
  const t = useTranslations();
  const { date } = useAdaptationFormat();

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography
        variant="overline"
        component="p"
        sx={{ m: 0, lineHeight: 1.6, color: 'text.secondary' }}
      >
        {t('adaptation-attribution-label')}
      </Typography>
      <Typography component="p" sx={{ m: 0, fontWeight: 'bold' }}>
        <a href={PROVIDER_URL}>{t('adaptation-attribution-product')}</a>
      </Typography>
      <Typography variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
        {t('adaptation-attribution-company')}
        {updatedAt && <> {t('adaptation-last-updated', { date: date(updatedAt) })}</>}
      </Typography>
    </Paper>
  );
}

type FooterProps = { sourceName: string | null; updatedAt: string | null };

export function AttributionFooter({ sourceName, updatedAt }: FooterProps) {
  const t = useTranslations();
  const { date } = useAdaptationFormat();

  return (
    <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, mt: 4 }}>
      <Typography variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
        {sourceName && updatedAt
          ? t('adaptation-footer', { source: sourceName, date: date(updatedAt) })
          : t('adaptation-footer-no-source')}
      </Typography>
    </Box>
  );
}
