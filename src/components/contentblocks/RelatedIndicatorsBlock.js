import React from 'react';

import { Link } from 'common/links';
import Icon from 'components/common/Icon';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

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

const IndicatorItem = (props) => {
  const { indicator, indicatorCount } = props;
  const t = useTranslations();
  const singleIndicator = indicatorCount === 1;
  const showLink = false;

  return (
    <Col className="mb-5" lg={{ size: singleIndicator ? 8 : 6, offset: singleIndicator ? 2 : 0 }}>
      <IndicatorVisualisation indicatorId={indicator} />
      {showLink && (
        <div className="mt-2 text-right">
          <Link href={`/indicators/${indicator}`} legacyBehavior>
            <a>
              {t('read-more')}
              <Icon.ArrowRight />
            </a>
          </Link>
        </div>
      )}
    </Col>
  );
};

const RelatedIndicatorsblock = (props) => {
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

RelatedIndicatorsblock.propTypes = {
  id: PropTypes.string,
  indicators: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RelatedIndicatorsblock;
