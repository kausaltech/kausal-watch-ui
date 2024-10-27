import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import RichText from '@/components/common/RichText';
import IndicatorProgressBar from '@/components/indicators/IndicatorProgressBar';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

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

const getNormalizedValue = (indicatorValue, indicator) => {
  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );
  if (populationNormalizer && indicatorValue.normalizedValues.length > 0) {
    const normalized = indicatorValue.normalizedValues.find(
      (normed) => normed.normalizerId === populationNormalizer.normalizer.id
    );
    return normalized?.value;
  } else {
    return undefined;
  }
};

const getNormalizedUnit = (indicator) => {
  const populationNormalizer = indicator.common?.normalizations.find(
    (normalization) => normalization.normalizer.identifier === 'population'
  );
  if (populationNormalizer) {
    return (
      populationNormalizer.unit.shortName || populationNormalizer.unit.name
    );
  } else {
    return '';
  }
};

const IndicatorShowcaseBlock = (props) => {
  const { id = '', indicator, title, body } = props;

  const lastGoal = indicator.goals[indicator.goals.length - 1];
  const firstValue = indicator.values[0];
  const lastValue = indicator.values[indicator.values.length - 1];

  const indicatorHasGoal = indicator.goals.length > 0;

  const canNormalize =
    getNormalizedValue(firstValue, indicator) &&
    getNormalizedValue(lastValue, indicator);

  const baseValue = {
    date: firstValue.date,
    value: firstValue.value,
    normalizedValue: getNormalizedValue(firstValue, indicator),
  };

  const latestValue = {
    date: lastValue.date,
    value: lastValue.value,
    normalizedValue: getNormalizedValue(lastValue, indicator),
  };

  const goalValue = {
    date: lastGoal.date,
    value: lastGoal.value,
    normalizedValue: getNormalizedValue(lastGoal, indicator),
  };

  const unit = {
    name: indicator.unit.shortName || indicator.unit.name || '',
    normalizedName: getNormalizedUnit(indicator),
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
                indicatorId={indicator.id}
                note={indicator.name}
                baseValue={baseValue}
                lastValue={latestValue}
                goalValue={goalValue}
                normalize={canNormalize}
                unit={unit}
                indicator={indicator}
              />
            ) : (
              <>
                <h2>{indicator.name}</h2>
                <IndicatorVisualisation indicatorId={indicator.id} />
              </>
            )}
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
