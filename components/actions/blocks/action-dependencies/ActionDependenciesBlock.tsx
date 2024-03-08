import styled, { css } from 'styled-components';
import { ActionCardFragment } from '@/common/__generated__/graphql';
import { ActionDependenciesGroup } from './ActionDependenciesGroup';
import Icon from '@/components/common/Icon';
import { ACTION_CONTENT_MAIN_BOTTOM } from '@/constants/containers';

type ActionGroup = {
  id: string;
  title: string;
  actions: ActionCardFragment[];
};

type Props = {
  activeActionId?: string;
  actionGroups: ActionGroup[];
};

const StyledIcon = styled(Icon)``;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spaces.s025};
  color: ${({ theme }) => theme.graphColors.grey020};

  ${({ theme }) => css`
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

function isActionGroupActive(
  actions: ActionCardFragment[],
  activeActionId?: string
) {
  return actions.length === 1 && actions[0].id === activeActionId;
}

export function ActionDependenciesBlock({
  activeActionId,
  actionGroups,
}: Props) {
  return (
    <StyledWrapper>
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
          />

          {i !== actionGroups.length - 1 && (
            <StyledIcon name="arrowRight" width="2em" height="2em" />
          )}
        </>
      ))}
    </StyledWrapper>
  );
}
