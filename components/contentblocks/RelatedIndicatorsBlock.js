import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Link } from 'routes';
import { useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';

const IndicatorGraphSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s300};
`;

const IndicatorItem = (props) => {
  const { indicator, indicatorCount } = props;
  const { t } = useTranslation();
  const singleIndicator = indicatorCount === 1;
  const showLink = false;

  return (
    <Col
      className="mb-5"
      lg={{ size: singleIndicator ? 8 : 6, offset: singleIndicator ? 2 : 0 }}
    >
      <IndicatorVisualisation indicatorId={indicator} />
      { showLink && (
      <div className="mt-2 text-right">
        <Link href={`/indicators/${indicator}`}>
          <a href>
            {t('read-more')}
            <Icon name="arrowRight" />
          </a>
        </Link>
      </div>
      )}
    </Col>
  );
};

const RelatedIndicatorsblock = (props) => {
  const { indicators } = props;
  return (
    <IndicatorGraphSection>
      <Container>
        <Row className="align-items-end">
          { indicators?.map((item) => (
            <IndicatorItem
              indicator={item.id}
              key={item.id}
              indicatorCount={indicators.length}
            />
          ))}
        </Row>
      </Container>
    </IndicatorGraphSection>
  );
};

RelatedIndicatorsblock.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default RelatedIndicatorsblock;
