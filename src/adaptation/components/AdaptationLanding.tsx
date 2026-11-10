'use client';

import dynamic from 'next/dynamic';

import { Box, Paper, Typography } from '@mui/material';

import { useTranslations } from 'next-intl';

import ContentContainer from '@common/components/ContentContainer';

import { Link } from '@/common/links';
import { usePlan } from '@/context/plan';

import { ADAPTATION_PATH } from '../config';
import type { AdaptationData } from '../get-adaptation-data';
import type { Hazard } from '../model';
import { AttributionPanel } from './Attribution';
import LinkedActions from './LinkedActions';
import MeasureList from './MeasureList';
import ScoreBar from './ScoreBar';
import { useAdaptationFormat } from './formatting';

const HazardMap = dynamic(() => import('./HazardMap'), { ssr: false });

/** How many of the highest scoring hazards get a large card. */
const FEATURED_COUNT = 3;

const hazardHref = (hazard: Hazard) => `${ADAPTATION_PATH}/${hazard.slug}`;

const cardLinkStyles = {
  display: 'block',
  height: '100%',
  color: 'inherit',
  textDecoration: 'none',
  '&:hover .hazard-name, &:focus-visible .hazard-name': { textDecoration: 'underline' },
};

function FeaturedHazardCard({ hazard, now }: { hazard: Hazard; now: string }) {
  const { hazardName, scoreLabel, summary, relativeTime } = useAdaptationFormat();
  const summaryText = summary(hazard);
  const footer = [hazard.sourceName, hazard.updatedAt && relativeTime(hazard.updatedAt, now)]
    .filter(Boolean)
    .join(' · ');

  return (
    <Box component="li">
      <Paper variant="outlined" sx={{ height: '100%' }}>
        <Box component={Link} href={hazardHref(hazard)} sx={{ ...cardLinkStyles, p: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 1 }}>
            <Typography className="hazard-name" variant="h4" component="h3" sx={{ m: 0 }}>
              {hazardName(hazard)}
            </Typography>
            <Typography variant="body2" component="span">
              {scoreLabel(hazard)}
            </Typography>
          </Box>
          {hazard.score != null && (
            <Box sx={{ my: 1.5 }}>
              <ScoreBar score={hazard.score} />
            </Box>
          )}
          {summaryText && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {summaryText}
            </Typography>
          )}
          {footer && (
            <Typography variant="caption" component="p" sx={{ m: 0, color: 'text.secondary' }}>
              {footer}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

function CompactHazardCard({ hazard }: { hazard: Hazard }) {
  const { hazardName, scoreLabel } = useAdaptationFormat();

  return (
    <Box component="li">
      <Paper variant="outlined">
        <Box
          component={Link}
          href={hazardHref(hazard)}
          sx={{
            ...cardLinkStyles,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 1,
            px: 2,
            py: 1.5,
          }}
        >
          <Typography className="hazard-name" component="h3" sx={{ m: 0, fontSize: 'inherit' }}>
            {hazardName(hazard)}
          </Typography>
          <Typography variant="body2" component="span">
            {scoreLabel(hazard)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
  gap: 2,
  listStyle: 'none',
  p: 0,
  m: 0,
};

type Props = {
  data: AdaptationData;
  mapboxAccessToken: string | null;
  /** The time of rendering, so that relative ages match between server and browser. */
  now: string;
};

export default function AdaptationLanding({ data, mapboxAccessToken, now }: Props) {
  const t = useTranslations();
  const plan = usePlan();
  const { hazards, measures, map, updatedAt } = data;

  // An action that responds to several hazards is listed once
  const linkedActions = [
    ...new globalThis.Map(
      Object.values(data.linkedActions)
        .flat()
        .map((action) => [action.id, action])
    ).values(),
  ];
  const placeName = plan.generalContent.ownerName || plan.shortName || plan.name;

  return (
    <ContentContainer sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          gap: { xs: 2, md: 5 },
          mb: 5,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" sx={{ mt: 0 }}>
            {t('adaptation-title')}
          </Typography>
          <Typography sx={{ fontSize: 'h5.fontSize', maxWidth: '40em', m: 0 }}>
            {t('adaptation-standfirst')}
          </Typography>
        </Box>
        <Box sx={{ width: { md: 320 }, flex: 'none' }}>
          <AttributionPanel updatedAt={updatedAt} />
        </Box>
      </Box>

      <Box component="section" sx={{ mb: 5 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            columnGap: 2,
            mb: 2,
          }}
        >
          <Typography variant="h3" component="h2" sx={{ m: 0 }}>
            {t('adaptation-hazards-heading', { name: placeName })}
          </Typography>
          <Typography variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
            {t('adaptation-hazards-scale')}
          </Typography>
        </Box>
        <Box component="ul" sx={{ ...gridStyles, mb: 2 }}>
          {hazards.slice(0, FEATURED_COUNT).map((hazard) => (
            <FeaturedHazardCard key={hazard.key} hazard={hazard} now={now} />
          ))}
        </Box>
        <Box component="ul" sx={gridStyles}>
          {hazards.slice(FEATURED_COUNT).map((hazard) => (
            <CompactHazardCard key={hazard.key} hazard={hazard} />
          ))}
        </Box>
      </Box>

      {map && mapboxAccessToken && (
        <Box sx={{ mb: 5 }}>
          <HazardMap
            accessToken={mapboxAccessToken}
            map={map}
            heading={t('adaptation-map-heading')}
          />
        </Box>
      )}

      <Box sx={{ mb: 5 }}>
        <MeasureList measures={measures} />
      </Box>

      {linkedActions.length > 0 && (
        <Box component="section">
          <Typography variant="h3" component="h2">
            {t('adaptation-actions-heading')}
          </Typography>
          <Typography>{t('adaptation-actions-intro', { count: linkedActions.length })}</Typography>
          <LinkedActions actions={linkedActions} />
        </Box>
      )}
    </ContentContainer>
  );
}
