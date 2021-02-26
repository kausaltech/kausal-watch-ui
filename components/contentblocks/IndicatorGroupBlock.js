import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorHighlightCard from 'components/indicators/IndicatorHighlightCard';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorGroupBlock = (props) => {
  const { indicators } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          { indicators.map((item) => (
            <Col md={6} xl={4} className="mb-5" key={item.indicator.id}>
              <IndicatorHighlightCard
                level={item.indicator.level}
                objectid={item.indicator.id}
                name={item.indicator.name}
                value={item.indicator.latestValue.value}
                unit={item.indicator.unit.name}
              />
            </Col>
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
