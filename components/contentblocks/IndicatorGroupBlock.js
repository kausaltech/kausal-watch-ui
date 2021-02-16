import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorGraphSmall from 'components/graphs/IndicatorGraphSmall';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorGroupBlock = (props) => {
  const { indicators } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row>
          { indicators.map((indicator) => (
            <Col md={6} xl={4} className="mb-5" key={indicator.id}>
              <IndicatorGraphSmall indicatorId={indicator.indicator.id} />
            </Col>
          ))}
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

IndicatorGroupBlock.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IndicatorGroupBlock;
