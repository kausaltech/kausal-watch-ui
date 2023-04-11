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

import { Sentiment, ActionTimeliness, ActionStatusSummary, ActionTimelinessIdentifier, Action } from 'common/__generated__/graphql';


const StatusGraphs = styled.div`
  width: auto;
  display: flex;
  overflow-x: auto;
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

const getTimelinessData = (actions: ActionWithStatusSummary[], timelinessClasses: ActionTimeliness[], theme) => {
  const aggregates: Progress = {
    values: [],
    labels: [],
    good: 0,
    total: '0%',
    colors: [],
  };

  let total = 0;
  let good = 0;

  const counts = new Map<ActionTimelinessIdentifier|undefined, number>(
    timelinessClasses.map(c => [c.identifier, 0])
  );
  const classes =  new Map<ActionTimelinessIdentifier|undefined, ActionTimeliness>(
    timelinessClasses.map(c => [c.identifier, c])
  );

  const activeActions = actions.filter(action => action.statusSummary.isActive);
  if (activeActions.length === 0) {
    return aggregates;
  }

  activeActions.forEach(({timeliness}) => {
    const count = counts.get(timeliness) ?? 0;
    counts.set(timeliness, count + 1);
    total += 1;
    if (classes.get(timeliness)?.sentiment !== Sentiment.Negative) good += 1;

  });
  for (const identifier of [ActionTimelinessIdentifier.Optimal,
                            ActionTimelinessIdentifier.Acceptable,
                            ActionTimelinessIdentifier.Late]) {
    const timeliness = classes.get(identifier);
    if (timeliness == null) {
      return;
    }
    aggregates.values.push(counts.get(identifier));
    aggregates.labels.push(timeliness.label);
    aggregates.colors.push(theme.graphColors[timeliness.color]);
  }

  aggregates.total = `${Math.round((good / total) * 100)}%`;
  return aggregates;
};

const ActionsStatusGraphs = (props) => {
  const { actions } = props;
  const theme = useTheme();
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['common']);

  const progressData = getStatusData(actions, plan.actionStatusSummaries, theme);
  progressData.labels = progressData.labels.map((label) => label || t('unknown'));
  const timelinessData = getTimelinessData(actions, plan.actionTimelinessClasses, theme);
  let phaseData;
  if (plan.actionImplementationPhases.length > 0) {
    phaseData = getPhaseData(actions, plan.actionImplementationPhases, theme, t);
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
        helpText={t('actions-updated-help')}
      />
    </StatusGraphs>
  );
};

ActionsStatusGraphs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusGraphs;
