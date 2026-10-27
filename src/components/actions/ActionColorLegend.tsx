import { useId, useMemo } from 'react';

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
import { type PlanContextType, usePlan } from '@/context/plan';

type LegendAlign = 'center' | 'start';

const Legend = styled.div<{ $align: LegendAlign }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ $align }) => $align};
  align-items: center;
  gap: ${({ theme }) => `${theme.spaces.s050} ${theme.spaces.s150}`};
  margin: 0 0 ${({ theme }) => theme.spaces.s200};
  font-size: ${({ theme }) => theme.fontSizeSm};
  color: ${({ theme }) => theme.textColor.secondary};
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

const Swatch = styled.span<{ $color: string }>`
  flex-shrink: 0;
  width: 1.5em;
  height: 0.75em;
  background-color: ${({ $color }) => $color};
  border: 1px solid ${({ theme }) => transparentize(0.8, theme.themeColors.dark)};
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
`;

// The fields the legend reads, so any action list query can feed it
type LegendAction = Pick<
  ActionCardFragment,
  'color' | 'scheduleContinuous' | 'status' | 'statusSummary' | 'implementationPhase'
>;

type SourceKind = 'status' | 'phase' | 'continuous' | 'not-set';

type LegendEntry = {
  color: string;
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

  const phase = plan.actionImplementationPhases.find((p) => p.id === implementationPhase?.id);
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
  const sourceOrder = [
    ...plan.actionStatuses.map((s) => `status:${s.id}`),
    ...plan.actionImplementationPhases.map((p) => `phase:${p.id}`),
    ...plan.actionStatusSummaries.map((s) => `summary:${s.identifier}`),
    'continuous',
  ];
  const rank = (key: string) => {
    if (key === NOT_SET_KEY) return Infinity;
    const idx = sourceOrder.indexOf(key);
    return idx === -1 ? sourceOrder.length : idx;
  };

  // Several sources can share a color, so collect their labels under one swatch
  const byColor = new Map<string, Map<string, ColorSource>>();
  for (const action of actions) {
    const color = getStatusColorForAction(action, theme);
    const source = getColorSource(action, color, plan, theme, labels);
    if (!source) continue;
    if (!byColor.has(color)) byColor.set(color, new Map());
    byColor.get(color)!.set(source.key, source);
  }

  return Array.from(byColor.entries())
    .map(([color, sources]) => {
      const sorted = Array.from(sources.values()).sort((a, b) => rank(a.key) - rank(b.key));
      return {
        color,
        rank: Math.min(...sorted.map((source) => rank(source.key))),
        labels: Array.from(new Set(sorted.map((source) => source.label))),
        kinds: Array.from(new Set(sorted.map((source) => source.kind))),
      };
    })
    .sort((a, b) => a.rank - b.rank)
    .map(({ color, labels, kinds }) => ({ color, labels, kinds }));
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
  className?: string;
};

const ActionColorLegend = ({ actions, align = 'center', className }: ActionColorLegendProps) => {
  const t = useTranslations();
  const plan = usePlan();
  const theme = useTheme();
  const headingId = useId();

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

  return (
    <Legend $align={align} className={className}>
      <LegendHeading id={headingId}>{heading}:</LegendHeading>
      <LegendList $align={align} aria-labelledby={headingId}>
        {entries.map(({ color, labels }) => (
          <LegendItem key={color}>
            <Swatch $color={color} aria-hidden="true" />
            {labels.join(' / ')}
          </LegendItem>
        ))}
      </LegendList>
    </Legend>
  );
};

export default ActionColorLegend;
