import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { usePlan } from 'context/plan';
import PlanChip from 'components/plans/PlanChip';
import { useTranslation } from 'common/i18n';

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
  const plan = usePlan();
  const { t } = useTranslation(['common']);
  if (!plan.allRelatedPlans) return null;
  const siblingsOrChildren = plan.allRelatedPlans.filter((pl) => pl.id != plan.parent?.id)
  const isParentPlan = plan.children.length > 0;

  return (
    <PlanListSection>
      <Container>
      <h2>
        <a href={plan.parent?.viewUrl || null}>
          { plan.parent ? `${plan.parent.name}` : plan.shortName }
        </a>
      </h2>
        <PlanList>
          { !isParentPlan && (
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
          { siblingsOrChildren.map((pl) => (
            <a
              href={pl.viewUrl}
              key={pl.identifier}
            >
              <PlanChip
                planImage={pl.image?.rendition.src}
                planShortName={pl.shortName}
                organization={pl.name}
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
