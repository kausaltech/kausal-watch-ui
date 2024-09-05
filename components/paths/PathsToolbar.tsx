'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { Popover, PopoverBody } from 'reactstrap';
import styled from 'styled-components';

import {
  activeGoalVar,
  activeScenarioVar,
  yearRangeVar,
} from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { useReactiveVar } from '@apollo/client';

import RangeSelector from './RangeSelector';

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

const ButtonLabel = styled.div`
  white-space: nowrap;
  font-size: 0.8rem;
`;

const StyledButton = styled.button<{ ref: HTMLButtonElement }>`
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spaces.s050};

  &:focus {
    box-shadow: 0 0 0 0.25rem ${(props) => props.theme.inputBtnFocusColor};
  }
`;

const YearRangeSelector = (props) => {
  const { minYear, maxYear, referenceYear } = props;
  const inputReference = useRef<HTMLDivElement>(null);
  const triggerReference = useRef<HTMLButtonElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const toggle = () => {
    setPopoverOpen(!popoverOpen);
    // Focus on the input when the popover is opened
    setTimeout(() => {
      if (popoverOpen) {
        triggerReference?.current?.focus();
      } else {
        inputReference?.current?.focus();
      }
    }, 0);
  };

  // State of display settings
  // Year range
  const yearRange = useReactiveVar(yearRangeVar);

  const setYearRange = useCallback(
    (newRange: [number, number]) => {
      yearRangeVar(newRange);
    },
    [yearRangeVar]
  );
  const t = useTranslations();

  if (!yearRange) return <div>Loading...</div>;
  return (
    <div>
      <ButtonLabel>{t('comparing-years')}</ButtonLabel>
      <StyledButton
        className="btn btn-light"
        id="rangeSelector"
        aria-expanded={popoverOpen}
        aria-haspopup="dialog"
        aria-controls="rangeSelectorPopover"
        ref={triggerReference}
      >
        {`${yearRange[0]}–${yearRange[1]}`}
      </StyledButton>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="rangeSelector"
        toggle={toggle}
        trigger="click"
        aria-modal="true"
      >
        <PopoverBody>
          <div tabIndex={-1} ref={inputReference}>
            <RangeSelector
              min={minYear}
              max={maxYear}
              defaultMin={yearRange[0]}
              defaultMax={yearRange[1]}
              referenceYear={referenceYear}
              handleChange={setYearRange}
            />
          </div>
        </PopoverBody>
      </Popover>
    </div>
  );
};

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
      <YearRangeSelector
        minYear={paths.instance.minimumHistoricalYear}
        maxYear={paths.instance.modelEndYear}
        referenceYear={paths.instance.referenceYear}
      />
    </FloatingToolbar>
  );
};

export default PathsToolbar;
