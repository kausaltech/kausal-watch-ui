import styled from 'styled-components';

import { ParameterInterface } from '@/common/__generated__/paths/graphql';

//import { ActionParameterFragment } from 'common/__generated__/graphql';
import ParameterWidget from './ParameterWidget';

const Parameters = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  & > div {
    margin-bottom: 0.5rem;
  }
`;

const ActionParameters = (props: { parameters: ParameterInterface[] }) => {
  const { parameters } = props;
  console.log('parameters', parameters);
  if (!parameters) {
    return null;
  }
  // Separate mandatory on/off parameter with standard id
  const actionParameterSwitchParameter = parameters.find(
    (param) => param.node && param.id === `${param.node.id}.enabled`
  );
  const actionParameterSwitch = {
    ...actionParameterSwitchParameter,
    __typename: 'EnableParameterType',
  } as ParameterInterface;
  const actionOtherParameters = parameters.filter(
    (param) => param.id !== actionParameterSwitch?.id
  );
  const actionEnabled = actionParameterSwitch?.boolValue;

  return (
    <Parameters>
      {actionParameterSwitch && (
        <ParameterWidget
          key={actionParameterSwitch.id}
          parameter={actionParameterSwitch}
        />
      )}
      {actionEnabled &&
        actionOtherParameters?.map((parameter) => (
          <ParameterWidget key={parameter.id} parameter={parameter} />
        ))}
    </Parameters>
  );
};

export default ActionParameters;
