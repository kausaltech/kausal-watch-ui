import styled from 'styled-components';
import { ActionCardFragment } from '@/common/__generated__/graphql';
import ActionCard from '../../ActionCard';
import { useTranslations } from 'next-intl';
import { usePlan } from '@/context/plan';
import { getActionTermContext } from '@/common/i18n';

const StyledActionGroup = styled.div<{ $isSmall: boolean }>`
  background-color: ${({ theme }) => theme.cardBackground.secondary};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  padding: ${({ theme }) => theme.spaces.s050};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme, $isSmall }) =>
    $isSmall ? theme.spaces.s050 : theme.spaces.s100};
  text-align: ${({ $isSmall }) => ($isSmall ? 'center' : 'left')};
  width: 100%;
`;

const StyledGroupTitle = styled.h5`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizeSm};
  text-transform: uppercase;
  color: ${({ theme }) => theme.textColor.tertiary};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

const StyledHelpText = styled.p`
  color: ${({ theme }) => theme.textColor.secondary};
  font-size: ${({ theme }) => theme.fontSizeSm};
  font-style: italic;
  margin: 0;
  line-height: 1;
`;

type Props = {
  title: string;
  size?: 'default' | 'small';
  isHighlighted?: boolean;
  actions: ActionCardFragment[];
};

export function ActionDependenciesGroup({
  title,
  actions,
  size = 'default',
  isHighlighted = false,
}: Props) {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <StyledActionGroup $isSmall={size === 'small'}>
      <StyledGroupTitle>{title}</StyledGroupTitle>

      {size === 'small' && actions.length > 0 ? (
        <>
          <ActionCard
            action={actions[0]}
            variant="text-only"
            isLink={!isHighlighted}
            isHighlighted={isHighlighted}
          />
          {actions.length > 1 && (
            <StyledHelpText>
              {t('n-more-actions', {
                count: actions.length - 1,
                ...getActionTermContext(plan),
              })}
            </StyledHelpText>
          )}
        </>
      ) : (
        <>
          {actions.map((action) => (
            <ActionCard
              key={action.id}
              action={action}
              variant="mini"
              isLink={!isHighlighted}
              isHighlighted={isHighlighted}
            />
          ))}
        </>
      )}
    </StyledActionGroup>
  );
}
