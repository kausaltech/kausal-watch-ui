import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorBlock = (props) => {
  const { indicator } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          <Col>
            <h2>{indicator.id}</h2>
            <IndicatorVisualisation indicatorId={indicator.id} />
          </Col>
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

IndicatorBlock.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IndicatorBlock;
