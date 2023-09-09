import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePlan } from 'context/plan';
import { useTheme } from 'common/theme';
import { aplans } from 'common/api';
import { Alert } from 'reactstrap';
import { captureException } from 'common/sentry';
import ContentLoader from 'components/common/ContentLoader';
import IndicatorCard from './IndicatorCard';
import Connector from './Connector';

const CausalChain = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 1em;
  margin-bottom: 3em;
`;

const Column = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const Indicator = styled.div`
  flex: 1 1 0;
  position: relative;
  width: 240px;
  min-height: 160px;
  margin: 10px 20px;

  .card {
    height: 100%;
  }
`;

function getGridHeight(nodes) {
  let column = 0;
  let columnIndicators = nodes;
  let highestColumn = 0;

  while (columnIndicators.length !== 0) {
    columnIndicators = nodes.filter((item) => item.column === column);
    if (columnIndicators.length > highestColumn)
      highestColumn = columnIndicators.length;
    column += 1;
  }

  return highestColumn;
}

function getColumnHeight(nodes, column) {
  const columnIndicators = nodes.filter((item) => item.column === column);
  return columnIndicators.length;
}

function drawEdge(nodes, edge, toIndex, gridHeight, theme) {
  const fromNode = nodes.find((item) => edge.from === item.id);
  const toNode = nodes.find((item) => edge.to === item.id);

  if (!fromNode || !toNode) {
    return '';
  }

  const fromIndex = fromNode.from.findIndex((x) => x.id === edge.id);

  const nodeHeight = 160;
  const fromNodeHeight =
    (gridHeight / getColumnHeight(nodes, fromNode.column)) * nodeHeight;
  const fromNodeFromTop = fromNode.row * fromNodeHeight;

  const toNodeHeight =
    (gridHeight / getColumnHeight(nodes, toNode.column)) * nodeHeight;
  const toNodeFromTop = toNode.row * toNodeHeight;

  const fromDistribution = fromNodeHeight / fromNode.from.length;
  const fromOffset = fromIndex * fromDistribution + fromDistribution / 2;
  let startY = fromNodeFromTop - toNodeFromTop + fromOffset;

  const toDistribution = toNodeHeight / toNode.to.length;
  const toOffset = toIndex * toDistribution + toDistribution / 2;
  let endY = toOffset;

  let startX = -45 + (fromNode.column - toNode.column + 1) * 280;
  let endX = 0;

  let bend = startY < endY ? -5 : 5;

  if (fromNode.column === toNode.column && fromNode.row < toNode.row) {
    startX = endX = 120;
    endY = -5;
    startY = fromNodeFromTop + fromNodeHeight - toNodeFromTop - 25;
    bend = 0;
  }

  if (fromNode.column === toNode.column && fromNode.row > toNode.row) {
    startX = endX = 120;
    endY = toNodeHeight;
    startY = fromNodeFromTop - toNodeFromTop + 25;
    bend = 0;
  }

  let edgeColor;
  switch (edge.effect_type) {
    case 'increases':
      edgeColor = theme.graphColors.green050;
      break;
    case 'decreases':
      edgeColor = theme.graphColors.red050;
      break;
    case 'part_of':
      edgeColor = theme.graphColors.blue070;
      break;
    default:
      edgeColor = theme.themeColors.dark;
      break;
  }

  return (
    <Connector
      startPoint={{ x: startX, y: startY }}
      endPoint={{ x: endX, y: endY }}
      color={edgeColor}
      bend={bend}
    />
  );
}

function createChain(nodes, theme) {
  let column = 0;
  const chain: ReactElement[] = [];
  const gridHeight = getGridHeight(nodes);
  let columnIndicators = nodes;

  while (columnIndicators.length !== 0) {
    const children: ReactElement[] = [];

    columnIndicators = nodes.filter((item) => item.column === column);

    columnIndicators.forEach((indicator) => {
      let indicatorLevel = 'action';
      if (indicator.type !== 'action')
        indicatorLevel = indicator.indicator_level;
      const connectionsTo: ReactElement[] = [];
      indicator.to.forEach((edge, index) => {
        const edgeElement = drawEdge(nodes, edge, index, gridHeight, theme);
        if (!edgeElement) return;
        connectionsTo.push(<span key={edge.id}>{edgeElement}</span>);
      });

      children.push(
        <Indicator level={indicatorLevel} key={indicator.id}>
          <IndicatorCard
            objectid={String(indicator.object_id)}
            name={indicator.name}
            level={indicatorLevel}
            key={indicator.id}
            latestValue={indicator.latest_value}
            resolution={indicator.time_resolution}
          />
          {connectionsTo}
        </Indicator>
      );
    });
    chain.push(<Column key={column}>{children}</Column>);
    column += 1;
  }
  return chain;
}

const setColumns = (nodes, index, column) => {
  // Assign indicators with columns
  const columned = nodes;

  // Sanity check: Bail out if we have already processed this.
  // FIXME: Otherwise setColumns() can sometimes loop forever
  if ('column' in columned[index]) {
    return columned;
  }
  columned[index].column = column;
  if (columned[index].indicator_level !== 'strategic') {
    columned[index].from.forEach((edge) => {
      const nodeIndex = columned.findIndex((item) => item.id === edge.to);
      setColumns(columned, nodeIndex, column + 1);
    });
  }
  return columned;
};

const setRows = (nodes) => {
  // Assign columned indicators with rows
  let columnIndicators = nodes;
  const griddedIndicators = [];
  let column = 0;
  while (columnIndicators.length !== 0) {
    columnIndicators = nodes.filter((item) => item.column === column);
    columnIndicators.forEach((indicator, row) => {
      const rowIndicator = indicator;
      rowIndicator.row = row;
      griddedIndicators.push(rowIndicator);
    });
    column += 1;
  }
  return griddedIndicators;
};

const combineData = (nodes, edges) => {
  // Combine edges data to indicator nodes
  const indicators = nodes;
  indicators.forEach((item, index) => {
    indicators[index].from = edges.filter((edge) => edge.from === item.id);
    indicators[index].to = edges.filter((edge) => edge.to === item.id);
  });

  const rootIndex = indicators.findIndex((item) => item.to.length === 0);
  const columned = setColumns(indicators, rootIndex, 0);
  const gridded = setRows(columned);
  return gridded;
};
interface Props {
  actionId?: string;
}

function IndicatorCausalVisualisation({ actionId }: Props) {
  const plan = usePlan();
  const theme = useTheme();
  const isServer = typeof window === 'undefined';

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState('');

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function fetchData() {
      aplans
        .get('insight', {
          params: {
            plan: plan.identifier,
            action: actionId,
          },
        })
        .then((result) => {
          setData(result);
          setIsLoaded(true);
        })
        .catch((error) => {
          captureException(error);
          setError(error);
          setIsLoaded(true);
        });
    }

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!data) {
      fetchData();
    }
  }, [actionId, plan.identifier, data]);

  if (error) {
    return (
      <Alert color="danger">
        Error:
        {error.message}
      </Alert>
    );
  }
  if (isServer || !isLoaded) {
    return <ContentLoader />;
  }

  const combinedData = combineData(data?.nodes, data?.edges);

  return (
    <CausalChain className="causal-chain-visualisation">
      {createChain(combinedData, theme)}
    </CausalChain>
  );
}

export default IndicatorCausalVisualisation;
