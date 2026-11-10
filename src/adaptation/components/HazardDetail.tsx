'use client';

import dynamic from 'next/dynamic';

import { Box, Paper, Typography } from '@mui/material';

import { useTranslations } from 'next-intl';

import ContentContainer from '@common/components/ContentContainer';

import { Link } from '@/common/links';

import { ADAPTATION_PATH } from '../config';
import type { AdaptationMapData } from '../get-adaptation-data';
import type { Hazard, Measure, SubScore } from '../model';
import type { LinkedAction } from '../queries/get-linked-action';
import { AttributionFooter } from './Attribution';
import LinkedActions from './LinkedActions';
import MeasureList from './MeasureList';
import ScoreBar from './ScoreBar';
import { useAdaptationFormat } from './formatting';

const HazardMap = dynamic(() => import('./HazardMap'), { ssr: false });

/**
 * One part of a hazard's score. The three states read differently on purpose:
 * a hazard that cannot occur here is neither a zero nor a gap in the analysis.
 */
function SubScoreCard({ subScore }: { subScore: SubScore }) {
  const t = useTranslations();
  const { subScoreName } = useAdaptationFormat();
  const notApplicable = subScore.state === 'not-applicable';

  return (
    <Paper
      component="li"
      variant="outlined"
      sx={{
        p: 2,
        ...(notApplicable && {
          border: '1px dashed',
          borderColor: 'text.secondary',
          bgcolor: 'transparent',
        }),
      }}
    >
      <Typography variant="body2" component="h3" sx={{ m: 0, color: 'text.secondary' }}>
        {subScoreName(subScore)}
      </Typography>
      {subScore.state === 'scored' ? (
        <Typography component="p" sx={{ m: 0, fontSize: 'h3.fontSize', fontWeight: 'bold' }}>
          <span aria-hidden>
            {subScore.score}
            <Box component="span" sx={{ fontSize: '0.6em', fontWeight: 'normal' }}>
              /10
            </Box>
          </span>
          <span className="visually-hidden">
            {t('adaptation-score-of-ten', { score: subScore.score })}
          </span>
        </Typography>
      ) : (
        <Typography component="p" sx={{ m: 0, pt: 1, color: 'text.secondary' }}>
          {notApplicable ? t('adaptation-not-applicable') : t('adaptation-not-assessed')}
        </Typography>
      )}
    </Paper>
  );
}

type Props = {
  hazard: Hazard;
  measures: Measure[];
  linkedActions: LinkedAction[];
  /** Set for the hazards whose zones the map shows. */
  map: AdaptationMapData | null;
  mapboxAccessToken: string | null;
};

export default function HazardDetail(props: Props) {
  const { hazard, measures, linkedActions, map, mapboxAccessToken } = props;
  const t = useTranslations();
  const format = useAdaptationFormat();
  const name = format.hazardName(hazard);
  const inlineName = format.hazardNameInline(hazard);
  const summaryText = format.summary(hazard);

  return (
    <ContentContainer sx={{ py: 5 }}>
      <Box component="nav" aria-label={t('adaptation-nav-label')} sx={{ mb: 2 }}>
        <Link href={ADAPTATION_PATH}>{t('adaptation-nav-label')}</Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{name}</span>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          gap: { xs: 2, md: 5 },
          mb: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" sx={{ mt: 0 }}>
            {name}
          </Typography>
          {summaryText && (
            <Typography sx={{ fontSize: 'h5.fontSize', maxWidth: '40em', mb: 2 }}>
              {summaryText}
            </Typography>
          )}
          {hazard.narrative && (
            <Typography sx={{ maxWidth: '40em', m: 0 }}>{hazard.narrative}</Typography>
          )}
        </Box>
        <Paper variant="outlined" sx={{ width: { md: 240 }, flex: 'none', p: 2 }}>
          {hazard.score != null && hazard.level != null ? (
            <>
              <Typography component="p" sx={{ m: 0, fontSize: 'h1.fontSize', fontWeight: 'bold' }}>
                <span aria-hidden>
                  {hazard.score}
                  <Box component="span" sx={{ fontSize: '0.45em', fontWeight: 'normal' }}>
                    /10
                  </Box>
                </span>
                <span className="visually-hidden">
                  {t('adaptation-score-of-ten', { score: hazard.score })}
                </span>
              </Typography>
              <Typography sx={{ mb: 1 }}>{t(`adaptation-level-${hazard.level}`)}</Typography>
              <ScoreBar score={hazard.score} />
            </>
          ) : (
            <Typography sx={{ m: 0 }}>{t('adaptation-not-assessed')}</Typography>
          )}
        </Paper>
      </Box>

      {hazard.subScores.length > 0 && (
        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h3" component="h2">
            {t('adaptation-subscores-heading')}
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: `repeat(${Math.min(hazard.subScores.length, 4)}, minmax(0, 1fr))`,
              },
              gap: 2,
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {hazard.subScores.map((subScore) => (
              <SubScoreCard key={subScore.id} subScore={subScore} />
            ))}
          </Box>
        </Box>
      )}

      {hazard.figures.length > 0 && (
        <Paper component="section" variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
          <Typography variant="h3" component="h2" sx={{ mt: 0 }}>
            {t('adaptation-figures-heading')}
          </Typography>
          <Box component="dl" sx={{ m: 0 }}>
            {hazard.figures.map((figure) => (
              <Box
                key={figure.id}
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  columnGap: 2,
                  py: 0.75,
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography component="dt" sx={{ fontWeight: 'normal' }}>
                  {format.figureLabel(figure)}
                </Typography>
                <Typography component="dd" sx={{ m: 0, fontWeight: 'bold' }}>
                  {format.figureValue(figure)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {map && mapboxAccessToken && (
        <Box sx={{ mb: 4 }}>
          <HazardMap
            accessToken={mapboxAccessToken}
            map={map}
            heading={t('adaptation-map-heading-flood')}
            caption={hazard.sourceName}
          />
        </Box>
      )}

      <Box sx={{ mb: 4 }}>
        <MeasureList measures={measures} hazardName={inlineName} />
      </Box>

      {linkedActions.length > 0 && (
        <Box component="section">
          <Typography variant="h3" component="h2">
            {t('adaptation-actions-heading-hazard', { hazard: inlineName })}
          </Typography>
          <LinkedActions actions={linkedActions} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('adaptation-actions-closing-hazard', {
              count: linkedActions.length,
              hazard: inlineName,
            })}
          </Typography>
        </Box>
      )}

      <AttributionFooter sourceName={hazard.sourceName} updatedAt={hazard.updatedAt} />
    </ContentContainer>
  );
}
