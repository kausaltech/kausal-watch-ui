import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { readableColor } from 'polished';
import Icon from 'components/common/Icon';
import { useTranslation } from 'common/i18n';
import { IndicatorLink } from 'common/links';
import IndicatorHighlightCard from 'components/indicators/IndicatorHighlightCard';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};

  h2 {
    text-align: center;
    margin-bottom: ${(props) => props.theme.spaces.s300};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }
`;

const IndicatorContainer = styled.div`
  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.themeColors.black,
        props.theme.themeColors.white
      )};
  }
`;

const IndicatorItem = (props) => {
  const { indicator, display } = props;
  if (display === 'graph')
    return (
      <Col className="mb-5" lg={{ size: 8 }}>
        <IndicatorContainer>
          <IndicatorLink id={indicator.id}>
            <a>
              <h3>
                {indicator.name}
                <Icon name="arrowRight" color="" />
              </h3>
            </a>
          </IndicatorLink>
          <IndicatorVisualisation indicatorId={indicator.id} />
        </IndicatorContainer>
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

// TODO: Format as list for a11y
const IndicatorGroupBlock = (props) => {
  const { id = '', title, indicators } = props;
  const { t } = useTranslation();
  return (
    <IndicatorGraphSection id={id}>
      <Container>
        <h2>{title || t('indicators')}</h2>
        <Row className="justify-content-center">
          {indicators.map((item) => (
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
  id: PropTypes.string,
  title: PropTypes.string,
  indicators: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default IndicatorGroupBlock;
