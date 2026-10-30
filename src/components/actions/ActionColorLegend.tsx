import { useMemo } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';
import { transparentize } from 'polished';

import { getStatusColorForAction, getThemeColor } from '@/common/ActionStatusSummary';
import {
  type ActionCardFragment,
  ActionStatusSummaryIdentifier,
} from '@/common/__generated__/graphql';
import { getReadableThemeTextColor } from '@/components/contentblocks/colorUtils';
import { type PlanContextType, usePlan } from '@/context/plan';

type LegendAlign = 'center' | 'start';

const Legend = styled.div<{ $align: LegendAlign; $textColor: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $align }) => $align};
  align-items: center;
  gap: ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s150}`};
  margin: 0 0 ${({ theme }) => theme.spaces.s200};
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ $textColor }) => $textColor};
`;

const LegendHeading = styled.span`
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

const LegendList = styled.ul<{ $align: LegendAlign }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $align }) => $align};
  gap: inherit;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spaces.s050};
`;

const Swatches = styled.span`
  display: flex;
  gap: 2px;
`;

const Swatch = styled.span<{ $color: string; $borderColor: string }>`
  flex-shrink: 0;
  width: 1.5em;
  height: 0.75em;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
`;

type LegendPhase = PlanContextType['actionImplementationPhases'][number];

// The fields the legend reads, so any action list query can feed it
type LegendAction = Pick<
  ActionCardFragment,
  'color' | 'scheduleContinuous' | 'status' | 'statusSummary' | 'implementationPhase'
> & {
  // Present for related plan actions, whose phases differ from the host plan's
  plan?: { id: string; actionImplementationPhases?: LegendPhase[] | null } | null;
};

type SourceKind = 'status' | 'phase' | 'continuous' | 'not-set';

type LegendEntry = {
  colors: string[];
  labels: string[];
  kinds: SourceKind[];
};

type ColorSource = {
  key: string;
  kind: SourceKind;
  label: string;
};

type LegendLabels = {
  continuous: string;
  notSet: string;
};

const NOT_SET_KEY = `summary:${ActionStatusSummaryIdentifier.Undefined}`;

/**
 * Work out which status, implementation phase or status summary gave the action
 * its card color. Mirrors the precedence of `Action.get_color` in the backend.
 */
function getColorSource(
  action: LegendAction,
  color: string,
  plan: PlanContextType,
  theme: Theme,
  labels: LegendLabels
): ColorSource | null {
  const { status, implementationPhase, statusSummary, scheduleContinuous } = action;

  if (scheduleContinuous && statusSummary?.identifier === ActionStatusSummaryIdentifier.Completed)
    return { key: 'continuous', kind: 'continuous', label: labels.continuous };

  if (status?.color && getThemeColor(status.color, theme) === color)
    return { key: `status:${status.id}`, kind: 'status', label: status.name };

  const phases = action.plan?.actionImplementationPhases ?? plan.actionImplementationPhases;
  const phase = phases.find((p) => p.id === implementationPhase?.id);
  if (phase?.color && getThemeColor(phase.color, theme) === color)
    return { key: `phase:${phase.id}`, kind: 'phase', label: phase.name };

  // The backend calls an action without a status "Unknown"; say that no status is set instead
  if (statusSummary?.identifier === ActionStatusSummaryIdentifier.Undefined)
    return { key: NOT_SET_KEY, kind: 'not-set', label: labels.notSet };

  const summary = plan.actionStatusSummaries.find(
    (s) => s.identifier === statusSummary?.identifier
  );
  if (summary)
    return { key: `summary:${summary.identifier}`, kind: 'status', label: summary.label };

  return null;
}

