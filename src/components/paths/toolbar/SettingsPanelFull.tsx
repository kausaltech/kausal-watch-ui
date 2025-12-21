'use client';

import { useEffect, useState } from 'react';

import { useReactiveVar } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import { useTheme } from 'styled-components';

import Icon from '@/components/common/Icon';
import type { PathsInstanceType } from '@/components/providers/PathsProvider';
import {
  activeGoalVar,
  activeScenarioVar,
  showSettingsPanelVar,
  yearRangeVar,
} from '@/context/paths/cache';
//import type { GetInstanceContextQuery } from '@/common/__generated__/paths/graphql';
import { usePaths } from '@/context/paths/paths';

import CompleteSettings from './CompleteSettings';
import MediumSettings from './MediumSettings';

type AugmentedGoal = PathsInstanceType['instance']['goals'][number];

const Spacer = styled.div`
  // Add space under footer for approximate height of the settings panel
  height: 120px;
  background-color: ${(props) => props.theme.themeColors.dark};
`;

const FixedPanel = styled.aside`
  position: fixed;
  z-index: 255;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.graphColors.grey000};
  color: ${(props) => props.theme.graphColors.grey090};
  box-shadow: 0 0 4px 4px rgba(20, 20, 20, 0.05);
  transition: height 0.25s;

  &.panel-sm {
    height: 4rem;
  }

  &.panel-md {
    height: 7.5rem;

    @media (max-width: ${(props) => props.theme.breakpointMd}) {
      height: 6rem;
    }
  }

  &.panel-lg {
    height: 95%;
  }
`;

const StyledSettingsButton = styled(Button)`
  position: absolute;
  background-color: ${(props) => props.theme.themeColors.white} !important;
  z-index: 25;
  height: 2.5rem;
  border-radius: 1.25rem;
  padding: ${({ theme }) => `0 ${theme.spaces.s050}`};
  top: -1.5rem;
  right: 6px;
  box-shadow: 3px 3px 12px rgba(33, 33, 33, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.graphColors.grey030};
  }
`;

const StyledButtonLabel = styled.span`
  margin-left: ${({ theme }) => theme.spaces.s050};
  font-size: ${({ theme }) => theme.fontSizeSm};
`;

// Handle panel states
const MODE = {
  MD: 'md',
  LG: 'lg',
  NONE: 'none',
};

const SettingsPanelFull: React.FC = () => {
  const paths = usePaths() as PathsInstanceType;
  const showSettingsPanel = useReactiveVar(showSettingsPanelVar);

  const t = useTranslations();
  const theme = useTheme();

  // allowHidingSettingsPanel===false enables legacy behaviour of showing the panel on every page
  // showSettingsPanel===false means the panel is always hidden
  // showSettingsPanel controls the visibility of the panel from the page

  const [mode, setMode] = useState(MODE.MD);

  useEffect(() => {
    if (!showSettingsPanel && theme.settings.paths.allowHidingSettingsPanel) {
      setMode(MODE.NONE);
    } else {
      setMode(MODE.MD);
    }
  }, [showSettingsPanel]);
  // Initialize default values only on mount. We don't want to reset user-modified values.
  // We do not want to unmount this when page changes so hiding the panel on relevant pages
  // is handled in the MediumSettings component.
  useEffect(() => {
    if (!paths || paths.instance.id === 'unknown') return;
    const { instance, scenarios } = paths;
    const firstActiveScenario = scenarios.find((sc) => sc.isActive);
    const goals = instance.goals;

    if (!activeGoalVar()) {
      const defaultGoal = goals.length > 1 ? goals.find((goal) => goal.default) : goals[0];
      activeGoalVar((defaultGoal as AugmentedGoal | undefined) ?? null);
    }

    if (!activeScenarioVar()) {
      activeScenarioVar(firstActiveScenario ?? undefined);
    }

    if (!yearRangeVar()) {
      const initialYearRange: [number, number] = [
        instance.minimumHistoricalYear ?? instance.referenceYear ?? 2010,
        instance.targetYear ?? instance.modelEndYear,
      ];
      yearRangeVar(initialYearRange);
    }
  });

  if (!paths || paths.instance.id === 'unknown' || theme.settings.paths.disableScenarioEditing)
    return null;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (mode === MODE.LG) {
      setMode(MODE.MD);
    } else if (mode === MODE.MD) {
      setMode(MODE.LG); // TODO: make SM mobile only
    } else {
      setMode(MODE.LG);
    }
  };

  return (
    <>
      <Spacer />
      <FixedPanel className={`panel-${mode}`} aria-label={t('all-settings')}>
        {mode !== MODE.NONE && (
          <StyledSettingsButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleToggle(e)}
          >
            {mode === MODE.MD && (
              <>
                <Icon name="gear" /> <StyledButtonLabel>{t('settings-expand')}</StyledButtonLabel>
              </>
            )}
            {mode === MODE.LG && (
              <>
                <Icon name="angle-down" />{' '}
                <StyledButtonLabel>{t('settings-collapse')}</StyledButtonLabel>
              </>
            )}
          </StyledSettingsButton>
        )}
        {mode === MODE.MD && mode !== MODE.NONE && <MediumSettings />}
        {mode === MODE.LG && <CompleteSettings />}
      </FixedPanel>
    </>
  );
};

export default SettingsPanelFull;
