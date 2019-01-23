import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardBody
} from 'reactstrap';
import styled from 'styled-components';

import HelIcon from '../Common/HelIcon';

const CausalChain = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-warp: nowrap;
  overflow-x: auto;
  padding: 2em;
  margin: 1em 0;
`;

const Indicator = styled(Card)`
  flex: 0 0 auto;
  width: 240px;
  hyphens: auto;
  background-color: ${(props) => {
    switch (props.level) {
      case 'tactical':
        return props.theme.helCopper;
      case 'operational':
        return props.theme.helFog;
      case 'strategic':
        return props.theme.helCoat;
      default:
        return '#cccccc';
    }
  }};
`;

const Relation = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin: 0 0.5em 0 -0.3em;
  z-index: 300;
  font-size: 38px;
  color: ${(props) => {
    switch (props.type) {
      case 'tactical':
        return props.theme.helCopper;
      case 'operational':
        return props.theme.helFog;
      case 'strategic':
        return props.theme.helCoat;
      default:
        return '#333333';
    }
  }};

  &:before {
    content: '+';
    height: 1.2em;
    width: 1.2em;
    background: black;
    font-size: 20px;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 1.2em;
  }
`;

class IndicatorCausal extends React.Component {

  render() {
    return (
      <CausalChain>
        <Indicator level="tactical">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="tactical">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="operational">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="operational">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="strategic">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="strategic">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
        <Relation>
          <HelIcon iconName="arrow-right" />
        </Relation>
        <Indicator level="strategic">
          <CardBody>
          <h4>Rakennusala lämmitysmuodoittain</h4>
          </CardBody>
        </Indicator>
      </CausalChain>
    );
  }
}


export default IndicatorCausal;
