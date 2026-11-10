'use client';

import { Box, Paper, Typography } from '@mui/material';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslations } from 'next-intl';
import Map, { Layer, NavigationControl, Source } from 'react-map-gl/mapbox';

import type { AdaptationMapData } from '../get-adaptation-data';

const BOUNDARY_COLOR = '#4A524E';
const ZONE_CLASS_PROPERTY = 'esri_symbology';
/* FEMA's flood zone classes, from the most to the least hazardous. */
const ZONE_COLORS: Record<string, string> = {
  'Regulatory Floodway': '#1F4C7A',
  '1% Annual Chance Flood Hazard': '#5B8DBE',
  '0.2% Annual Chance Flood Hazard': '#A9C6E0',
};
const OTHER_ZONE_COLOR = '#8A9BA8';

function LegendItem({ color, label, outline }: { color: string; label: string; outline?: true }) {
  return (
    <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        aria-hidden
        sx={{
          width: 14,
          height: 14,
          borderRadius: 0.5,
          flex: 'none',
          ...(outline ? { border: `2px dashed ${color}` } : { bgcolor: color }),
        }}
      />
      <Typography variant="body2" component="span">
        {label}
      </Typography>
    </Box>
  );
}

type Props = {
  accessToken: string;
  map: AdaptationMapData;
  heading: string;
  /** Shown beside the heading, e.g. the name of the data source. */
  caption?: string | null;
};

/** The community's boundary and its mapped flood zones on an interactive map. */
export default function HazardMap({ accessToken, map, heading, caption }: Props) {
  const t = useTranslations();
  const [west, south, east, north] = map.bounds;

  // The legend lists the classes the data names, in the order of ZONE_COLORS
  const presentClasses = new Set(
    map.floodZones.map((zone) => zone.properties?.[ZONE_CLASS_PROPERTY])
  );
  const knownClasses = Object.keys(ZONE_COLORS).filter((name) => presentClasses.has(name));
  const otherClasses = [...presentClasses].filter(
    (name): name is string => typeof name === 'string' && !(name in ZONE_COLORS)
  );

  return (
    <Paper component="section" variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          columnGap: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ m: 0 }}>
          {heading}
        </Typography>
        {caption && (
          <Typography variant="body2" sx={{ m: 0, color: 'text.secondary' }}>
            {caption}
          </Typography>
        )}
      </Box>
      <div role="region" aria-label={t('adaptation-map-label')}>
        <Map
          style={{ width: '100%', height: 420 }}
          mapboxAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/light-v11"
          cooperativeGestures
          initialViewState={{
            bounds: [
              [west, south],
              [east, north],
            ],
            fitBoundsOptions: { padding: 32 },
          }}
        >
          <Source
            id="flood-zones"
            type="geojson"
            data={{ type: 'FeatureCollection', features: map.floodZones }}
          >
            <Layer
              id="flood-zones-fill"
              type="fill"
              paint={{
                'fill-color': [
                  'match',
                  ['get', ZONE_CLASS_PROPERTY],
                  ...Object.entries(ZONE_COLORS).flat(),
                  OTHER_ZONE_COLOR,
                ],
                'fill-opacity': 0.7,
              }}
            />
          </Source>
          {map.boundary && (
            <Source id="boundary" type="geojson" data={map.boundary}>
              <Layer
                id="boundary-line"
                type="line"
                paint={{
                  'line-color': BOUNDARY_COLOR,
                  'line-width': 2,
                  'line-dasharray': [3, 2],
                }}
              />
            </Source>
          )}
          <NavigationControl showZoom showCompass={false} />
        </Map>
      </div>
      <Box
        component="ul"
        sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, listStyle: 'none', m: 0, px: 2, py: 1.5 }}
      >
        {map.boundary && (
          <LegendItem outline color={BOUNDARY_COLOR} label={t('adaptation-map-boundary')} />
        )}
        {knownClasses.map((name) => (
          <LegendItem key={name} color={ZONE_COLORS[name]} label={name} />
        ))}
        {otherClasses.map((name) => (
          <LegendItem key={name} color={OTHER_ZONE_COLOR} label={name} />
        ))}
      </Box>
    </Paper>
  );
}
