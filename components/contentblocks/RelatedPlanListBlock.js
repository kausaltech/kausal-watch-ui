import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import PlanContext from 'context/plan';
import PlanChip from 'components/plans/PlanChip';
import { Link } from 'common/links';
import { useTranslation } from 'common/i18n';
import Icon from 'components/common/Icon';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';

const PlanListSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.dark};
  padding: ${(props) => props.theme.spaces.s200} 0;
  overflow: auto;

  h2, h2 a {
    margin-bottom: ${(props) => props.theme.spaces.s050};
    font-size: ${(props) => props.theme.fontSizeMd};
    color: ${(props) => props.theme.themeColors.white};
  }
`;

const PlanList = styled.div`
  display: flex;

  a {
    display: block;
    padding: ${(props) => props.theme.spaces.s050};
    border-radius: ${(props) => props.theme.badgeBorderRadius};
    margin-right: ${(props) => props.theme.spaces.s100};

    &:hover {
      background-color: ${(props) => props.theme.graphColors.grey070};
    }
  }
`;

const RelatedPlanListBlock = (props) => {
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['common']);
  if (!plan.relatedPlans || !plan.children) return null;

  return (
    <PlanListSection>
      <Container>
      <h2>
        <a href={plan.parent?.viewUrl || null}>
          { plan.parent ? `${plan.parent.name}` : plan.shortName }
        </a>
      </h2>
        <PlanList>
          { plan.relatedPlans?.length > 0 && (
            <a
              href={plan.viewUrl}
              key={plan.identifier}
            >
              <PlanChip
                planImage={plan.image?.rendition.src}
                planShortName={plan.shortName}
                organization={plan.name}
                size="lg"
                negative={true}
              />
            </a>
          )}
          { plan.relatedPlans.map((relPlan) => (
            <a
              href={relPlan.viewUrl}
              key={relPlan.identifier}
            >
              <PlanChip
                planImage={relPlan.image?.rendition.src}
                planShortName={relPlan.shortName}
                organization={relPlan.name}
                size="lg"
                negative={true}
              />
            </a>
          ))}
          { plan.children.map((relPlan) => (
            <a
              href={relPlan.viewUrl}
              key={relPlan.identifier}
            >
              <PlanChip
                planImage={relPlan.image?.rendition.src}
                planShortName={relPlan.shortName}
                organization={relPlan.name}
                size="lg"
                negative={true}
              />
            </a>
          ))}
          </PlanList>
      </Container>
    </PlanListSection>
  );
};

export default RelatedPlanListBlock;
