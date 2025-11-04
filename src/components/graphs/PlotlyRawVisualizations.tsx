import type { PlotParams } from 'react-plotly.js';
import { Col, Row } from 'reactstrap';

import Plot from './Plot';

export function PlotlyRawVisualization({ visualizationRaw }: { visualizationRaw: string }) {
  const visualization = JSON.parse(visualizationRaw) as PlotParams;

  if (!('data' in visualization) || !('layout' in visualization)) {
    return null;
  }

  return <Plot noValidate={true} {...visualization} />;
}

export function PlotlyRawVisualizations({ visualizationsRaw }: { visualizationsRaw: string[] }) {
  const plotlyRawVisualizations =
    visualizationsRaw
      .map((visualization) => JSON.parse(visualization) as PlotParams)
      .filter(
        (visualization) =>
          visualization != null &&
          typeof visualization === 'object' &&
          'data' in visualization &&
          'layout' in visualization
      ) ?? [];

  return plotlyRawVisualizations.map((visualization, i) => (
    <Row key={i}>
      <Col sm="12">
        <Plot noValidate={true} {...visualization} />
      </Col>
    </Row>
  ));
}
