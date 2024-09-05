'use client';
import { useEffect } from 'react';

import styled from 'styled-components';

import {
  activeGoalVar,
  activeScenarioVar,
  yearRangeVar,
} from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';

const FloatingToolbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PathsToolbar = () => {
  const paths = usePaths();
  if (!paths) return null;

  useEffect(() => {
    const { instance, scenarios } = paths;
    const activeScenario = scenarios.find((sc) => sc.isActive);
    const goals = instance.goals;

    if (!activeGoalVar()) {
      const defaultGoal =
        goals.length > 1 ? goals.find((goal) => goal.default) : goals[0];
      activeGoalVar(defaultGoal ?? null);
    }

    if (!activeScenarioVar()) {
      activeScenarioVar(activeScenario);
    }

    if (!yearRangeVar()) {
      const yearRange: [number, number] = [
        instance.minimumHistoricalYear ?? instance.referenceYear ?? 2010,
        instance.targetYear ?? instance.modelEndYear,
      ];
      yearRangeVar(yearRange);
    }
  }, [paths.instance.id]);

  const yearRange = yearRangeVar() || [0, 0];
  const activeGoal = activeGoalVar();
  const activeScenario = activeScenarioVar();

  console.log('activeGoal', activeGoal);
  console.log('activeScenario', activeScenario);
  return (
    <FloatingToolbar>
      {paths.instance.id} | Years: {yearRange[0]} - {yearRange[1]} | Goal:
      {activeGoal?.label} | Scenario: {activeScenario.name}
    </FloatingToolbar>
  );
};

export default PathsToolbar;
