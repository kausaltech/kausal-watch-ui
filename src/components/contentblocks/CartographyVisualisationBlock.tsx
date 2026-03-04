import React, { useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import 'mapbox-gl/dist/mapbox-gl.css';
import LegendControl, { type MapboxMap } from 'mapboxgl-legend';
import 'mapboxgl-legend/dist/style.css';
import Map, { NavigationControl, useMap } from 'react-map-gl/mapbox';
import { Col, Container, Row } from 'reactstrap';

import type { CommonContentBlockProps } from '@/common/blocks.types';

interface CartographyVisualisationBlockProps extends CommonContentBlockProps {
  styleUrl: string;
  accessToken: string;
  hasSidebar: boolean;
  styleOverrides: string | null;
}

const DEFAULT_LABELS = { other: false };

type StyleOverride = {
  labels: Record<string, Record<string, string>>;
  selections: {
    layers: Record<string, boolean>;
  };
};

const applyStyleOverrides = (style: mapboxgl.Style, overrides: StyleOverride | null) => {
  style.layers
    .filter((l) => 'source' in l && l.source !== undefined && l.source !== 'composite')
    .forEach((layer) => {
      if (!('paint' in layer) || layer.paint === undefined) {
        return;
      }
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
      for (const key of ['circle-color', 'fill-color', 'line-color']) {
        /* mapboxgl-legend displays the color code for these
           simple one-color layers. Override that for a simpler
           legend.
         */
        if (typeof paint[key] === 'string') {
          labelOverrides[paint[key]] = layerName;
          layerName = ' ';
        }
      }
      layer.metadata = {
        labels: Object.assign({}, DEFAULT_LABELS, labelOverrides),
        name: layerName,
      };
    });

  style.layers = style.layers.filter((l) => (overrides.selections.layers[l.id] ?? true) !== false);
  return style;
};

const LegendWithOverrides = ({ styleOverrides }: { styleOverrides: string | null }) => {
  const overrides =
    styleOverrides && styleOverrides.length > 0
      ? (JSON.parse(styleOverrides) as StyleOverride)
      : null;
  const { current: map } = useMap();
  const mapInstance = map?.getMap() as MapboxMap | undefined;
  const styleLoadHandler = useCallback(() => {
    if (!map || !mapInstance) return;
    const style = mapInstance.getStyle();
    const center = style.center;
    if (center && center.length === 2) {
      map.setCenter([center[0], center[1]]);
    }
    if (style.zoom) {
      map.setZoom(style.zoom);
    }

    applyStyleOverrides(style, overrides);
    const layersToAdd = style.layers
      .filter(
        (l) =>
          overrides !== null &&
          (overrides.labels === undefined || (overrides.labels[l.id] ?? {})[l.id] !== '-')
      )
      .map((l) => l.id);

    const legend = new LegendControl({ layers: layersToAdd });
    mapInstance.addControl(legend, 'top-left');
    mapInstance.setStyle(style, { diff: false });
  }, [map, mapInstance, overrides]);
  useEffect(() => {
    if (!mapInstance) return;
    mapInstance.once('style.load', styleLoadHandler);
    return () => {
      mapInstance.off('style.load', styleLoadHandler);
    };
  }, [mapInstance, styleLoadHandler]);
  return null;
};

const CSSOverride = styled.div`
  --map-legend-label-color: #111;
`;

const CartographyVisualisationBlock = (props: CartographyVisualisationBlockProps) => {
  const { id = '', styleUrl, accessToken, styleOverrides, hasSidebar } = props;
  if (accessToken === undefined) {
    console.warn('No access token provided for MapBox visualisation.');
    return null;
  }
  return (
    <Container id={id}>
      <Row>
        <Col
          xl={{ size: 8, offset: hasSidebar ? 4 : 2 }}
          lg={{ size: 8, offset: hasSidebar ? 4 : 2 }}
          md={{ size: 10, offset: 1 }}
        >
          <CSSOverride>
            <Map
              style={{ width: '100%', height: 500 }}
              mapboxAccessToken={accessToken}
              cooperativeGestures={true}
              mapStyle={`mapbox://styles/ilmastogis/${styleUrl}`}
            >
              <LegendWithOverrides styleOverrides={styleOverrides} />
              <NavigationControl showZoom={true} showCompass={false} />
            </Map>
          </CSSOverride>
        </Col>
      </Row>
    </Container>
  );
};

export default CartographyVisualisationBlock;
