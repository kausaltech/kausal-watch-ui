import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorHighlightCard from 'components/indicators/IndicatorHighlightCard';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorItem = (props) => {
  const { indicator, display } = props;
  if (display === 'graph') return (
    <Col
      className="mb-5"
      lg={{ size: 8, offset: 2 }}
    >
      <IndicatorVisualisation indicatorId={indicator.id} />
    </Col>
  );
  return (
    <Col md={6} xl={4} className="mb-5">
      <IndicatorHighlightCard
        level={indicator.level}
        objectid={indicator.id}
        name={indicator.name}
        value={indicator.latestValue.value}
        unit={indicator.unit.name}
      />
    </Col>
  );
};

const IndicatorGroupBlock = (props) => {
  const { indicators } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          { indicators.map((item) => (
            <IndicatorItem
              indicator={item.indicator}
              display={item.style}
              key={item.indicator.id}
            />
          ))}
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

IndicatorGroupBlock.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default IndicatorGroupBlock;