export function getActionColorLegend(
  actions: LegendAction[],
  plan: PlanContextType,
  theme: Theme,
  labels: LegendLabels
): LegendEntry[] {
  // Order entries the way the plan orders its statuses, phases and summaries
  const phaseIds = new Set([
    ...plan.actionImplementationPhases.map((p) => p.id),
    ...actions.flatMap((a) => a.plan?.actionImplementationPhases?.map((p) => p.id) ?? []),
  ]);
  const sourceOrder = [
    ...plan.actionStatuses.map((s) => `status:${s.id}`),
    ...Array.from(phaseIds, (id) => `phase:${id}`),
    ...plan.actionStatusSummaries.map((s) => `summary:${s.identifier}`),
    'continuous',
  ];
  const rank = (key: string) => {
    if (key === NOT_SET_KEY) return Infinity;
    const idx = sourceOrder.indexOf(key);
    return idx === -1 ? sourceOrder.length : idx;
  };

  // Related plans can use the same name for different colors, so collect each label's colors
  const byLabel = new Map<string, { colors: string[]; kinds: Set<SourceKind>; rank: number }>();
  for (const action of actions) {
    const color = getStatusColorForAction(action, theme);
    const source = getColorSource(action, color, plan, theme, labels);
    if (!source) continue;
    if (!byLabel.has(source.label))
      byLabel.set(source.label, { colors: [], kinds: new Set(), rank: Infinity });
    const entry = byLabel.get(source.label)!;
    if (!entry.colors.includes(color)) entry.colors.push(color);
    entry.kinds.add(source.kind);
    entry.rank = Math.min(entry.rank, rank(source.key));
  }

  // Labels with the same colors, such as two statuses sharing one, go under one set of swatches
  const byColors = new Map<string, LegendEntry>();
  const sorted = Array.from(byLabel.entries()).sort(([, a], [, b]) => a.rank - b.rank);
  for (const [label, { colors, kinds }] of sorted) {
    const key = [...colors].sort().join(' ');
    const entry = byColors.get(key);
    if (!entry) {
      byColors.set(key, { colors, labels: [label], kinds: Array.from(kinds) });
      continue;
    }
    entry.labels.push(label);
    entry.kinds = Array.from(new Set([...entry.kinds, ...kinds]));
  }
  return Array.from(byColors.values());
}

/**
 * Whether the colors stand for statuses, phases or both. Continuous and
 * not-set entries fit under either heading, so they don't count.
 */
export function getLegendHeadingKind(entries: LegendEntry[]): 'status' | 'phase' | 'both' {
  const kinds = new Set(entries.flatMap((entry) => entry.kinds));
  if (kinds.has('phase') && kinds.has('status')) return 'both';
  return kinds.has('phase') ? 'phase' : 'status';
}

const HEADING_KEYS = {
  status: 'status',
  phase: 'filter-phase',
  both: 'action-progress',
} as const;

type ActionColorLegendProps = {
  actions: LegendAction[];
  align?: LegendAlign;
  /** The surface the legend sits on, to keep its text readable. Defaults to the page background. */
  backgroundColor?: string;
  className?: string;
};

const ActionColorLegend = ({
  actions,
  align = 'center',
  backgroundColor,
  className,
}: ActionColorLegendProps) => {
  const t = useTranslations();
  const plan = usePlan();
  const theme = useTheme();

  const entries = useMemo(
    () =>
      getActionColorLegend(actions, plan, theme, {
        continuous: t('action-continuous'),
        notSet: t('no-status'),
      }),
    [actions, plan, theme, t]
  );

  if (!entries.length) return null;

  // "Progress" covers both, as on the action page where it heads the status and phase
  const heading = t(HEADING_KEYS[getLegendHeadingKind(entries)]);

  const textColor = getReadableThemeTextColor(
    backgroundColor ?? theme.themeColors.white,
    theme.textColor.primary,
    theme.themeColors.white
  );

  // Hidden from screen readers: each card already states its status as text,
  // so the legend only explains a visual code they don't meet
  return (
    <Legend $align={align} $textColor={textColor} className={className} aria-hidden="true">
      <LegendHeading>{heading}:</LegendHeading>
      <LegendList $align={align}>
        {entries.map(({ colors, labels }) => (
          <LegendItem key={labels.join('/')}>
            <Swatches>
              {colors.map((color) => (
                <Swatch key={color} $color={color} $borderColor={transparentize(0.5, textColor)} />
              ))}
            </Swatches>
            {labels.join(' / ')}
          </LegendItem>
        ))}
      </LegendList>
    </Legend>
  );
};

export default ActionColorLegend;
