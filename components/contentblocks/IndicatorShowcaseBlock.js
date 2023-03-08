import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import IndicatorProgressBar from 'components/indicators/IndicatorProgressBar';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';

const IndicatorShowcase = styled.div`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  text-align: center;

  h2 {
    color: ${(props) => props.theme.themeColors.white};
  }

  a {
    color: ${(props) => props.theme.themeColors.white};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const Content = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const IndicatorShowcaseBlock = (props) => {
  const { indicator, title, body } = props;
  // Animation hook:  trigger when visible on screen
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
  });
  // The bar is built for showing reduction goals
  // we swap the goal and start values if the goal is to increase
  // TODO: enable the viz to handle goals to increase

  const indicatorHasGoal = indicator.goals.length > 0;

  const goalValue = indicator.goals[indicator.goals.length-1]?.value;
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
            <RichText html={body} className="mb-5" />
            { indicatorHasGoal ? (
            <IndicatorProgressBar
              indicatorId={indicator.id}
              startDate={indicator.values[0].date}
              startValue={(goalValue < startValue) ? startValue : goalValue}
              latestDate={indicator.latestValue.date}
              latestValue={indicator.latestValue.value}
              goalDate={indicator.goals[indicator.goals.length-1].date}
              goalValue={(goalValue < startValue) ? goalValue : startValue}
              unit={indicator.unit.shortName}
              note={indicator.name}
              animate={inView}
            />) : (
            <>
              <h2>{indicator.name}</h2>
              <IndicatorVisualisation indicatorId={indicator.id} />
            </>
            )}
            <span ref={ref} />
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
