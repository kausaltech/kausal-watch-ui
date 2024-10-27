import styled from 'styled-components';

import { useTheme } from 'styled-components';
import Icon from '@/components/common/Icon';
import { ActionListAction } from '../dashboard.types';

const ResponsibleList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.spaces.s050};
`;

interface Props {
  action: ActionListAction;
}

const ResponsiblePartiesCell = ({ action }: Props) => {
  const theme = useTheme();
  const hasContactCount = action.responsibleParties.filter(
    // TODO: Fix missing type property. hasContactPerson is added to actions higher in the component tree
    (party) => !!party?.hasContactPerson
  ).length;
  const noContactCount = action.responsibleParties.length - hasContactCount;

  return (
    <ResponsibleList>
      {Array(hasContactCount)
        .fill(null)
        .map((_, i) => (
          <Icon.DotCircle
            key={i}
            color={theme.actionOnTimeColor}
            width=".8em"
            height=".8em"
          />
        ))}

      {Array(noContactCount)
        .fill(null)
        .map((_, i) => (
          <Icon.CircleOutline
            color={theme.actionOnTimeColor}
            key={i}
            width=".8em"
            height=".8em"
          />
        ))}
    </ResponsibleList>
  );
};

export default ResponsiblePartiesCell;
