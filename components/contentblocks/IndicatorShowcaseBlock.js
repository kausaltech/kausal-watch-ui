import React from 'react';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from 'components/common/RichText';
import IndicatorProgressBar from 'components/indicators/IndicatorProgressBar';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import { normalize } from 'path';

const IndicatorShowcase = styled.div`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background-color: ${({ theme }) =>
    theme.section.indicatorShowcase.background};
  color: ${({ theme }) => theme.section.indicatorShowcase.color};
  text-align: center;

  h2 {
    color: ${({ theme }) => theme.section.indicatorShowcase.color};
  }

  a {
    color: ${({ theme }) => theme.section.indicatorShowcase.color};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

const getNormalizedValue = (indicatorValue, populationNormalizer) => {
  if (populationNormalizer && indicatorValue.normalizedValues.length > 0) {
    const normalized = indicatorValue.normalizedValues.find(
      (normed) => normed.normalizerId === populationNormalizer.normalizer.id
    );
    return normalized?.value;
  } else {
    return undefined;
  }
};

const processIndicator = (indicator) => {
  const canNormalize =
    getNormalizedValue(firstValue) && getNormalizedValue(lastValue);
};

const IndicatorShowcaseBlock = (props) => {
  const { id = '', indicator, title, body } = props;
  // Animation hook:  trigger when visible on screen
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
  });

  const lastGoal = indicator.goals[indicator.goals.length - 1];
  const firstValue = indicator.values[0];
  const lastValue = indicator.values[indicator.values.length - 1];

  const indicatorHasGoal = indicator.goals.length > 0;
  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );

  const baseValue = {
    date: firstValue.date,
    value: firstValue.value,
    normalizedValue: 0,
  };

  const latestValue = {
    date: lastValue.date,
    value: lastValue.value,
    normalizedValue: 0,
  };

  const goalValue = {
    date: lastGoal.date,
    value: lastGoal.value,
    normalizedValue: 0,
  };
  return (
    <IndicatorShowcase id={id}>
      <Container>
        <Row>
          <Col xl={{ size: 8, offset: 2 }} lg={{ size: 10, offset: 1 }}>
            <h2>{title}</h2>
            <RichText html={body} className="mb-5" />
            {indicatorHasGoal ? (
              <IndicatorProgressBar
                baseValue
                latestValue
                goalValue
                normalize
                unit
                indicator={indicator}
                animate={inView}
              />
            ) : (
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
  id: PropTypes.string,
  indicator: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IndicatorShowcaseBlock;
