import { useCallback, useMemo, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';

import { setUniqueColors } from '@/common/paths/colors';
import { getMetricValue, getOutcomeTotal } from '@/common/paths/preprocess';
import OutcomeCard from '@/components/paths/outcome/OutcomeCard';
import OutcomeNodeContent from '@/components/paths/outcome/OutcomeNodeContent';
import { activeGoalVar } from '@/context/paths/cache';

import { OutcomenodeType } from '../contentblocks/PathsOutcomeBlock';

const CardSet = styled.div<{
  $color?: string;
  $haschildren?: boolean;
}>`
  position: relative;
  padding-bottom: ${(props) => (props.$haschildren ? '190px' : '1rem')};
  background-color: ${({ theme }) => theme.cardBackground.secondary};
  box-shadow: 3px 3px 12px rgba(33, 33, 33, 0.15);

  &:not(:first-child) {
    margin-top: 1rem;
  }
`;

const SubNodes = styled.div`
  padding: 0.5rem;
`;
const CardDeck = styled.div`
  position: absolute;
  display: flex;
  overflow-x: auto;
  overflow-y: visible;
  width: calc(100% - 1rem);
  bottom: -1rem;
  height: 206px;
  z-index: 1;
  scroll-behavior: smooth;
`;

const ContentArea = styled.div`
  padding: 0.5rem;
`;

const Bar = styled.div`
  display: flex;
  margin: 0.5rem 0 1.5rem;
  height: 1rem;
  border: ${(props) => props.color} solid;
  border-width: 0;
  border-top: 0;
  cursor: pointer;
`;

const BarHeader = styled.h5`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor.tertiary};
`;

const Segment = styled.div`
  display: inline-block;
  position: relative;
  border: ${(props) => props.theme.themeColors.white} solid;
  border-width: 2px;
  height: 1.5rem;

  &.hovered::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.25rem;
    background-color: ${(props) => props.theme.graphColors.grey050};
    bottom: -0.5rem;
  }

  &.active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.25rem;
    background-color: ${(props) => props.theme.graphColors.grey090};
    bottom: -0.5rem;
  }
`;

const BarSeparator = styled.div`
  display: inline-block;
  position: relative;
  height: 2rem;
  width: 2px;
  background-color: ${(props) => props.theme.graphColors.grey070};
`;

const DEFAULT_NODE_ORDER = 100;

function orderByMetric(nodes) {
  // We use the most recent value to sort the nodes
  function getLastValue(node) {
    const { metric } = node;
    // TODO: Use metricDim
    if (!metric) return undefined;
    const lastValue = metric.historicalValues[metric.historicalValues.length - 1]?.value;
    // if the metric has no last historical value undefined should be returned
    return lastValue;
  }

  // We order the nodes by default their order field ascending
  // If no order is set, we use the most recent historical value to sort the nodes descending
  // If there is no value for the metric, it should be ordered last
  nodes.sort((a, b) => {
    const aVal = getLastValue(a);
    const bVal = getLastValue(b);

    // Make sure undefined values are last
    if (aVal === undefined && bVal === undefined) {
      return 0;
    }
    if (aVal === undefined) {
      return 1;
    }
    if (bVal === undefined) {
      return -1;
    }

    // If both nodes have order, sort by order

    // First sort by the order field
    let aOrder = a.order ?? DEFAULT_NODE_ORDER;
    let bOrder = b.order ?? DEFAULT_NODE_ORDER;
    if (aOrder < 0) aOrder = DEFAULT_NODE_ORDER - aOrder;
    if (bOrder < 0) bOrder = DEFAULT_NODE_ORDER - bOrder;
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    // or if order is the same, use metric values
    if (a.order != null && b.order != null) {
      return b.order - a.order;
    }
    return bVal - aVal;
  });
}

type OutcomeCardSetProps = {
  nodeMap: Map<string, OutcomenodeType>;
  rootNode: OutcomenodeType;
  parentColor: string;
  startYear: number;
  endYear: number;
  activeScenario: string;
  activeNodeId: string | undefined;
  lastActiveNodeId: string | undefined;
  setLastActiveNodeId: (s: string) => void;
  subNodesTitle: string;
  refetching: boolean;
};

const OutcomeCardSet = ({
  nodeMap,
  rootNode,
  parentColor,
  startYear,
  endYear,
  activeScenario,
  activeNodeId,
  lastActiveNodeId,
  setLastActiveNodeId,
  subNodesTitle,
  refetching,
}: OutcomeCardSetProps) => {
  const [hoveredNodeId, setHoveredNodeId] = useState(undefined);
  const { cardNodes, subNodeMap } = useMemo(() => {
    const inputNodeIds = rootNode.inputNodes.map((node) => node.id);
    const cardNodes = [...nodeMap.values()]
      .filter((node) => inputNodeIds.indexOf(node.id) >= 0)
      .map((node) => ({ ...node }));
    orderByMetric(cardNodes);
    setUniqueColors(
      cardNodes,
      (node) => node.color,
      (node, color) => {
        node.color = color;
      }
    );
    const subNodeMap = new Map(
      cardNodes.map((cn) => [
        cn.id,
        cn.inputNodes.map((child) => nodeMap.get(child.id)!).filter((child) => !!child),
      ])
    );
    return {
      cardNodes,
      subNodeMap,
    };
  }, [nodeMap, rootNode.inputNodes]);

  const activeGoal = useReactiveVar(activeGoalVar);
  // We have a different group for indirect emissions (hack)
  const separateYears = activeGoal?.separateYears || null;
  const hideForecast = separateYears && separateYears.length > 1;
  const inputNodes = rootNode.inputNodes.filter((node) => !nodeMap.has(node.id));

  const handleHover = useCallback(
    (evt) => {
      setHoveredNodeId(evt);
    },
    [setHoveredNodeId]
  );

  const handleClick = useCallback(
    (segmentId) => {
      // if active node clicked, make its parent active node
      const newActiveNode = segmentId === activeNodeId ? rootNode.id : segmentId;
      setLastActiveNodeId(newActiveNode);
    },
    [activeNodeId, rootNode.id, setLastActiveNodeId]
  );

  const negativeNodesTotal = getOutcomeTotal(
    cardNodes.filter((node) => getMetricValue(node, endYear) < 0),
    endYear
  );
  const positiveNodesTotal = getOutcomeTotal(
    cardNodes.filter((node) => getMetricValue(node, endYear) >= 0),
    endYear
  );

  return (
    <>
      <CardSet id={rootNode.id} $color={rootNode.color!} $haschildren={cardNodes.length > 0}>
        <ContentArea>
          <OutcomeNodeContent
            node={rootNode}
            subNodes={cardNodes}
            color={rootNode.color || parentColor}
            startYear={startYear}
            endYear={endYear}
            activeScenario={activeScenario}
            refetching={refetching}
            separateYears={separateYears}
          />
        </ContentArea>
        {cardNodes.length > 0 && (
          <SubNodes>
            <BarHeader>{subNodesTitle}</BarHeader>
            <CardDeck role="tablist">
              {cardNodes.map((node, indx) => (
                <OutcomeCard
                  key={node.id}
                  startYear={separateYears ? separateYears[0] : startYear}
                  endYear={separateYears ? separateYears[separateYears.length - 1] : endYear}
                  node={node}
                  state={activeNodeId === undefined ? 'closed' : 'open'}
                  hovered={hoveredNodeId === node.id}
                  active={activeNodeId === node.id}
                  onHover={handleHover}
                  handleClick={handleClick}
                  color={node.color || parentColor}
                  total={positiveNodesTotal - negativeNodesTotal}
                  positiveTotal={positiveNodesTotal}
                  negativeTotal={negativeNodesTotal}
                  refetching={refetching}
                  hideForecast={hideForecast}
                  disabled={
                    node.metric?.forecastValues?.length === 0 &&
                    node.metric?.historicalValues?.length === 0
                  }
                />
              ))}
            </CardDeck>
          </SubNodes>
        )}
      </CardSet>
    </>
  );
};

export default OutcomeCardSet;
