import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';
import dayjs from 'common/dayjs';
import { cleanActionStatus, getPhaseData, getStatusData } from 'common/preprocess';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import { useTranslation } from 'common/i18n';
import StatusDonut from 'components/graphs/StatusDonut';

import type { TFunction } from 'next-i18next';
import type { PlanContextFragment } from 'common/__generated__/graphql';
import type { Theme } from '@kausal/themes/types'
import type { ActionListAction } from './ActionList';

type ActionStatus = PlanContextFragment['actionStatuses'][0];

const StatusGraphs = styled.div`
  width: auto;
  display: flex;
  overflow-x: scroll;
  margin-bottom: ${(props) => props.theme.spaces.s300};
  background-image: ${(props) => `linear-gradient(to right, ${props.theme.themeColors.white}, ${props.theme.themeColors.white}),
    linear-gradient(to right, ${props.theme.themeColors.white}, ${props.theme.themeColors.white}),
    linear-gradient(to right, rgba(0, 0, 0, 0.25), ${transparentize(0, props.theme.themeColors.white)}),
    linear-gradient(to left, rgba(0, 0, 0, 0.25), ${transparentize(0, props.theme.themeColors.white)})`};
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.themeColors.white};
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    background-image: none;
  }
`;

interface TimelinessInterval {
  values: number[],
  labels: string[],
  good: number,
  total: string | undefined,
  colors: string[]
}

const getTimelinessData = (
  actions: ActionListAction[],
  actionStatuses: ActionStatus[],
  targetInterval: number,
  acceptableInterval: number,
  theme: Theme,
  t: TFunction,
) => {

  const timeliness: TimelinessInterval = {
    values: [],
    labels: [],
    good: 0,
    total: undefined,
    colors: [],
  };

  const now = dayjs();
  let withinTargetInterval = 0;
  let withinAcceptableInterval = 0;
  let outsideAcceptableInterval = 0;
  let total = 0;
  let good = 0;

  actions.forEach((action) => {
    const actionUpdated = dayjs(action.updatedAt);
    const age = now.diff(actionUpdated, 'day');
    const actionStatus = cleanActionStatus(action, actionStatuses);
    total += 1;

    // Filter out merged, inactive and completed actions from timeliness calculation
    if (['postponed', 'cancelled', 'completed', 'merged'].includes(actionStatus.identifier)) {
      total -= 1;
    } else {
      if (age >= acceptableInterval) {
        outsideAcceptableInterval += 1;
      } else if (age >= targetInterval) {
        withinAcceptableInterval += 1;
        good += 1;
      } else {
        withinTargetInterval += 1;
        good += 1;
      }
    }
  });

  timeliness.values.push(withinTargetInterval);
  timeliness.labels.push(t('under-x-days', { days: targetInterval }));
  timeliness.colors.push(theme.graphColors.green070);

  timeliness.values.push(withinAcceptableInterval);
  timeliness.labels.push(t('under-x-days', { days: acceptableInterval }));
  timeliness.colors.push(theme.graphColors.green030);

  timeliness.values.push(outsideAcceptableInterval);
  timeliness.labels.push(t('over-x-days', { days: acceptableInterval }));
  timeliness.colors.push(theme.graphColors.yellow050);

  /*
   * Do not report on the timeliness of actions that are not
   * being monitored anymore.
   */
  /*
  timeliness.values.push(notActive);
  timeliness.labels.push(t('not-being-monitored'));
  timeliness.colors.push(theme.graphColors.grey030);
  */

  timeliness.total = `${Math.round((good / total) * 100)}%`;
  return timeliness;
};

const ActionsStatusGraphs = (props) => {
  const { actions } = props;
  const theme = useTheme();
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['common']);

  const progressData = getStatusData(actions, plan.actionStatuses, theme);
  progressData.labels = progressData.labels.map((label) => label || t('unknown'));
  const timelinessData = getTimelinessData(
    actions,
    plan.actionStatuses,
    plan.actionUpdateTargetInterval,
    plan.actionUpdateAcceptableInterval,
    theme,
    t
  );
  let phaseData;
  if (plan.actionImplementationPhases.length > 0) {
    phaseData = getPhaseData(actions, plan.actionImplementationPhases, plan.actionStatuses, theme, t);
  }

  return (
    <StatusGraphs>
      { phaseData && (
        <StatusDonut
          data={{ values: phaseData.values, labels: phaseData.labels }}
          currentValue={phaseData.total}
          colors={phaseData.colors.length > 0 ? phaseData.colors : []}
          header={t('actions-phases')}
          helpText={t('actions-phases-help')}
        />
      )}
      <StatusDonut
        data={{ values: progressData.values, labels: progressData.labels }}
        currentValue={progressData.total}
        colors={progressData.colors.length > 0 ? progressData.colors : []}
        header={t('actions-status')}
        helpText={t('actions-status-help')}
      />
      <StatusDonut
        data={{ values: timelinessData.values, labels: timelinessData.labels }}
        currentValue={timelinessData.total}
        colors={timelinessData.colors.length > 0 ? timelinessData.colors : []}
        header={t('actions-updated')}
        helpText={t('actions-updated-help', {
          interval: dayjs.duration({days: plan.actionUpdateAcceptableInterval}).humanize()
        })}
      />
    </StatusGraphs>
  );
};

ActionsStatusGraphs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusGraphs;
