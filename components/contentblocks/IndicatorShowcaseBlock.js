import React from 'react';
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

const IndicatorShowcaseBlock = (props) => {
  const { id = '', indicator, title, body } = props;
  // Animation hook:  trigger when visible on screen
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
  });

  const indicatorHasGoal = indicator.goals.length > 0;

  return (
    <IndicatorShowcase id={id}>
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
              indicator={indicator}
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
  id: PropTypes.string,
  indicator: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default IndicatorShowcaseBlock;
