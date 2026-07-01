import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { readableColor, transparentize } from 'polished';
import { Container } from 'reactstrap';

import PlanChip from '@/components/plans/PlanChip';
import { usePlan } from '@/context/plan';

const PlanListSection = styled.div`
  background-color: ${(props) =>
    props.theme.section.relatedPlans?.background || props.theme.themeColors.dark};
  padding: ${(props) => props.theme.spaces.s200} 0;

  h2,
  h2 a {
    text-align: center;
    margin-bottom: ${(props) => props.theme.spaces.s100};
    font-size: ${(props) => props.theme.fontSizeMd};
    color: ${(props) => props.theme.section?.relatedPlans?.color || props.theme.themeColors.white};
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
    border: 1px solid ${(props) => transparentize(0.8, props.theme.themeColors.light)};
    border-radius: ${(props) => props.theme.cardBorderRadius};
    margin: 0 ${(props) => props.theme.spaces.s100} ${(props) => props.theme.spaces.s100} 0;

    &:hover {
      color: ${(props) => props.theme.textColor.tertiary};
      text-decoration: none;
    }
  }
`;

const PlanCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: ${(props) => props.theme.spaces.s200};
`;

const PlanCardLink = styled.a`
  display: flex;
  flex: 0 1 300px;
  /* Leave room for the avatar that overlaps the top of the card */
  padding-top: ${(props) => props.theme.spaces.s400};

  &:hover {
    text-decoration: none;
  }
`;

const PlanCard = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  padding: 0 ${(props) => props.theme.spaces.s150} ${(props) => props.theme.spaces.s200};
`;

const PlanCardImage = styled.img`
  width: 160px;
  height: 160px;
  margin-top: -80px;
  margin-bottom: ${(props) => props.theme.spaces.s150};
  border-radius: 50%;
  object-fit: cover;
`;

const PlanCardTitle = styled.h3`
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeLg};
  font-weight: ${(props) => props.theme.fontWeightBold};
  line-height: 1.2;
  text-align: center;
  color: ${(props) => props.theme.themeColors.dark};
`;

const PlanCardText = styled.p`
  margin-bottom: 0;
  text-align: center;
  color: ${(props) => props.theme.graphColors.grey070};
`;

/**
 * Placeholder body copy for the cards layout. Related plans don't yet expose a
 * description field via GraphQL, so this mocks the design until one is added.
 */
const MOCK_CARD_DESCRIPTION =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

interface Props {
  id?: string;
  /**
   * Render the related plans as full cards (image, title, description) instead
   * of compact chips.
   */
  listStyle?: 'cards' | 'chips';
}

const RelatedPlanListBlock = ({ id, listStyle = 'cards' }: Props) => {
  const plan = usePlan();
  const theme = useTheme();
  if (!plan.allRelatedPlans) return null;
  const siblingsOrChildren = plan.allRelatedPlans.filter((pl) => pl.id != plan.parent?.id);
  const isParentPlan = plan.children.length > 0;

  const negativeChips = theme.section?.relatedPlans?.background
    ? readableColor(theme.section?.relatedPlans?.background) === '#fff'
    : true;

  // The plans to display: the current plan first (unless it's the parent of the
  // listed plans), followed by its siblings or children.
  const plansToShow = [...(isParentPlan ? [] : [plan]), ...siblingsOrChildren];

  return (
    <PlanListSection id={id}>
      <Container>
        <h2>
          <a href={plan.parent?.viewUrl || undefined}>
            {plan.parent ? `${plan.parent.name}` : plan.shortName}
          </a>
        </h2>
        {listStyle === 'cards' ? (
          <PlanCardList>
            {plansToShow.map((pl) => (
              <PlanCardLink href={pl.viewUrl || undefined} key={pl.identifier}>
                <PlanCard>
                  {pl.image?.rendition?.src && (
                    <PlanCardImage src={pl.image.rendition.src} alt="" />
                  )}
                  <PlanCardTitle>{pl.shortName || pl.name}</PlanCardTitle>
                  <PlanCardText>
                    {pl.generalContent.siteDescription || MOCK_CARD_DESCRIPTION}
                  </PlanCardText>
                </PlanCard>
              </PlanCardLink>
            ))}
          </PlanCardList>
        ) : (
          <PlanList>
            {plansToShow.map((pl) => (
              <a href={pl.viewUrl || undefined} key={pl.identifier}>
                <PlanChip
                  planImage={pl.image?.rendition?.src}
                  planShortName={pl.shortName || undefined}
                  organization={theme.settings?.multiplan?.hideLongPlanNames ? undefined : pl.name}
                  size="lg"
                  negative={negativeChips}
                />
              </a>
            ))}
          </PlanList>
        )}
      </Container>
    </PlanListSection>
  );
};

export default RelatedPlanListBlock;
