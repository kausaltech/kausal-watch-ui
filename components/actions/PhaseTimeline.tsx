import get from 'lodash/get';
import { useTheme } from 'common/theme';
import Icon from 'components/common/Icon';
import { usePlan } from 'context/plan';
import styled from 'styled-components';
import { ActionContentAction } from './ActionContent';
import { Theme } from '@kausal/themes/types';

type PhaseType = 'completed' | 'current' | 'todo';

type PhaseIndicatorProps = {
  index: number;
  totalPhases: number;
  type: PhaseType;
  color: string;
  nextColor?: string;
};

type PhaseTimelineProps = {
  activePhase: NonNullable<ActionContentAction['implementationPhase']>;
};

const StyledContainer = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const StyledPhaseIndicatorContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1px;
`;

const StyledPhaseName = styled.p<{ $color: string; $type: PhaseType }>`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightSm};
  font-family: ${({ theme }) => theme.fontFamilyTiny};
  padding: 0 ${({ theme }) => theme.spaces.s050};
  margin: ${({ theme }) => theme.spaces.s050} 0 0;
  color: ${({ $color }) => $color};
  ${({ $type }) => $type === 'current' && 'font-weight: bold;'}
`;

const StyledPhase = styled.li`
  display: flex;
  flex-direction: column;

  &:first-of-type ${StyledPhaseName} {
    padding-left: 0;
  }

  &:last-of-type ${StyledPhaseName} {
    padding-right: 0;
  }
`;

const StyledPhaseLine = styled.div<{ $hidden: boolean; $color: string }>`
  background: ${({ $color }) => $color};
  height: 2px;
  flex: 1 0 auto;

  ${({ $hidden }) => $hidden && 'visibility: hidden;'}
`;

const PHASE_CONFIG: {
  [key in PhaseType]: { icon: string; colorKey: string; textColorKey: string };
} = {
  completed: {
    icon: 'circle-full',
    colorKey: 'phaseTimelineColor',
    textColorKey: 'textColor.primary',
  },
  current: {
    icon: 'circle-half',
    colorKey: 'phaseTimelineColor',
    textColorKey: 'textColor.primary',
  },
  todo: {
    icon: 'circle-outline',
    colorKey: 'graphColors.grey030',
    textColorKey: 'textColor.tertiary',
  },
};

function getIconFromType(type: PhaseType, isLastPhase: boolean) {
  // Always display a checked circle if all phases are complete
  if (type === 'current' && isLastPhase) {
    return 'check-circle';
  }

  return PHASE_CONFIG[type].icon;
}

function getColorFromType(
  type: PhaseType,
  theme: Theme,
  key: 'colorKey' | 'textColorKey' = 'colorKey'
) {
  const colorKey = PHASE_CONFIG[type][key];

  return get(theme, colorKey);
}

function getPhaseType(phaseIndex: number, activePhaseIndex: number): PhaseType {
  if (activePhaseIndex > phaseIndex) {
    return 'completed';
  }

  if (activePhaseIndex === phaseIndex) {
    return 'current';
  }

  return 'todo';
}

function PhaseIndicator({
  index,
  totalPhases,
  type,
  color,
  nextColor,
}: PhaseIndicatorProps) {
  return (
    <StyledPhaseIndicatorContainer>
      <StyledPhaseLine $hidden={index === 0} $color={color} />
      <Icon
        name={getIconFromType(type, index === totalPhases - 1)}
        color={color}
        width="20px"
        height="20px"
      />
      <StyledPhaseLine
        $hidden={index === totalPhases - 1}
        $color={nextColor ?? color}
      />
    </StyledPhaseIndicatorContainer>
  );
}

export function PhaseTimeline({ activePhase }: PhaseTimelineProps) {
  const plan = usePlan();
  const theme = useTheme();
  const phases = plan.actionImplementationPhases;
  const activePhaseIndex = phases.findIndex(
    (phase) => phase.identifier === activePhase.identifier
  );

  return (
    <StyledContainer>
      {phases.map((phase, index) => {
        const phaseType = getPhaseType(index, activePhaseIndex);
        const nextPhaseType =
          index + 1 < phases.length
            ? getPhaseType(index + 1, activePhaseIndex)
            : undefined;

        return (
          <StyledPhase key={phase.id}>
            <PhaseIndicator
              index={index}
              totalPhases={phases.length}
              type={phaseType}
              color={getColorFromType(phaseType, theme)}
              nextColor={
                nextPhaseType
                  ? getColorFromType(nextPhaseType, theme)
                  : undefined
              }
            />

            <StyledPhaseName
              $type={phaseType}
              $color={getColorFromType(phaseType, theme, 'textColorKey')}
            >
              {phase.name}
            </StyledPhaseName>
          </StyledPhase>
        );
      })}
    </StyledContainer>
  );
}
