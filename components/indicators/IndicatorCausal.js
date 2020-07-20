import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle, Alert,
} from 'reactstrap';
import styled, { withTheme } from 'styled-components';
import { IndicatorLink } from '../../common/links';
import moment from '../../common/moment';

import PlanContext from '../../context/plan';
import { aplans, CancelToken } from '../../common/api';
import ContentLoader from '../common/ContentLoader';
import { captureException } from '../../common/sentry';

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

const Indicator = styled(Card)`
  flex: 1 1 0;
  width: 240px;
  hyphens: auto;
  margin: 10px 20px;
  line-height: 1;
  min-height: 160px;
  border: 0;
  border-radius: ${(props) => props.theme.cardBorderRadius};

  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColorFg;
      case 'operational':
        return props.theme.operationalIndicatorColorFg;
      case 'tactical':
        return props.theme.tacticalIndicatorColorFg;
      case 'strategic':
        return props.theme.strategicIndicatorColorFg;
      default:
        return props.theme.themeColors.black;
    }
  }};
  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.operationalIndicatorColor;
      case 'tactical':
        return props.theme.tacticalIndicatorColor;
      case 'strategic':
        return props.theme.strategicIndicatorColor;
      default:
        return '#cccccc';
    }
  }};
  
  a {
    color: inherit;

    &:hover {
      color: inherit;
      text-decoration: underline;
    }
  }
`;

const IndicatorType = styled.div`
  opacity: .75;
  font-size: 75%;
  margin-bottom: .5em;
`;

const IndicatorTitle = styled(CardTitle)`
  font-weight: 600;
`;

const IndicatorValue = styled.div`
  margin-top: 1em;
  font-weight: 600;
  opacity: .75;
`;

const IndicatorValueUnit = styled.span`
  font-size: 75%;
  font-weight: 400;
`;

const IndicatorValueTime = styled.div`
  font-size: 75%;
  font-weight: 400;
`;

function getIndicatorLevelName(level) {
  switch (level) {
    case 'action':
      return 'Toimenpide';
    case 'operational':
      return 'Toiminnallinen mittari';
    case 'tactical':
      return 'Taktinen mittari';
    case 'strategic':
      return 'Strateginen mittari';
    default:
      return '';
  }

}

function IndicatorLatestValue(props) {
  const { indicator } = props;

  const latestValue = indicator.latest_value;
  if (!latestValue) return null;

  const timeResolution = indicator.time_resolution;
  const time = moment(latestValue.date, 'YYYY-MM-DD');
  let tagVal;
  let formattedTime;

  if (timeResolution === 'year') {
    formattedTime = time.format('YYYY');
    tagVal = formattedTime;
  } else if (timeResolution === 'month') {
    formattedTime = time.format('YYYY-MM');
    tagVal = 'MMMM YYYY';
  } else {
    formattedTime = time.format('DD.MM.YYYY');
    tagVal = time.format(); // ISO format
  }

  return (
    <IndicatorValue>
      {Number.isInteger(latestValue.value) ? latestValue.value : latestValue.value.toFixed(2).replace('.', ',')}
      {' '}
      <IndicatorValueUnit>
        {latestValue.unit}
      </IndicatorValueUnit>
      <IndicatorValueTime>
        <time dateTime={tagVal}>{formattedTime}</time>
      </IndicatorValueTime>
    </IndicatorValue>
  );
}

