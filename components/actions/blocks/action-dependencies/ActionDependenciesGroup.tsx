import styled from 'styled-components';
import { Action } from '@/common/__generated__/graphql';
import { ActionDependenciesActionCard } from './ActionDependenciesActionCard';

const StyledActionGroup = styled.div<{ $isHighlighted: boolean }>`
  border: 2px solid
    ${({ theme, $isHighlighted }) =>
      $isHighlighted ? theme.graphColors.blue030 : 'currentColor'};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s050};
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
  actions: Action[];
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
        <ActionDependenciesActionCard
          key={action.id}
          title={action.name}
          status={{
            label: action.status?.name,
            identifier: action.status?.identifier,
          }}
        />
      ))}
    </StyledActionGroup>
  );
}
