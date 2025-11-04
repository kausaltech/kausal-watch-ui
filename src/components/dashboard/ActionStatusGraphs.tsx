import React from 'react';

import type { Theme } from '@kausal/themes/types';
import { useTranslations } from 'next-intl';
import { transparentize } from 'polished';
import styled, { useTheme } from 'styled-components';

import { getStatusSummary } from '@/common/ActionStatusSummary';
import type { ActionTimeliness, PlanContextFragment } from '@/common/__generated__/graphql';
import {
  ActionTimelinessIdentifier,
  Comparison,
  type GetActionListForGraphsQuery,
  Sentiment,
} from '@/common/__generated__/graphql';
import dayjs from '@/common/dayjs';
import type { TFunction } from '@/common/i18n';
import { getActionTermContext } from '@/common/i18n';
import { getPhaseData, getStatusData } from '@/common/preprocess';
import BarChart from '@/components/common/BarChart';
import StatusDonut from '@/components/graphs/StatusDonut';
import { usePlan } from '@/context/plan';

import type { ActionListAction } from './ActionList';

const StatusDonutsWrapper = styled.div`
  width: auto;
  margin: 0 auto;
  display: flex;
  overflow-x: auto;
  margin-bottom: ${(props) => props.theme.spaces.s300};
  background-image: ${(props) => `linear-gradient(to right, ${
    props.theme.themeColors.white
  }, ${props.theme.themeColors.white}),
    linear-gradient(to right, ${props.theme.themeColors.white}, ${props.theme.themeColors.white}),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), ${transparentize(
      0,
      props.theme.themeColors.white
    )}),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), ${transparentize(
      0,
      props.theme.themeColors.white
    )})`};
  background-position:
    left center,
    right center,
    left center,
    right center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.themeColors.white};
  background-size:
    20px 100%,
    20px 100%,
    10px 100%,
    10px 100%;
  background-attachment: local, local, scroll, scroll;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    background-image: none;
    justify-content: center;
  }
`;

export type Progress = {
  values: number[];
  labels: string[];
  colors: string[];
  texts?: string[];
  hoverTexts?: string[];
  good: number;
  total: string;
  ongoingAndCompleted?: number;
};

function getTimelinessLabel(days: number, comparison: Comparison, t: TFunction) {
  const relativeTime = dayjs().subtract(days, 'days').fromNow(true);

  if (comparison === Comparison.Gt) {
    return t('over-relative-time', { relativeTime });
  }

  if (comparison === Comparison.Lte) {
    return t('under-relative-time', { relativeTime });
  }

  return relativeTime;
}

const getTimelinessData = (
  actions: NonNullable<GetActionListForGraphsQuery['planActions']>,
  plan: PlanContextFragment,
  theme: Theme,
  t: TFunction
) => {
  const aggregates: Progress = {
    values: [],
    labels: [],
    good: 0,
    total: '0%',
    colors: [],
  };

  let total = 0;
  let good = 0;

  const { actionTimelinessClasses } = plan;

  const counts = new Map<ActionTimelinessIdentifier | undefined, number>(
    actionTimelinessClasses.map((c) => [c.identifier, 0])
  );
  const classes = new Map<ActionTimelinessIdentifier | undefined, ActionTimeliness>(
    actionTimelinessClasses.map((c) => [c.identifier, c])
  );

  const activeActions = actions.filter(
    (action) => getStatusSummary(plan, action.statusSummary).isActive
  );
  if (activeActions.length === 0) {
    return aggregates;
  }

  activeActions.forEach(({ timeliness }) => {
    const count = counts.get(timeliness.identifier) ?? 0;
    counts.set(timeliness.identifier, count + 1);
    if (classes.get(timeliness.identifier)?.sentiment !== Sentiment.Negative) {
      good += 1;
    }
    total += 1;
  });
  const { Optimal, Acceptable, Late } = ActionTimelinessIdentifier;
  for (const identifier of [Optimal, Acceptable, Late]) {
    const timeliness = classes.get(identifier);
    if (timeliness == null) {
      continue;
    }
    aggregates.values.push(counts.get(identifier) ?? 0);
    aggregates.labels.push(getTimelinessLabel(timeliness.days, timeliness.comparison, t));
    aggregates.colors.push(theme.graphColors[timeliness.color]);
  }

  aggregates.total = `${Math.round((good / total) * 100)}%`;
  return aggregates;
};

