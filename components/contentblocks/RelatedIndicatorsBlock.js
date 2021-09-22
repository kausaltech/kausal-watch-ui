import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorHighlightCard from 'components/indicators/IndicatorHighlightCard';
import IndicatorGraph from 'components/graphs/IndicatorGraph';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorItem = (props) => {
  const { indicator } = props;
  return (
    <Col
      className="mb-5"
      lg={{ size: 8, offset: 2 }}
    >
      <IndicatorGraph indicatorId={indicator} />
    </Col>
  );
};

const RelatedIndicatorsblock = (props) => {
  const { indicators } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          { indicators?.map((item) => (
            <IndicatorItem
              indicator={item.id}
              key={item.id}
            />
          ))}
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

RelatedIndicatorsblock.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default RelatedIndicatorsblock;
