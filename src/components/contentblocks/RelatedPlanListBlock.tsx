import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { readableColor, transparentize } from 'polished';
import { Container } from 'reactstrap';

import PlanChip from '@/components/plans/PlanChip';
import { usePlan } from '@/context/plan';

const PlanListSection = styled.div`
  background-color: ${(props) =>
    props.theme.section.relatedPlans?.background || props.theme.themeColors.dark};
  padding: ${(props) => props.theme.spaces.s300} 0;

  h2,
  h2 a {
    text-align: center;
    margin-bottom: ${(props) => props.theme.spaces.s200};
    font-size: ${(props) => props.theme.fontSizeMd};
    color: ${(props) => props.theme.section?.relatedPlans?.color || props.theme.themeColors.white};
  }
`;

const PlanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spaces.s100};
  a {
    display: flex;
    flex: 240px 0 0;
    padding: ${(props) => props.theme.spaces.s050};
    border: 1px solid
      ${(props) =>
        transparentize(
          0.8,
          props.theme.section?.relatedPlans?.color || props.theme.themeColors.white
        )};
    border-radius: ${(props) => props.theme.cardBorderRadius};
    // margin: 0 ${(props) => props.theme.spaces.s100} ${(props) => props.theme.spaces.s100} 0;

    &:hover {
      color: ${(props) => props.theme.textColor.tertiary};
      text-decoration: none;
    }
  }
`;

const PlanRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${(props) => props.theme.spaces.s100};
`;

interface Props {
  id?: string;
}

const MAX_CARDS_PER_ROW = 4;

/**
 * Split the items into rows of at most maxPerRow, distributing them as
 * evenly as possible with larger rows first (e.g. 5 → 3+2, 7 → 4+3).
 */
function balanceRows<T>(items: T[], maxPerRow: number): T[][] {
  const rowCount = Math.ceil(items.length / maxPerRow);
  const base = Math.floor(items.length / rowCount);
  const remainder = items.length % rowCount;
  const rows: T[][] = [];
  let start = 0;
  for (let i = 0; i < rowCount; i++) {
    const size = base + (i < remainder ? 1 : 0);
    rows.push(items.slice(start, start + size));
    start += size;
  }
  return rows;
}

const RelatedPlanListBlock = ({ id }: Props) => {
  const plan = usePlan();
  const theme = useTheme();
  if (!plan.allRelatedPlans) return null;
  const siblingsOrChildren = plan.allRelatedPlans.filter((pl) => pl.id != plan.parent?.id);
  const isParentPlan = plan.children.length > 0;
  // A non-parent plan shows its own chip alongside its siblings. Its default
  // rendition is a non-square card image, so swap in the square one to match
  // the sibling avatars.
  const cards = isParentPlan
    ? siblingsOrChildren
    : [{ ...plan, image: plan.image && { rendition: plan.image.square } }, ...siblingsOrChildren];

  const negativeChips = theme.section?.relatedPlans?.background
    ? readableColor(theme.section?.relatedPlans?.background) === '#fff'
    : true;
  return (
    <PlanListSection id={id}>
      <Container>
        <h2>
          <a href={plan.parent?.viewUrl || undefined}>
            {plan.parent ? `${plan.parent.name}` : plan.shortName}
          </a>
        </h2>
        <PlanList>
          {balanceRows(cards, MAX_CARDS_PER_ROW).map((row, rowIndex) => (
            <PlanRow key={rowIndex}>
              {row.map((pl) => (
                <a href={pl.viewUrl || undefined} key={pl.identifier}>
                  <PlanChip
                    planImage={pl.image?.rendition?.src}
                    planShortName={pl.shortName || undefined}
                    organization={
                      theme.settings?.multiplan?.hideLongPlanNames ? undefined : pl.name
                    }
                    size="lg"
                    negative={negativeChips}
                    link={true}
                  />
                </a>
              ))}
            </PlanRow>
          ))}
        </PlanList>
      </Container>
    </PlanListSection>
  );
};

export default RelatedPlanListBlock;
