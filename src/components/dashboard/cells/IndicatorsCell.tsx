import Icon from 'components/common/Icon';
import styled, { useTheme } from 'styled-components';

import { ActionListAction } from '../dashboard.types';

interface Props {
  action: ActionListAction;
}

const IndicatorsDisplay = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
`;

const IndicatorsCell = ({ action }: Props) => {
  const theme = useTheme();
  const hasIndicators = action.indicatorsCount != null && action.indicatorsCount > 0;
  const hasGoals = action.hasIndicatorsWithGoals === true;

  return (
    <IndicatorsDisplay>
      <Icon.Tachometer
        color={hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
      <Icon.Bullseye
        color={hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030}
        height="1.2em"
        width="1.2em"
      />
    </IndicatorsDisplay>
  );
};

export default IndicatorsCell;
