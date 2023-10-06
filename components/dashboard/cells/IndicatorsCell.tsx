import { ActionListAction } from '../dashboard.types';
import styled, { useTheme } from 'styled-components';
import Icon from 'components/common/Icon';

interface Props {
  action: ActionListAction;
}

const IndicatorsDisplay = styled.div`
  display: inline-block;
  padding: ${(props) => props.theme.spaces.s050};
`;

const IndicatorsCell = ({ action }: Props) => {
  const theme = useTheme();
  const hasIndicators = action.relatedIndicators.length > 0;
  const hasGoals = action.relatedIndicators.some(
    (relatedIndicator) => !!relatedIndicator.indicator.goals?.length
  );

  return (
    <IndicatorsDisplay>
      <Icon
        name="tachometer"
        color={
          hasIndicators ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
      <Icon
        name="bullseye"
        color={
          hasGoals ? theme.graphColors.green070 : theme.graphColors.grey030
        }
        height="1.2em"
        width="1.2em"
      />
    </IndicatorsDisplay>
  );
};

export default IndicatorsCell;
