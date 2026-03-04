import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';

import { IndicatorLink, Link } from '@/common/links';
import Icon from '@/components/common/Icon';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
`;

const IndicatorItem = (props: { indicator: string; indicatorCount: number }) => {
  const { indicator, indicatorCount } = props;
  const t = useTranslations();
  const singleIndicator = indicatorCount === 1;
  const showLink = false;

  return (
    <Col className="mb-5" lg={{ size: singleIndicator ? 8 : 6, offset: singleIndicator ? 2 : 0 }}>
      <IndicatorVisualisation indicatorId={indicator} />
      {showLink && (
        <div className="mt-2 text-right">
          <IndicatorLink id={indicator}>
            {t('read-more')}
            <Icon.ArrowRight />
          </IndicatorLink>
        </div>
      )}
    </Col>
  );
};

const RelatedIndicatorsblock = (props: { id?: string; indicators: { id: string }[] }) => {
  const { id = '', indicators } = props;
  return (
    <IndicatorGraphSection id={id}>
      <Container>
        <Row className="align-items-end">
          {indicators?.map((item) => (
            <IndicatorItem indicator={item.id} key={item.id} indicatorCount={indicators.length} />
          ))}
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

export default RelatedIndicatorsblock;
