import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import IndicatorProgressBar from 'components/indicators/IndicatorProgressBar';

const IndicatorShowcase = styled.div`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  text-align: center;
  h2 {
    color: ${(props) => props.theme.themeColors.white};
  }
`;

const Content = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const IndicatorShowcaseBlock = (props) => {
  const { indicator, title, body } = props;

  // The bar is built for showing reduction goals
  // we swap the goal and start values if the goal is to increase
  // TODO: enable the viz to handle goals to increase
  const goalValue = indicator.goals[indicator.goals.length-1].value;
  const startValue = indicator.values[0].value;

  return (
    <IndicatorShowcase>
      <Container>
        <Row>
          <Col
            xl={{ size: 8, offset: 2 }}
            lg={{ size: 10, offset: 1 }}
          >
            <h2>{title}</h2>
            <Content dangerouslySetInnerHTML={{ __html: body }} />
            <IndicatorProgressBar
              startDate={indicator.values[0].date}
              startValue={(goalValue < startValue) ? startValue : goalValue}
              latestDate={indicator.latestValue.date}
              latestValue={indicator.latestValue.value}
              goalDate={indicator.goals[indicator.goals.length-1].date}
              goalValue={(goalValue < startValue) ? goalValue : startValue}
              unit={indicator.unit.shortName}
              note={indicator.name}
            />
          </Col>
        </Row>
      </Container>
    </IndicatorShowcase>
  );
};

/*
  startDate: PropTypes.string,
  startValue: PropTypes.string.isRequired,
  latestDate: PropTypes.string,
  latestValue: PropTypes.string.isRequired,
  goalDate: PropTypes.string,
  goalValue: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  note: PropTypes.string,
  */

IndicatorShowcaseBlock.propTypes = {
  indicator: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IndicatorShowcaseBlock;