function getGridHeight(nodes) {
  let column = 0;
  let columnIndicators = nodes;
  let highestColumn = 0;

  while (columnIndicators.length !== 0) {
    columnIndicators = nodes.filter((item) => item.column === column);
    if (columnIndicators.length > highestColumn) highestColumn = columnIndicators.length;
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

  const fromIndex = fromNode.from.findIndex((x) => x.id === edge.id);

  if (!fromNode || !toNode) {
    return '';
  }

  const nodeHeight = 160;
  const fromNodeHeight = (gridHeight / getColumnHeight(nodes, fromNode.column)) * nodeHeight;
  const fromNodeFromTop = fromNode.row * fromNodeHeight;

  const toNodeHeight = (gridHeight / getColumnHeight(nodes, toNode.column)) * nodeHeight;
  const toNodeFromTop = toNode.row * toNodeHeight;

  const fromDistribution = (fromNodeHeight / fromNode.from.length);
  const fromOffset = fromIndex * fromDistribution + fromDistribution / 2;
  let startY = fromNodeFromTop - toNodeFromTop + fromOffset;

  const toDistribution = (toNodeHeight / toNode.to.length);
  const toOffset = toIndex * toDistribution + toDistribution / 2;
  let endY = toOffset;

  let startX = -45 + (fromNode.column - toNode.column + 1) * 280;
  let endX = 0;

  let bend = startY < endY ? -5 : 5;

  if (fromNode.column === toNode.column && fromNode.row < toNode.row) {
    startX = endX = 120;
    endY = -5;
    startY = fromNodeFromTop + (fromNodeHeight) - toNodeFromTop - 25;
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
      edgeColor = theme.causalityIncreasesColor;
      break;
    case 'decreases':
      edgeColor = theme.causalityDecreasesColor;
      break;
    case 'part_of':
      edgeColor = theme.causalityIsPartOfColor;
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
  const chain = [];
  const gridHeight = getGridHeight(nodes);
  let columnIndicators = nodes;

  while (columnIndicators.length !== 0) {
    const children = [];

    columnIndicators = nodes.filter(item => item.column === column);

    columnIndicators.forEach((indicator) => {
      let indicatorLevel = 'action';
      if (indicator.type !== 'action') indicatorLevel = indicator.indicator_level;
      const connectionsTo = [];
      indicator.to.forEach((edge, index) => {
        const edgeElement = drawEdge(nodes, edge, index, gridHeight, theme);
        if (!edgeElement) return;
        connectionsTo.push(
          <span key={edge.id}>
            {edgeElement}
          </span>,
        );
      });
      children.push(
        <Indicator level={indicatorLevel} key={indicator.id}>
          <CardBody>
            { indicatorLevel !== 'action'
              ? (
                <div>
                  <IndicatorType>{ getIndicatorLevelName(indicatorLevel) }</IndicatorType>
                  <IndicatorLink id={indicator.object_id}>
                    <a><IndicatorTitle>{ indicator.name }</IndicatorTitle></a>
                  </IndicatorLink>
                </div>
              )
              : (
                <div>
                  <IndicatorType>Toimenpide</IndicatorType>
                  <IndicatorTitle>{ indicator.name }</IndicatorTitle>
                </div>
              )
            }
            <IndicatorLatestValue indicator={indicator} />
          </CardBody>
          {connectionsTo}
        </Indicator>,
      );
    });
    chain.push(<Column key={column}>{children}</Column>);
    column += 1;
  }
  return chain;
}

class IndicatorCausal extends React.Component {
  constructor(props) {
    super(props);
    this.cancelToken = CancelToken.source();
    this.state = {
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps) {
    const { actionId } = this.props;
    if (prevProps.actionId !== actionId) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.cancelToken.cancel();
    this.cancelled = true;
  }

  setColumns(nodes, index, column) {
    // Assign indicators with columns
    const columned = nodes;
    columned[index].column = column;
    if (columned[index].indicator_level !== 'strategic') {
      columned[index].from.forEach((edge) => {
        const nodeIndex = columned.findIndex(item => item.id === edge.to);
        this.setColumns(columned, nodeIndex, column + 1);
      });
    }
    return columned;
  }

  setRows(nodes) {
    // Assign columned indicators with rows
    this.columnIndicators = nodes;
    this.griddedIndicators = [];
    let column = 0;
    while (this.columnIndicators.length !== 0) {
      this.columnIndicators = nodes.filter(item => item.column === column);
      this.columnIndicators.forEach((indicator, row) => {
        const rowIndicator = indicator;
        rowIndicator.row = row;
        this.griddedIndicators.push(rowIndicator);
      });
      column += 1;
    }
    return this.griddedIndicators;
  }

  fetchData() {
    const plan = this.context;
    const { actionId } = this.props;

    aplans.get('insight', {
      params: {
        plan: plan.identifier, action: actionId,
      },
      cancelToken: this.cancelToken.token,
    }).then((result) => {
      const { nodes, edges } = result.data;
      this.setState({
        isLoaded: true,
        nodes,
        edges,
      });
    }).catch((error) => {
      if (this.cancelled) return;
      captureException(error);
      this.setState({
        isLoaded: true,
        error,
      });
    });
  }

  combineData(nodes, edges) {
    // Combine edges data to indicator nodes
    this.indicators = nodes;
    this.indicators.forEach((item, index) => {
      this.indicators[index].from = edges.filter(edge => edge.from === item.id);
      this.indicators[index].to = edges.filter(edge => edge.to === item.id);
    });

    this.rootIndex = this.indicators.findIndex(item => item.to.length === 0);
    this.indicators = this.setColumns(this.indicators, this.rootIndex, 0);
    this.indicators = this.setRows(this.indicators);

    return this.indicators;
  }

  render() {
    const {
      error,
      isLoaded,
      nodes,
      edges,
    } = this.state;

    const { theme } = this.props;

    if (error) {
      return (
        <Alert color="danger">
          Error:
          {error.message}
        </Alert>
      );
    }
    if (!process.browser || !isLoaded) {
      return <ContentLoader />;
    }
    const combinedData = this.combineData(nodes, edges);
    return (
      <CausalChain>
        { createChain(combinedData, theme) }
      </CausalChain>
    );
  }
}

IndicatorCausal.propTypes = {
  actionId: PropTypes.string.isRequired,
};
IndicatorCausal.contextType = PlanContext;

export default withTheme(IndicatorCausal);
