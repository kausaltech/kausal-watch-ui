import { useMemo } from 'react';

import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';

import { activeGoalVar } from '@common/apollo/paths-cache';

import SelectDropdown, { type SelectDropdownOption } from '@/components/common/SelectDropdown';
import { usePaths } from '@/context/paths/paths';

const DropdownWrapper = styled.div`
  max-width: 320px;
  label {
    font-size: 0.8rem;
    margin: 0;
  }

  .goal-select__control {
    font-size: 0.9rem !important;
    min-height: auto !important;
    border-width: 0 !important;
  }

  /* Style the value container to match original padding */
  .goal-select__value-container {
    padding: ${({ theme }) => theme.spaces.s050} !important;
  }

  /* Style the single value text */
  .goal-select__single-value {
    font-size: 0.9rem !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    margin: 0 !important;
  }

  /* Ensure the control has proper text alignment */
  .goal-select__control > div {
    text-align: left;
  }
`;

const GoalSelector = () => {
  const t = useTranslations();
  const paths = usePaths();
  const activeGoal = useReactiveVar(activeGoalVar);

  // Convert goals to SelectDropdownOption format
  const options: SelectDropdownOption[] = useMemo(
    () =>
      paths?.instance.goals.map((goal) => {
        const label = goal.label ?? '';
        return {
          id: goal.id,
          label: goal.disabled ? `${label} (${t('coming-soon')})` : label,
        };
      }) ?? [],
    [paths?.instance.goals, t]
  );

  // Find the current selected option
  const selectedOption: SelectDropdownOption | null = useMemo(
    () =>
      activeGoal
        ? {
            id: activeGoal.id,
            label: activeGoal.label ?? '',
          }
        : null,
    [activeGoal]
  );

  const handleChange = (option: SelectDropdownOption | null) => {
    if (option) {
      // Make sure we're using the augmented goal object
      const newGoal = paths?.instance.goals.find((g) => g.id === option.id);
      if (newGoal && !newGoal.disabled) {
        // Type assertion: goal comes from the same source as activeGoalVar expects
        // The goal may be augmented with additional properties elsewhere
        activeGoalVar(newGoal as any);
      }
    }
  };

  return (
    <DropdownWrapper>
      <SelectDropdown
        id="goal-selector"
        label={t('target')}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isMulti={false}
        isClearable={false}
        menuPlacement="top"
        classNamePrefix="goal-select"
        isOptionDisabled={(option) => {
          const goal = paths?.instance.goals.find((g) => g.id === option.id);
          return goal?.disabled ?? false;
        }}
      />
    </DropdownWrapper>
  );
};

export default GoalSelector;
