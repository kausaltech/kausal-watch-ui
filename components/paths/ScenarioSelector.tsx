import { useState } from 'react';

import { useTranslations } from 'next-intl';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from 'reactstrap';
import styled from 'styled-components';

/*
import {
  ActivateScenarioMutation,
  ActivateScenarioMutationVariables,
  GetScenariosQuery,
} from 'common/__generated__/graphql';
 */
import { activeScenarioVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import { gql, useMutation, useQuery } from '@apollo/client';

const ACTIVATE_SCENARIO = gql`
  mutation ActivateScenario($scenarioId: ID!) {
    activateScenario(id: $scenarioId) {
      ok
      activeScenario {
        id
        name
      }
    }
  }
`;

const StyledDropdown = styled(Dropdown)`
  max-width: 320px;

  .btn {
    width: 100%;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.9rem;
    padding: ${({ theme }) => theme.spaces.s050};

    &:focus {
      box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
    }
  }
`;

const DropdownLabel = styled.div`
  font-size: 0.8rem;
`;

const ScenarioSelector = () => {
  const t = useTranslations();
  const paths = usePaths();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { loading, error, data } = useQuery(GET_SCENARIOS, {
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (dat) =>
      activeScenarioVar(dat.scenarios.find((scen) => scen.isActive)),
  });
  const [activateScenario, { loading: mutationLoading, error: mutationError }] =
    useMutation(ACTIVATE_SCENARIO, {
      context: {
        uri: '/api/graphql-paths',
        headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
      },
      refetchQueries: ['GetPathsActionList', 'GetScenarios'],
    });

  if (loading) {
    return (
      <StyledDropdown>
        <DropdownLabel>{t('scenario')}</DropdownLabel>
        <DropdownToggle color="light">
          <span>
            <Spinner size="sm" color="primary" />
          </span>
        </DropdownToggle>
      </StyledDropdown>
    );
  }
  if (error) {
    return <div>{t('error-loading-data')}: mutationError</div>;
  }

  //const hideBaseScenario = instance.features?.baselineVisibleInGraphs === false;
  const hideBaseScenario = false;
  const scenarios =
    data?.scenarios.filter((scen) =>
      hideBaseScenario ? scen.id !== 'baseline' : true
    ) ?? [];
  const activeScenario = scenarios.find((scen) => scen.isActive);

  return (
    <StyledDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownLabel>{t('scenario')}</DropdownLabel>
      <DropdownToggle
        color={`${activeScenario.id === 'custom' ? 'secondary' : 'light'}`}
      >
        <span>{activeScenario.name}</span>
        <span>{activeScenario.id === 'custom' && <span>*</span>}</span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{t('change-scenario')}</DropdownItem>
        {scenarios?.map((scenario) => (
          <DropdownItem
            key={scenario.id}
            active={scenario.isActive}
            onClick={() =>
              activateScenario({ variables: { scenarioId: scenario.id } })
            }
          >
            {scenario.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledDropdown>
  );
};

export default ScenarioSelector;
