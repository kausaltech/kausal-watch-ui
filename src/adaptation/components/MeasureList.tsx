'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';

import { useTranslations } from 'next-intl';

import Icon from '@/components/common/Icon';

import type { HazardKey, Measure } from '../model';

const INITIAL_COUNT = 5;

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="body2" component="dt" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="body2" component="dd" sx={{ m: 0 }}>
        {children}
      </Typography>
    </Box>
  );
}

function MeasureItem({ measure }: { measure: Measure }) {
  const t = useTranslations();
  const hazardNames = measure.hazards.map((key: HazardKey) => t(`adaptation-hazard-${key}`));
  const years = (value: number) => t('adaptation-measure-years', { years: value });

  return (
    <Accordion disableGutters variant="outlined" slotProps={{ heading: { component: 'h3' } }}>
      <AccordionSummary expandIcon={<Icon.AngleDown />}>
        <Box>
          <Typography component="span" sx={{ display: 'block', fontWeight: 'bold' }}>
            {measure.name}
          </Typography>
          {measure.summary && (
            <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              {measure.summary}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {measure.description && (
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {measure.description}
          </Typography>
        )}
        <Box
          component="dl"
          sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 4, rowGap: 1.5, my: 2 }}
        >
          {hazardNames.length > 0 && (
            <Detail label={t('adaptation-measure-addresses')}>{hazardNames.join(', ')}</Detail>
          )}
          {measure.otherHazards && (
            <Detail label={t('adaptation-measure-also')}>{measure.otherHazards}</Detail>
          )}
          {measure.timelineYears != null && (
            <Detail label={t('adaptation-measure-timeline')}>{years(measure.timelineYears)}</Detail>
          )}
          {measure.lifespanYears != null && (
            <Detail label={t('adaptation-measure-lifespan')}>{years(measure.lifespanYears)}</Detail>
          )}
        </Box>
        {measure.matchScore != null && (
          <Typography variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
            {t('adaptation-measure-match', { score: measure.matchScore })}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

type Props = {
  measures: Measure[];
  /** Set on a hazard's page, where the list holds that hazard's measures only. */
  hazardName?: string;
};

/**
 * The measures the provider matched to the community.
 *
 * These are library suggestions that nobody at the plan's owner has reviewed,
 * so the list says so, and shows no owner and no cost.
 */
export default function MeasureList({ measures, hazardName }: Props) {
  const t = useTranslations();
  const [showAll, setShowAll] = useState(false);

  if (measures.length === 0) return null;
  const visible = showAll ? measures : measures.slice(0, INITIAL_COUNT);
  const count = measures.length;

  return (
    <Paper component="section" variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h3" component="h2" sx={{ mt: 0 }}>
        {hazardName
          ? t('adaptation-measures-label-hazard', { hazard: hazardName })
          : t('adaptation-measures-label')}
      </Typography>
      <Typography>
        {hazardName
          ? t('adaptation-measures-intro-hazard', { count, hazard: hazardName })
          : t('adaptation-measures-intro', { count })}
      </Typography>
      <div>
        {visible.map((measure) => (
          <MeasureItem key={measure.id} measure={measure} />
        ))}
      </div>
      {count > INITIAL_COUNT && (
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll
            ? t('adaptation-measures-show-fewer')
            : t('adaptation-measures-show-all', { count })}
        </Button>
      )}
    </Paper>
  );
}
