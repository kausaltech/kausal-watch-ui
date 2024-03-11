import styled from 'styled-components';
import { ActionCardFragment } from '@/common/__generated__/graphql';
import ActionCard from '../../ActionCard';

const StyledActionGroup = styled.div<{ $isHighlighted: boolean }>`
  border: 2px solid currentColor;
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s100};
`;

const StyledGroupTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizeSm};
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColor.tertiary};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

type Props = {
  title: string;
  isHighlighted?: boolean;
  actions: ActionCardFragment[];
};

export function ActionDependenciesGroup({
  title,
  actions,
  isHighlighted = false,
}: Props) {
  return (
    <StyledActionGroup $isHighlighted={isHighlighted}>
      <StyledGroupTitle>{title}</StyledGroupTitle>

      {actions.map((action) => (
        <ActionCard
          key={action.id}
          action={action}
          variant="mini"
          isLink={!isHighlighted}
          isHighlighted={isHighlighted}
        />
      ))}
    </StyledActionGroup>
  );
}
