import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePlan } from 'context/plan';
import { useTheme } from 'styled-components';
import { captureException } from '@sentry/nextjs';

import { aplans } from 'common/api';
import { Alert } from 'reactstrap';
import ContentLoader from 'components/common/ContentLoader';
import IndicatorCard from 'components/indicators/IndicatorCard';
import Connector from 'components/indicators/Connector';
import { useLocale } from 'next-intl';

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

const StyledIndicator = styled.div`
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

function drawEdge(nodes, edge, toIndex, gridHeight, theme, hoverId) {
  const fromNode = nodes.find((item) => edge.from === item.id);
  const toNode = nodes.find((item) => edge.to === item.id);

  if (!fromNode || !toNode) {
    return '';
  }

  const faded =
    hoverId && hoverId !== fromNode.id && hoverId != toNode.id ? true : false;
  const fromIndex = fromNode.from.findIndex((x) => x.id === edge.id);

  const nodeHeight = 160;
  const fromNodeHeight =
    (gridHeight / getColumnHeight(nodes, fromNode.column)) * nodeHeight;
  const fromNodeFromTop = fromNode.row * (fromNodeHeight + 20);

  const toNodeHeight =
    (gridHeight / getColumnHeight(nodes, toNode.column)) * nodeHeight;
  const toNodeFromTop = toNode.row * (toNodeHeight + 20);

  const fromDistribution = fromNodeHeight / (fromNode.from.length + 1);
  const fromOffset = fromIndex * fromDistribution + fromDistribution / 2;
  let startY = fromNodeFromTop - toNodeFromTop + fromOffset;

  const toDistribution = toNodeHeight / toNode.to.length;
  const toOffset = toIndex * toDistribution + toDistribution / 2;
  let endY = toOffset;

  let startX = -45 + (fromNode.column - toNode.column + 1) * 280;
  let endX = 0;

  let bend = startY < endY ? -5 : 5;

  // Pointing backward
  if (fromNode.column > toNode.column) {
    startX = (fromNode.column - toNode.column) * 280;
    endX = 235;
  }

  // Pointing down
  if (fromNode.column === toNode.column && fromNode.row < toNode.row) {
    startX = endX = 200;
    endY = -5;
    startY = fromNodeFromTop + fromNodeHeight - toNodeFromTop - 25;
    bend = 0;
  }

  // Pointing up
  if (fromNode.column === toNode.column && fromNode.row > toNode.row) {
    startX = endX = 200;
    endY = toNodeHeight + 5;
    startY = fromNodeFromTop - toNodeFromTop;
    bend = 0;
  }

  let edgeColor;
  let edgeIcon = '';

  switch (edge.effect_type) {
    case 'increases':
      edgeColor = theme.graphColors.green070;
      edgeIcon = '+';
      break;
    case 'decreases':
      edgeColor = theme.graphColors.red050;
      edgeIcon = '-';
      break;
    case 'part_of':
      edgeColor = theme.graphColors.blue070;
      edgeIcon = '⊂';
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
      icon={edgeIcon}
      faded={faded}
    />
  );
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

const combineData = (unfilteredNodes, unfilteredEdges) => {
  // Combine edges data to indicator nodes

  // FIXME: Use available data from old insight API to filter out "draft" indicators
  const nodes = unfilteredNodes.filter(
    (item) => item.type !== 'indicator' || item?.indicator_level !== ''
  );
  const nodeIds = nodes.map((item) => item.id);
  const edges = unfilteredEdges.filter(
    (item) => nodeIds.includes(item.from) && nodeIds.includes(item.to)
  );

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

// FIXME: Type properly
type InteractiveCausalChainProps = {
  nodes: any[];
};

const InteractiveCausalChain = (props: InteractiveCausalChainProps) => {
  const { nodes } = props;
  const theme = useTheme();
  const [cardHover, setCardHover] = useState(null);

  let column = 0;
  const chain: ReactElement[] = [];
  const gridHeight = getGridHeight(nodes);
  let columnIndicators = nodes;

  const indicatorGoal = null; //FIXME: get goal value from API

  while (columnIndicators.length !== 0) {
    const children: ReactElement[] = [];

    columnIndicators = nodes.filter((item) => item.column === column);

    columnIndicators.forEach((indicator) => {
      let indicatorLevel = 'action';
      if (indicator.type !== 'action')
        indicatorLevel = indicator.indicator_level;
      const connectionsTo: ReactElement[] = [];
      indicator.to.forEach((edge, index) => {
        const edgeElement = drawEdge(
          nodes,
          edge,
          index,
          gridHeight,
          theme,
          cardHover
        );
        if (!edgeElement) return;
        connectionsTo.push(<span key={edge.id}>{edgeElement}</span>);
      });

      const isConnected =
        cardHover &&
        (cardHover === indicator.id ||
          indicator.to.some((edge) => edge.from === cardHover));

      children.push(
        <StyledIndicator
          key={indicator.id}
          onMouseEnter={(e) => {
            setCardHover(indicator.id);
          }}
          onMouseLeave={(e) => {
            setCardHover(null);
          }}
        >
          <IndicatorCard
            objectid={String(indicator.object_id)}
            name={indicator.name}
            level={indicatorLevel}
            key={indicator.id}
            latestValue={indicator.latest_value}
            resolution={indicator.time_resolution}
            goalValue={indicatorGoal}
            disabled={cardHover && !isConnected}
          />
          {connectionsTo}
        </StyledIndicator>
      );
    });
    chain.push(<Column key={column}>{children}</Column>);
    column += 1;
  }

  return (
    <CausalChain className="causal-chain-visualisation">{chain}</CausalChain>
  );
};

type IndicatorCausalVisualisationProps = {
  actionId: string;
};

function IndicatorCausalVisualisation({
  actionId,
}: IndicatorCausalVisualisationProps) {
  const plan = usePlan();
  const isServer = typeof window === 'undefined';
  const locale = useLocale();

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState('');

  const baseUrl = '';
  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function fetchData() {
      const params = {
        plan: plan.identifier,
        action: actionId,
        language: locale,
      };
      aplans
        .get('insight', { params })
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

  return (
    <div>
      <InteractiveCausalChain nodes={combineData(data?.nodes, data?.edges)} />
    </div>
  );
}

export default IndicatorCausalVisualisation;
