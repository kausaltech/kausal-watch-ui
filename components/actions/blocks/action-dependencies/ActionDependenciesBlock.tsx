import styled, { css } from 'styled-components';
import { ActionCardFragment } from '@/common/__generated__/graphql';
import { ActionDependenciesGroup } from './ActionDependenciesGroup';
import Icon from '@/components/common/Icon';
import { ACTION_CONTENT_MAIN_BOTTOM } from '@/constants/containers';
import { useTranslations } from 'next-intl';
import { getActionTermContext } from '@/common/i18n';
import { usePlan } from '@/context/plan';

type ActionGroup = {
  id: string;
  title: string;
  actions: ActionCardFragment[];
};

type Props = {
  activeActionId?: string;
  size?: 'default' | 'small';
  actionGroups: ActionGroup[];
  showTitle?: boolean;
};

const StyledIcon = styled(Icon)``;

const StyledWrapper = styled.div<{ $isVertical: boolean; $isSmall: boolean }>`
  display: flex;
  width: 100%;
  gap: ${({ theme, $isSmall }) =>
    $isSmall ? theme.spaces.s000 : theme.spaces.s025};
  color: ${({ theme }) => theme.graphColors.grey020};

  ${({ theme, $isVertical }) =>
    $isVertical
      ? css`
          flex-direction: column;
          align-items: center;

          ${StyledIcon} {
            transform: rotate(90deg);
          }
        `
      : css`
          @media (max-width: ${theme.breakpointMd}) {
            flex-direction: column;

            ${StyledIcon} {
              transform: rotate(90deg);
            }
          }

          @container ${ACTION_CONTENT_MAIN_BOTTOM} (max-width: ${theme.breakpointSm}) {
            flex-direction: column;

            ${StyledIcon} {
              transform: rotate(90deg);
            }
          }
        `}
`;

const StyledTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizeBase};
`;

function isActionGroupActive(
  actions: ActionCardFragment[],
  activeActionId?: string
) {
  return actions.length === 1 && actions[0].id === activeActionId;
}

export function ActionDependenciesBlock({
  activeActionId,
  actionGroups,
  size = 'default',
  showTitle = false,
}: Props) {
  const t = useTranslations();
  const plan = usePlan();

  return (
    <StyledWrapper $isVertical={size === 'small'} $isSmall={size === 'small'}>
      {showTitle && (
        <StyledTitle>
          {t('action-dependencies', getActionTermContext(plan))}
        </StyledTitle>
      )}
      {actionGroups.map((actionGroup, i) => (
        <>
          <ActionDependenciesGroup
            key={actionGroup.id}
            title={actionGroup.title}
            isHighlighted={isActionGroupActive(
              actionGroup.actions,
              activeActionId
            )}
            actions={actionGroup.actions}
            size={size}
          />

          {i !== actionGroups.length - 1 && (
            <StyledIcon name="arrowRight" width="2em" height="2em" />
          )}
        </>
      ))}
    </StyledWrapper>
  );
}
