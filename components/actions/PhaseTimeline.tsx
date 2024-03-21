import get from 'lodash/get';
import { useTheme } from 'styled-components';
import Icon from 'components/common/Icon';
import { usePlan } from 'context/plan';
import styled, { css } from 'styled-components';
import { ActionContentAction } from './ActionContent';
import { Theme } from '@kausal/themes/types';
import { RefObject, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

// Used to determine the style of icon visualizing a phase, not to be confused with phase identifiers
type PhaseType = 'done' | 'current' | 'todo';

type PhaseTimelineProps = {
  activePhase: NonNullable<ActionContentAction['implementationPhase']>;
  layout?: 'vertical' | 'horizontal' | 'mini';
  isContinuous?: boolean;
};

type PhaseIndicatorProps = {
  phaseIdentifier: string;
  index: number;
  totalPhases: number;
  type: PhaseType;
  color: string;
  nextColor?: string;
  layout: PhaseTimelineProps['layout'];
  isContinuous?: boolean;
};

const verticalContainerStyles = css`
  grid-auto-flow: row;
`;

const horizontalContainerStyles = css<{ $isMini?: boolean }>`
  grid-auto-flow: column;
  justify-content: start;
  ${({ $isMini }) => !$isMini && 'grid-auto-columns: 1fr;'}
`;

const StyledContainer = styled.ul<{ $isVertical?: boolean; $isMini?: boolean }>`
  display: grid;
  margin: 0;
  padding: 0;
  list-style-type: none;

  ${({ $isVertical }) =>
    $isVertical ? verticalContainerStyles : horizontalContainerStyles}
`;

const verticalIndicatorStyles = css`
  flex-direction: column;
  align-items: center;
`;

const horizontalIndicatorStyles = css`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledPhaseIndicatorContainer = styled.div<{ $isVertical: boolean }>`
  display: flex;
  gap: 1px;

  ${({ $isVertical }) =>
    $isVertical ? verticalIndicatorStyles : horizontalIndicatorStyles}
`;

const StyledMiniPhaseName = styled.p`
  font-size: ${({ theme }) => theme.fontSizeSm};
  line-height: ${({ theme }) => theme.lineHeightSm};
  font-family: ${({ theme }) => theme.fontFamilyTiny};
  color: ${({ theme }) => theme.textColor.primary};
  margin-top: ${({ theme }) => theme.spaces.s050};
`;

const StyledPhaseName = styled(StyledMiniPhaseName)<{
  $isVertical?: boolean;
  $color?: string;
  $type: PhaseType;
}>`
  text-align: center;
  padding: 0 ${({ theme }) => theme.spaces.s050};
  margin: ${({ theme, $isVertical }) =>
    $isVertical ? '4px 0 0' : `${theme.spaces.s050} 0 0`};
  color: ${({ $color }) => $color};
  ${({ $type }) => $type === 'current' && 'font-weight: bold;'}
`;

const verticalPhaseStyles = css`
  flex-direction: row;
  align-items: flex-start;
`;

const horizontalPhaseStyles = css`
  flex-direction: column;

  &:first-of-type ${StyledPhaseName} {
    padding-left: 0;
  }

  &:last-of-type ${StyledPhaseName} {
    padding-right: 0;
  }
`;

const StyledPhase = styled.li<{ $isVertical: boolean }>`
  display: flex;

  ${({ $isVertical }) =>
    $isVertical ? verticalPhaseStyles : horizontalPhaseStyles}
`;

const verticalLineStyles = css<{ $hidden?: boolean }>`
  width: 2px;
  height: 14px;
  ${({ $hidden }) => $hidden && 'display: none;'}
`;

const horizontalLineStyles = css<{ $hidden?: boolean; $isMini?: boolean }>`
  height: 2px;

  ${({ $isMini }) => ($isMini ? 'width: 8px;' : 'flex: 1 0 auto;')}
  ${({ $hidden }) => $hidden && 'visibility: hidden;'}
`;

const StyledPhaseLine = styled.div<{
  $isMini?: boolean;
  $isVertical?: boolean;
  $hidden: boolean;
  $color: string;
}>`
  background: ${({ $color }) => $color};

  ${({ $isVertical }) =>
    $isVertical ? verticalLineStyles : horizontalLineStyles}
`;

const PHASE_CONFIG: {
  [key in PhaseType]: { icon: string; colorKey: string; textColorKey: string };
} = {
  done: {
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
    colorKey: 'graphColors.grey040',
    textColorKey: 'textColor.tertiary',
  },
};

function getIconFromType(
  type: PhaseType,
  phaseIdentifier: string,
  isContinuous: boolean = false
) {
  const isCurrent = type === 'current';
  const isCompleted = phaseIdentifier === 'completed';

  if (isContinuous) {
    if (isCurrent && isCompleted) {
      return 'caret-right';
    }
    if (isCompleted) {
      return 'angle-right';
    }
  }

  if (isCurrent && isCompleted) {
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
    return 'done';
  }

  if (activePhaseIndex === phaseIndex) {
    return 'current';
  }

  return 'todo';
}

function PhaseIndicator({
  phaseIdentifier,
  index,
  totalPhases,
  type,
  color,
  nextColor,
  layout,
  isContinuous = false,
}: PhaseIndicatorProps) {
  const isVertical = layout === 'vertical';
  const iconSize = layout === 'mini' ? '16px' : '20px';

  return (
    <StyledPhaseIndicatorContainer $isVertical={isVertical}>
      {layout === 'horizontal' && (
        <StyledPhaseLine $hidden={index === 0} $color={color} />
      )}
      <Icon
        name={getIconFromType(type, phaseIdentifier, isContinuous)}
        color={color}
        width={iconSize}
        height={iconSize}
      />
      <StyledPhaseLine
        $isMini={layout === 'mini'}
        $isVertical={isVertical}
        $hidden={index === totalPhases - 1}
        $color={nextColor ?? color}
      />
    </StyledPhaseIndicatorContainer>
  );
}

/**
 * Switch to the vertical layout on small screens.
 *
 * Because of the complexity of the timeline layout, manage the switch between
 * horizontal and vertical layouts for small devices with JS. Checks whether the
 * number of phases multiplied by a phase width is greater than the container width.
 *
 * Note: Styled Components v6 will support `@container` queries, which can replace this.
 */
function useOverrideLayout<T extends HTMLElement>(
  initialLayout: NonNullable<PhaseTimelineProps['layout']>,
  phaseCount: number,
  ref: RefObject<T>
) {
  const [isVerticalForced, setIsVerticalForced] = useState(false);

  // Not an exact science
  const ROUGH_PHASE_WIDTH = 100;

  useEffect(() => {
    // Ignore mini and initially vertical layouts
    if (initialLayout !== 'horizontal') {
      return;
    }

    const getParentWidth = () => ref.current?.parentElement?.offsetWidth ?? 0;

    const handleResize = () => {
      setIsVerticalForced(phaseCount * ROUGH_PHASE_WIDTH > getParentWidth());
    };

    const handleResizeDebounced = debounce(handleResize, 200);

    if (ref.current) {
      handleResize();
    }

    window.addEventListener('resize', handleResizeDebounced);

    return () => {
      window.removeEventListener('resize', handleResizeDebounced);
    };
  }, [phaseCount, initialLayout, ref]);

  return isVerticalForced ? 'vertical' : initialLayout;
}

export function PhaseTimeline({
  activePhase,
  layout = 'horizontal',
  isContinuous = false,
}: PhaseTimelineProps) {
  const ref = useRef<HTMLUListElement>(null);
  const plan = usePlan();
  console.log(plan, activePhase, layout, ref);
  const theme = useTheme();
  const phases = plan.actionImplementationPhases;
  const overriddenLayout = useOverrideLayout(layout, phases.length, ref);
  const isVertical = overriddenLayout === 'vertical';
  const isMini = overriddenLayout === 'mini';
  const activePhaseIndex = phases.findIndex(
    (phase) => phase.identifier === activePhase.identifier
  );

  return (
    <>
      <StyledContainer ref={ref} $isVertical={isVertical} $isMini={isMini}>
        {phases.map((phase, index) => {
          const phaseType = getPhaseType(index, activePhaseIndex);
          const nextPhaseType =
            index + 1 < phases.length
              ? getPhaseType(index + 1, activePhaseIndex)
              : undefined;
          const phaseName =
            isContinuous && phase.identifier === 'completed'
              ? 'Continuous'
              : phase.name;

          return (
            <StyledPhase key={phase.id} $isVertical={isVertical}>
              <PhaseIndicator
                isContinuous={isContinuous}
                phaseIdentifier={phase.identifier}
                layout={overriddenLayout}
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

              {layout !== 'mini' && (
                <StyledPhaseName
                  $isVertical={isVertical}
                  $type={phaseType}
                  $color={getColorFromType(phaseType, theme, 'textColorKey')}
                >
                  {phaseName}
                </StyledPhaseName>
              )}
            </StyledPhase>
          );
        })}
      </StyledContainer>

      {isMini && <StyledMiniPhaseName>{activePhase.name}</StyledMiniPhaseName>}
    </>
  );
}
