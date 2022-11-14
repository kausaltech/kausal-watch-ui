import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import Map, {useControl, useMap} from 'react-map-gl';

import LegendControl from '@kausal/mapboxgl-legend';
import 'mapbox-gl/dist/mapbox-gl.css';

interface CartographyVisualisationBlockProps {
  styleUrl: string;
  accessToken: string;
  hasSidebar: boolean;
  styleOverrides: object;
}

const DEFAULT_LABELS = { other: false };

const applyStyleOverrides = (style, overrides) => {
  style.layers
    .filter(l => l.source !== undefined && l.source !== 'composite')
    .forEach(layer => {
      let labelOverrides = {};
      let layerName = layer.id;

      const labelSource = overrides?.labels;
      if (labelSource !== undefined) {
        const layerLabels = labelSource[layer.id];
        if (layerLabels !== undefined) {
          labelOverrides = layerLabels;
          layerName = layerLabels[layer.id] ?? layerName;
        }
      }
      const { paint } = layer;
      for (const key of ['circle-color', 'fill-color']) {
        /* mapboxgl-legend displays the color code for these
           simple one-color layers. Override that for a simpler
           legend.
         */
        if (typeof paint[key] === 'string') {
          labelOverrides[paint[key]] = layerName;
          layerName = ' ';
        }
        else if (Array.isArray(paint[key])) {
          if (paint[key][0] === 'step') {
            /* https://github.com/markusand/mapboxgl-legend/issues/13 */
            labelOverrides['other'] = `< ${paint[key][3]}`;
          }
        }
      }
      layer.metadata = {
        labels: Object.assign(DEFAULT_LABELS, labelOverrides),
        name: layerName
      };
    });

  style.layers = style.layers.filter(
    l => (overrides.selections.layers[l.id] ?? true) !== false
  );
  return style;
}

const LegendWithOverrides = ({styleOverrides}) => {
  const overrides = (styleOverrides && styleOverrides.length > 0) ? JSON.parse(styleOverrides) : null
  const {current: map} = useMap();
  let mapLegendApplied = false;
  map?.getMap().on('styledata', () => {

    const style = map.getStyle();

    const center = style.center;
    if (center && center.length === 2) {
      map.setCenter([center[0], center[1]]);
    }
    if (style.zoom) {
      map.setZoom(style.zoom);
    }
    if (mapLegendApplied) return;

    applyStyleOverrides(style, overrides);
    const layersToAdd = style.layers
      .filter(l => overrides.labels === undefined || (overrides.labels[l.id] ?? {})[l.id] !== '-')
      .map(l => l.id);

    const legend = new LegendControl({layers: layersToAdd});
    map.getMap().addControl(legend, 'top-left');
    map.getMap().setStyle(style, {diff: false})

    mapLegendApplied = true;
  });
  return null;
}

const CartographyVisualisationBlock = ({styleUrl, accessToken, styleOverrides, hasSidebar}: CartographyVisualisationBlockProps) => {
  if (accessToken === undefined) {
    console.warn('No access token provided for MapBox visualisation.');
    return null;
  }
  return (
    <Container>
      <Row>
        <Col
          xl={{ size: 9, offset: hasSidebar ? 3 : 2 }}
          lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <Map
            style={{width: '100%', height: 500}}
            mapboxAccessToken={accessToken}
            mapStyle={`mapbox://styles/ilmastogis/${styleUrl}` ?? ''}
          >
            <LegendWithOverrides styleOverrides={styleOverrides} />
          </Map>
        </Col>
      </Row>
    </Container>
  )
}

export default CartographyVisualisationBlock;
