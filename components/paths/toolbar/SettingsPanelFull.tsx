'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { transparentize } from 'polished';
import { Button } from 'reactstrap';
import styled from 'styled-components';

import Icon from '@/components/common/Icon';

import CompleteSettings from './CompleteSettings';
import MediumSettings from './MediumSettings';

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
  //border-top: 2px solid ${(props) => props.theme.graphColors.grey050};

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

    &::before {
      content: '';
      position: fixed;
      z-index: -50;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) =>
        transparentize(0.15, props.theme.graphColors.grey090)};
    }
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
};

const SettingsPanelFull: React.FC = () => {
  //const paths = usePaths();
  //const instance = paths.instance;
  // console.log("Site", "Instance", site, instance);

  const [mode, setMode] = useState(MODE.MD);

  const handleToggle = (e) => {
    e.preventDefault();
    if (mode === MODE.LG) {
      setMode(MODE.MD);
    } else if (mode === MODE.MD) {
      setMode(MODE.LG); // TODO: make SM mobile only
    } else {
      setMode(MODE.LG);
    }
  };

  // State of display settings
  // Year range
  /*
  const yearRange = useReactiveVar(yearRangeVar);
  const setYearRange = useCallback(
    (newRange: [number, number]) => {
      yearRangeVar(newRange);
    },
    [yearRangeVar]
  );
  */
  const t = useTranslations();

  // Normalization
  //const availableNormalizations = site.availableNormalizations;

  // Target
  //const nrGoals = instance.goals.length;

  // console.log(props);
  return (
    <FixedPanel className={`panel-${mode}`} aria-label={t('all-settings')}>
      <StyledSettingsButton onClick={(e) => handleToggle(e)}>
        {mode === MODE.MD && (
          <>
            <Icon name="gear" />{' '}
            <StyledButtonLabel>{t('settings-expand')}</StyledButtonLabel>
          </>
        )}
        {mode === MODE.LG && (
          <>
            <Icon name="angle-down" />{' '}
            <StyledButtonLabel>{t('settings-collapse')}</StyledButtonLabel>
          </>
        )}
      </StyledSettingsButton>
      {mode === MODE.MD && <MediumSettings />}
      {mode === MODE.LG && <CompleteSettings />}
    </FixedPanel>
  );
};

export default SettingsPanelFull;
