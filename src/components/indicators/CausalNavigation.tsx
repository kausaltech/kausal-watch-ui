import React from 'react';

import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import { usePlan } from '@/context/plan';

import IndicatorCard from './IndicatorCard';

const CausalNavigationWrapper = styled.div`
  padding-top: ${(props) => props.theme.spaces.s200};
  background-color: ${(props) => props.theme.themeColors.light};

  h3 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

const CardWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s100};
`;

function CausalNavigation(props) {
  const t = useTranslations();
  const { effects, causes } = props;
  const currentPlan = usePlan();

  const getIndicatorLink = (indicator) => {
    // If the indicator has no plans, or current plan includes the indicator, default behaviour.
    // If the indicator is connected only to another plan, link to the correct indicator page.
    if (!indicator.plans || !Array.isArray(indicator.plans) || indicator.plans.length === 0) {
      return null;
    }

    const currentPlanInList = indicator.plans.some(
      (plan) => plan.identifier === currentPlan.identifier
    );

    if (currentPlanInList) {
      return null;
    }

    const rootPlan = indicator.plans.find((plan) => !plan.parent);
    if (rootPlan) {
      return rootPlan.viewUrl;
    }

    return indicator.plans[0].viewUrl;
  };

  return (
    <CausalNavigationWrapper>
      <Container>
        <Row>
          <Col sm="6" lg={{ size: 5 }} className="mb-5">
            {causes.length > 0 && (
              <div>
                <h3>{t('indicator-affected-by')}</h3>
                {causes.map((cause) => (
                  <CardWrapper key={cause.causalIndicator.id}>
                    <IndicatorCard
                      objectid={cause.causalIndicator.id}
                      name={cause.causalIndicator.name}
                      level={cause.causalIndicator.level}
                      customHref={getIndicatorLink(cause.causalIndicator)}
                    />
                  </CardWrapper>
                ))}
              </div>
            )}
          </Col>

          <Col sm="6" lg={{ size: 5, offset: 2 }} className="mb-5">
            {effects.length > 0 && (
              <div>
                <h3>{t('indicator-has-effect-on')}</h3>
                {effects.map((effect) => (
                  <CardWrapper key={effect.effectIndicator.id}>
                    <IndicatorCard
                      objectid={effect.effectIndicator.id}
                      name={effect.effectIndicator.name}
                      level={effect.effectIndicator.level}
                      customHref={getIndicatorLink(effect.effectIndicator)}
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

CausalNavigation.propTypes = {};

CausalNavigation.propTypes = {
  causes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  effects: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default CausalNavigation;
