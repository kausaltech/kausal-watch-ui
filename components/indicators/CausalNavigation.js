import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { withTranslation } from '../../common/i18n';
import IndicatorCard from './IndicatorCard';

const CausalNavigationWrapper = styled.div`
  padding-top: ${(props) => props.theme.spaces.s200};
  background-color: ${(props) => props.theme.themeColors.light};
`;

const CardWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

function CausalNavigation(props) {
  const { effects, causes, t } = props;

  return (
    <CausalNavigationWrapper>
      <Container>
        <Row>
          <Col sm="6" lg={{ size: 5 }} className="mb-5">
            { causes.length > 0 && (
              <div>
                <h3 className="mb-4">{ t('indicator-affected-by') }</h3>
                { causes.map((cause) => (
                  <CardWrapper>
                    <IndicatorCard
                      objectid={cause.causalIndicator.id}
                      name={cause.causalIndicator.name}
                      level={cause.causalIndicator.level}
                      key={cause.causalIndicator.id}
                    />
                  </CardWrapper>
                ))}
              </div>
            )}
          </Col>

          <Col sm="6" lg={{ size: 5, offset: 2 }} className="mb-5">
            { effects.length > 0 && (
              <div>
                <h3 className="mb-4">{ t('indicator-has-effect-on') }</h3>
                { effects.map((effect) => (
                  <CardWrapper>
                    <IndicatorCard
                      objectid={effect.effectIndicator.id}
                      name={effect.effectIndicator.name}
                      level={effect.effectIndicator.level}
                      key={effect.effectIndicator.id}
                    />
                  </CardWrapper>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </CausalNavigationWrapper>
  );
}

CausalNavigation.propTypes = {
};

CausalNavigation.propTypes = {
  causes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  effects: PropTypes.arrayOf(PropTypes.shape).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(CausalNavigation);