interface DatasetConfig {
  phase?: boolean;
  progress?: boolean;
  timeliness?: boolean;
}

export enum ChartType {
  BAR = 'BAR',
  DONUT = 'DONUT',
}

const DEFAULT_DATASETS: DatasetConfig = {
  phase: true,
  progress: true,
  timeliness: true,
};

const DAYS_IN_MONTH = 30.437;

function getTimelinessHelpText(days: number, t: TFunction) {
  const plan = usePlan();

  if (days < 30) {
    return t('actions-updated-help-days', {
      count: days,
      ...getActionTermContext(plan),
    });
  }

  return t('actions-updated-help-months', {
    count: Math.round(days / DAYS_IN_MONTH),
    ...getActionTermContext(plan),
  });
}

export interface ActionsStatusGraphsProps {
  actions: NonNullable<GetActionListForGraphsQuery['planActions']>;
  chart?: ChartType;
  shownDatasets?: DatasetConfig;
}

const ActionsStatusGraphs = ({
  actions,
  chart = ChartType.DONUT,
  shownDatasets = DEFAULT_DATASETS,
}: ActionsStatusGraphsProps) => {
  const theme = useTheme();
  const plan = usePlan();
  const t = useTranslations();
  const showTotals = theme.settings.dashboard.showActionDonutTotals ?? true;

  const progressData =
    shownDatasets.progress &&
    getStatusData(actions, plan.actionStatusSummaries, theme, t('no-status'));

  const timelinessData = shownDatasets.timeliness && getTimelinessData(actions, plan, theme, t);

  const daysVisible = plan.actionTimelinessClasses.find(
    (c) => c.identifier === ActionTimelinessIdentifier.Acceptable
  )!.days;

  const phaseData =
    shownDatasets.phase && plan.actionImplementationPhases.length > 0
      ? getPhaseData(actions, plan, theme, t)
      : undefined;

  if (chart === ChartType.BAR) {
    return (
      <>
        {progressData && (
          <BarChart title={t('actions-status', getActionTermContext(plan))} data={progressData} />
        )}

        {phaseData && (
          <BarChart title={t('actions-phases', getActionTermContext(plan))} data={phaseData} />
        )}
      </>
    );
  }

  return (
    <StatusDonutsWrapper>
      {phaseData && (
        <StatusDonut
          data={{ values: phaseData.values, labels: phaseData.labels }}
          currentValue={
            showTotals ? `${phaseData.ongoingAndCompleted}/${phaseData.total}` : undefined
          }
          colors={phaseData.colors.length > 0 ? phaseData.colors : []}
          header={t('actions-phases', getActionTermContext(plan))}
          helpText={t('actions-phases-help', getActionTermContext(plan))}
        />
      )}

      {!plan.features.minimalStatuses && progressData && (
        <StatusDonut
          data={{
            values: progressData.values,
            labels: progressData.labels,
            texts: progressData.texts,
            hoverTexts: progressData.hoverTexts,
          }}
          currentValue={showTotals ? progressData.total : undefined}
          colors={progressData.colors.length > 0 ? progressData.colors : []}
          header={t('actions-status', getActionTermContext(plan))}
          helpText={t('actions-status-help', getActionTermContext(plan))}
        />
      )}

      {timelinessData && (
        <StatusDonut
          data={{
            values: timelinessData.values,
            labels: timelinessData.labels,
          }}
          currentValue={showTotals ? timelinessData.total : undefined}
          colors={timelinessData.colors.length > 0 ? timelinessData.colors : []}
          header={t('actions-updated', getActionTermContext(plan))}
          helpText={getTimelinessHelpText(daysVisible, t)}
        />
      )}
    </StatusDonutsWrapper>
  );
};

export default ActionsStatusGraphs;
