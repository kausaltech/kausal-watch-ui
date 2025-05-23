import { useCallback, useEffect, useRef, useState } from 'react';

import GoalSelector from 'components/paths/GoalSelector';
import RangeSelector from 'components/paths/RangeSelector';
import ScenarioSelector from 'components/paths/ScenarioSelector';
import GoalOutcomeBar from 'components/paths/toolbar/GoalOutcomeBar';
import { useTranslations } from 'next-intl';
import { Col, Container, Popover, PopoverBody, Row } from 'reactstrap';
import styled from 'styled-components';

import { activeGoalVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { useReactiveVar } from '@apollo/client';

const PanelContent = styled.div`
  padding: ${({ theme }) =>
    `${theme.spaces.s150} ${theme.spaces.s050} ${theme.spaces.s050}`};
`;

const ButtonLabel = styled.div`
  white-space: nowrap;
  font-size: 0.8rem;
`;

const StyledRow = styled(Row)`
  --bs-gutter-x: ${({ theme }) => theme.spaces.s100};

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    --bs-gutter-x: ${({ theme }) => theme.spaces.s050};
  }
`;

const StyledDropdownCol = styled(Col)`
  display: flex;
  justify-content: stretch;
  align-items: center;

  > div {
    width: 100%;
  }
`;

const StyledOutcomeCol = styled(Col)`
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: none;
  }
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
  const { minYear, maxYear, referenceYear, disabled = false } = props;
  const inputReference = useRef<HTMLDivElement>(null);
  const triggerReference = useRef<HTMLButtonElement | null>(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    if (disabled) {
      setPopoverOpen(false);
      yearRangeVar([minYear, maxYear]);
    }
  }, [disabled, maxYear, minYear]);

  // State of display settings
  // Year range
  const yearRange = useReactiveVar(yearRangeVar) ?? [minYear, maxYear];

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

  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerReference.current = node;
    },
    [triggerReference]
  );

  const setYearRange = useCallback(
    (newRange: [number, number]) => {
      yearRangeVar(newRange);
    },
    [yearRangeVar]
  );
  const t = useTranslations();
  const buttonLabel = disabled ? '-' : `${yearRange[0]}–${yearRange[1]}`;
  if (!yearRange) return <div>Loading...</div>;
  return (
    <div>
      <ButtonLabel>{t('comparing-years')}</ButtonLabel>
      <StyledButton
        className={`btn btn-light ${disabled ? 'disabled' : ''}`}
        id="rangeSelector"
        aria-expanded={popoverOpen}
        aria-haspopup="dialog"
        aria-controls="rangeSelectorPopover"
        ref={setTriggerRef}
        disabled={disabled}
      >
        {buttonLabel}
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

function getColumnSizes(hasMultipleGoals: boolean) {
  if (hasMultipleGoals) {
    return {
      scenario: { xs: 4, md: 2 },
      yearRange: { xs: 3, md: 2 },
      goal: { xs: 5, md: 3 },
      outcome: { md: 5 },
    };
  }

  return {
    scenario: { xs: 6, md: 3 },
    yearRange: { xs: 6, md: 3 },
    goal: undefined,
    outcome: { md: 6 },
  };
}

const MediumSettings = (props) => {
  const paths = usePaths();
  const instance = paths?.instance;
  const nrGoals = instance.goals.length;
  const hasMultipleGoals = nrGoals > 1;
  const columnSizes = getColumnSizes(hasMultipleGoals);
  const activeGoal = useReactiveVar(activeGoalVar);
  // TODO: This is a hack. We should get this from the backend.
  const goalHasSeparateYears = activeGoal?.separateYears;

  return (
    <Container fluid="xl">
      <PanelContent>
        <StyledRow>
          {hasMultipleGoals && (
            <StyledDropdownCol {...columnSizes.goal}>
              <GoalSelector />
            </StyledDropdownCol>
          )}

          <StyledDropdownCol {...columnSizes.yearRange}>
            <YearRangeSelector
              minYear={instance.minimumHistoricalYear}
              maxYear={instance.modelEndYear}
              referenceYear={instance.referenceYear}
              disabled={!!goalHasSeparateYears}
            />
          </StyledDropdownCol>
          <StyledDropdownCol {...columnSizes.scenario}>
            <ScenarioSelector disabled={goalHasSeparateYears} />
          </StyledDropdownCol>
          <StyledOutcomeCol className="text-right" {...columnSizes.outcome}>
            {goalHasSeparateYears ? <div /> : <GoalOutcomeBar compact />}
          </StyledOutcomeCol>
        </StyledRow>
      </PanelContent>
    </Container>
  );
};

export default MediumSettings;
