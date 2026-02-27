import { useMemo } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';

import { activeScenarioVar } from '@common/apollo/paths-cache';

import SelectDropdown, { type SelectDropdownOption } from '@/components/common/SelectDropdown';
import { usePaths } from '@/context/paths/paths';
import { GET_SCENARIOS } from '@/queries/paths/get-paths-scenarios';
import { getHttpHeaders } from '@/utils/paths/paths.utils';

const pathsQueries = 'active';

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

const DropdownWrapper = styled.div<{ $isCustom: boolean }>`
  max-width: 320px;
  label {
    font-size: 0.8rem;
    margin: 0;
  }

  .scenario-select__control {
    font-size: 0.9rem !important;
    min-height: auto !important;
    border-width: 0 !important;
    // Using BS btn-secondary here for legacy support
    ${({ $isCustom }) => $isCustom && `background-color: #d4ebff !important;`}
  }

  /* Style the value container to match original padding */
  .scenario-select__value-container {
    padding: ${({ theme }) => theme.spaces.s050} !important;
    ${({ $isCustom }) => $isCustom && `background-color: #d4ebff !important;`}
  }

  /* Style the single value text */
  .scenario-select__single-value {
    font-size: 0.9rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 0 !important;
  }

  /* Ensure the control has proper text alignment */
  .scenario-select__control > div {
    text-align: left;
  }
`;

const ScenarioSelector = ({ disabled = false }: { disabled?: boolean }) => {
  const t = useTranslations();
  const paths = usePaths();

  const { loading, error, data } = useQuery(GET_SCENARIOS, {
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (dat) => activeScenarioVar(dat.scenarios.find((scen) => scen.isActive)),
  });

  const [activateScenario, { loading: mutationLoading, error: mutationError }] = useMutation(
    ACTIVATE_SCENARIO,
    {
      context: {
        uri: '/api/graphql-paths',
        headers: getHttpHeaders({ instanceIdentifier: paths?.instance.id }),
      },
      refetchQueries: pathsQueries,
    }
  );

  //const hideBaseScenario = instance.features?.baselineVisibleInGraphs === false;
  const hideBaseScenario = false;
  const scenarios =
    data?.scenarios?.filter((scen) => (hideBaseScenario ? scen.id !== 'baseline' : true)) ?? [];
  const activeScenario = scenarios.find((scen) => scen.isActive);

  // Convert scenarios to SelectDropdownOption format
  const options: SelectDropdownOption[] = useMemo(
    () =>
      scenarios.map((scenario) => ({
        id: scenario.id,
        label: scenario.name,
      })),
    [scenarios]
  );

  // Find the current selected option
  const selectedOption: SelectDropdownOption | null = useMemo(
    () =>
      activeScenario
        ? {
            id: activeScenario.id,
            label:
              !disabled && activeScenario.id === 'custom'
                ? `${activeScenario.name} *`
                : activeScenario.name,
          }
        : null,
    [activeScenario, disabled]
  );

  const handleChange = (option: SelectDropdownOption | null) => {
    if (option && !disabled) {
      activateScenario({ variables: { scenarioId: option.id } });
    }
  };

  return (
    <DropdownWrapper $isCustom={!disabled && activeScenario?.id === 'custom'}>
      <SelectDropdown
        id="scenario-selector"
        label={t('scenario')}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isMulti={false}
        isClearable={false}
        isDisabled={disabled || loading || mutationLoading}
        isLoading={loading || mutationLoading}
        menuPlacement="top"
        classNamePrefix="scenario-select"
        placeholder={loading || mutationLoading ? '...' : error ? t('error-loading-data') : '-'}
        noOptionsMessage={() => (error ? t('error-loading-data') : t('no-options'))}
      />
    </DropdownWrapper>
  );
};

export default ScenarioSelector;
