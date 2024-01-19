import React from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { usePlan } from 'context/plan';
import { useTheme } from 'styled-components';
import PlanChip from 'components/plans/PlanChip';

const PlanListSection = styled.div`
  background-color: ${(props) => props.theme.themeColors.dark};
  padding: ${(props) => props.theme.spaces.s200} 0;

  h2,
  h2 a {
    text-align: center;
    margin-bottom: ${(props) => props.theme.spaces.s100};
    font-size: ${(props) => props.theme.fontSizeMd};
    color: ${(props) => props.theme.themeColors.white};
  }
`;

const PlanList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  a {
    display: flex;
    flex: 200px 0 0;
    padding: ${(props) => props.theme.spaces.s050};
    border: 1px solid
      ${(props) => transparentize(0.8, props.theme.themeColors.light)};
    border-radius: ${(props) => props.theme.cardBorderRadius};
    margin: 0 ${(props) => props.theme.spaces.s100}
      ${(props) => props.theme.spaces.s100} 0;

    &:hover {
      background-color: ${(props) => props.theme.graphColors.grey070};
      text-decoration: none;
    }
  }
`;

interface Props {
  id?: string;
}

const RelatedPlanListBlock = ({ id }: Props) => {
  const plan = usePlan();
  const theme = useTheme();
  if (!plan.allRelatedPlans) return null;
  const siblingsOrChildren = plan.allRelatedPlans.filter(
    (pl) => pl.id != plan.parent?.id
  );
  const isParentPlan = plan.children.length > 0;

  return (
    <PlanListSection id={id}>
      <Container>
        <h2>
          <a href={plan.parent?.viewUrl || null}>
            {plan.parent ? `${plan.parent.name}` : plan.shortName}
          </a>
        </h2>
        <PlanList>
          {!isParentPlan && (
            <a href={plan.viewUrl} key={plan.identifier}>
              <PlanChip
                planImage={plan.image?.rendition.src}
                planShortName={plan.shortName}
                organization={
                  theme.settings?.multiplan?.hideLongPlanNames
                    ? undefined
                    : plan.name
                }
                size="lg"
                negative={true}
              />
            </a>
          )}
          {siblingsOrChildren.map((pl) => (
            <a href={pl.viewUrl} key={pl.identifier}>
              <PlanChip
                planImage={pl.image?.rendition.src}
                planShortName={pl.shortName}
                organization={
                  theme.settings?.multiplan?.hideLongPlanNames
                    ? undefined
                    : pl.name
                }
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
