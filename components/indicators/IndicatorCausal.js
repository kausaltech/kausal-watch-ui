import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardBody, CardTitle, Alert,
} from 'reactstrap';
import styled from 'styled-components';
import { IndicatorLink } from '../../common/links';
import moment from '../../common/moment';

import PlanContext from '../../context/plan';
import { aplans, CancelToken } from '../../common/api';
import ContentLoader from '../common/ContentLoader';

const CausalChain = styled.div`
  background-color: ${props => props.theme.themeColors.light};
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
  flex: 1 1 auto;
  width: 240px;
  hyphens: auto;
  margin: 10px 20px;
  line-height: 1;
  min-height: 140px;
  border-radius: 6px;
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

const Connection = styled.div`
  position: absolute;
  z-index: 300;
  font-size: 3px;
  border-color: ${(props) => {
    switch (props.type) {
      case 'increases':
        return props.theme.causalityIncreasesColor;
      case 'decreases':
        return props.theme.causalityDecreasesColor;
      case 'part_of':
        return props.theme.causalityIsPartOfColor;
      default:
        return '#333333';
    }
  }};
  transform: ${props => `rotate(${props.rotate * 90}deg)`};
  &:before {
    content: '';
    position: absolute;
    width: ${props => `${46 - props.widthAdjust + ((props.hLength - 1) * 280)}px`};
    left: ${props => `${-46 + props.widthAdjust + ((props.hLength - 1) * -280)}px`};
    bottom: ${props => (props.vLength < 0) ? '0px' : 'none'};
    border-top: 6px solid black;
    border-top-color: ${(props) => {
    switch (props.type) {
      case 'increases':
        return props.theme.causalityIncreasesColor;
      case 'decreases':
        return props.theme.causalityDecreasesColor;
      case 'part_of':
        return props.theme.causalityIsPartOfColor;
      default:
        return '#333333';
    }
  }};
  }
  &:after {
    content: '';
    position: absolute;
    right: -7px;
    bottom: ${props => (props.vLength >= 0) ? '-13px' : 'auto'};
    top: ${props => (props.vLength < 0) ? '-13px' : 'auto'};
    width: 0; 
    height: 0;
    transform: ${props => `rotate(${props.direction * 90}deg)`};
    transform-origin: center left;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid;
    border-left-color: ${(props) => {
    switch (props.type) {
      case 'increases':
        return props.theme.causalityIncreasesColor;
      case 'decreases':
        return props.theme.causalityDecreasesColor;
      case 'part_of':
        return props.theme.causalityIsPartOfColor;
      default:
        return '#333333';
    }
  }};
  }
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

  componentDidUpdate(prevProps) {
    const { actionId } = this.props;
    if (prevProps.actionId !== actionId) {
      this.fetchData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
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
      this.setState({
        isLoaded: true,
        nodes: result.data.data.nodes,
        edges: result.data.data.edges,
      });
    }).catch((error) => {
      if (this.cancelled) return;
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

  drawEdge(nodes, edge, index) {
    const fromNode = nodes.find(item => edge.from === item.id);
    const toNode = nodes.find(item => edge.to === item.id);

    const edgeLength = toNode.column - fromNode.column;
    const edgeHeight = toNode.row - fromNode.row;
    const averageHeight = 140;
    const hOffset = (20 * edgeLength) + (index * 10);
    const vOffset = (15 * edgeLength) + (index * 20);

    let direction = 0;

    const edgeStyle = {
      left: `${-hOffset}px`,
      width: `${hOffset}px`,
      height: `${averageHeight * Math.abs(edgeHeight)}px`,
      borderLeftWidth: '6px',
      borderRightWidth: '0px',
      borderStyle: 'solid',
    };

    if (edgeHeight >= 0) {
      edgeStyle.top = `${vOffset - (averageHeight * edgeHeight)}px`;
      edgeStyle.borderBottomWidth = '6px';
      edgeStyle.borderTopWidth = '0px';
    }

    if (edgeHeight < 0) {
      edgeStyle.height = `${(averageHeight + 20) * Math.abs(edgeHeight)}px`;
      edgeStyle.top = `${vOffset}px`;
      edgeStyle.borderBottomWidth = '0px';
      edgeStyle.borderTopWidth = '6px';
    }

    if (edgeLength === 0) {
      edgeStyle.width = '1px';
      edgeStyle.height = `${24}px`;
      edgeStyle.top = '-24px';
      edgeStyle.left = `${40 + (vOffset * 5)}px`;
      direction = (edgeHeight >= 0) ? 1 : -1;
    }

    return (
      <Connection
        key={edge.id}
        type={edge.effect_type}
        style={edgeStyle}
        hLength={edgeLength}
        vLength={edgeHeight}
        widthAdjust={hOffset}
        direction={direction}
      />
    );
  }

  createChain(nodes) {
    let column = 0;
    const chain = [];
    let columnIndicators = nodes;

    while (columnIndicators.length !== 0) {
      const children = [];

      columnIndicators = nodes.filter(item => item.column === column);

      columnIndicators.forEach((indicator) => {
        let indicatorLevel = 'action';
        if (indicator.type !== 'action') indicatorLevel = indicator.indicator_level;
        const connectionsTo = [];
        indicator.to.forEach((edge, index) => {
          connectionsTo.push(
            <span key={edge.id}>
              {this.drawEdge(nodes, edge, index)}
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

  render() {
    const {
      error,
      isLoaded,
      nodes,
      edges,
    } = this.state;
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
        { this.createChain(combinedData) }
      </CausalChain>
    );
  }
}

IndicatorCausal.propTypes = {
  actionId: PropTypes.string.isRequired,
};
IndicatorCausal.contextType = PlanContext;

export default IndicatorCausal;
