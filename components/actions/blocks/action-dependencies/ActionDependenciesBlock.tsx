import styled from 'styled-components';
import { ActionCardFragment } from '@/common/__generated__/graphql';
import { ActionDependenciesGroup } from './ActionDependenciesGroup';
import Icon from '@/components/common/Icon';

type ActionGroup = {
  id: string;
  title: string;
  actions: ActionCardFragment[];
};

type Props = {
  activeActionId?: string;
  actionGroups: ActionGroup[];
};

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${({ theme }) => theme.spaces.s025};
  color: ${({ theme }) => theme.graphColors.grey020};
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
            <Icon name="arrowRight" width="2em" height="2em" />
          )}
        </>
      ))}
    </StyledWrapper>
  );
}
