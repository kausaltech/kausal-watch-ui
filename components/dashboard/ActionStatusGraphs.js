import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'common/dayjs';
import { getStatusColor, cleanActionStatus } from 'common/preprocess';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import { useTranslation } from 'common/i18n';
import StatusDonut from 'components/graphs/StatusDonut';

const getTimelinessData = (actions, actionStatuses, theme, t) => {
  const timeliness = {
    values: [],
    labels: [],
    good: 0,
    total: 0,
    colors: [],
  };

  const now = dayjs();
  let under30 = 0;
  let under60 = 0;
  let over60 = 0;
  let notActive = 0;
  let total = 0;
  let good = 0;

  actions.forEach((action) => {
    const actionUpdated = dayjs(action.updatedAt);
    const age = now.diff(actionUpdated, 'day');
    const actionStatus = cleanActionStatus(action, actionStatuses);
    total += 1;

    // Filter out merged, inactive and completed actions from timeliness calculation
    if (['postponed', 'cancelled', 'completed', 'merged'].includes(actionStatus.identifier)) {
      notActive += 1;
      total -= 1;
    } else if (age >= 60) over60 += 1;
    else if (age >= 30) {
      under60 += 1;
      good += 1;
    } else if (age < 30) {
      under30 += 1;
      good += 1;
    }
  });

  timeliness.values.push(under30);
  timeliness.labels.push(t('under-x-days', { days: 30 }));
  timeliness.colors.push(theme.graphColors.green070);

  timeliness.values.push(under60);
  timeliness.labels.push(t('under-x-days', { days: 60 }));
  timeliness.colors.push(theme.graphColors.green030);

  timeliness.values.push(over60);
  timeliness.labels.push(t('over-x-days', { days: 60 }));
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

const getStatusData = (actions, actionStatuses, theme) => {
  const progress = {
    values: [],
    labels: [],
    good: 0,
    total: 0,
    colors: [],
  };
  const ORDER_STATUSES = [
    'completed',
    'on_time',
    'in_progress',
    'not_started',
    'late',
    'cancelled',
    'merged',
    'postponed',
    'undefined',
  ];

  let totalCount = 0;

  ORDER_STATUSES.forEach((statusIdentifier) => {
    let statusCount = 0;
    let statusName = '';
    actions.forEach((action) => {
      const actionStatus = cleanActionStatus(action, actionStatuses);
      if (actionStatus.identifier === statusIdentifier) {
        statusCount += 1;
        totalCount += 1;
        statusName = actionStatus.name;
      }
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(statusName);
      progress.colors.push(getStatusColor(statusIdentifier, theme));
      if (['completed', 'on_time', 'in_progress'].includes(statusIdentifier)) progress.good += statusCount;
    }
  });

  progress.total = `${Math.round((progress.good / totalCount) * 100)}%`;
  return progress;
};

const getPhaseData = (actions, phases, actionStatuses, theme, t) => {
  const phaseData = {
    labels: [],
    values: [],
    colors: [],
    total: 0,
  };

  const phaseColors = [
    theme.graphColors.green010,
    theme.graphColors.green030,
    theme.graphColors.green050,
    theme.graphColors.green070,
    theme.graphColors.green090,
    theme.graphColors.grey010,
  ];

  // Process actions and ignore set phase if action's status trumps it
  const phasedActions = actions.map((action) => {
    const actionStatus = cleanActionStatus(action, actionStatuses);
    const realphase = {
      id: action.implementationPhase?.id,
      identifier: action.implementationPhase?.identifier,
      name: action.implementationPhase?.name,
    };

    if (['cancelled', 'merged', 'postponed', 'completed'].includes(actionStatus.identifier)) {
      realphase.id = actionStatus.id;
      realphase.identifier = actionStatus.identifier;
      realphase.name = `No phase (${actionStatus.name})`;
    }

    if (actionStatus.identifier === 'completed') {
      realphase.name = actionStatus.name;
    }

    return { phase: realphase };
  });

  phases.forEach((phase, index) => {
    const actionCountOnPhase = phasedActions.filter((action) => action.phase.identifier === phase.identifier);

    phaseData.labels.push(phase.name);
    phaseData.values.push(actionCountOnPhase.length);
    phaseData.colors.push(phaseColors[index]);
    phaseData.total += actionCountOnPhase.length;
  });

  phaseData.labels.push(t('unknown'));
  phaseData.values.push(actions.length - phaseData.total);
  phaseData.colors.push(theme.graphColors.grey010);

  return phaseData;
};

const ActionsStatusGraphs = (props) => {
  const { actions } = props;
  const theme = useTheme();
  const plan = useContext(PlanContext);
  const { t } = useTranslation(['common']);

  const progressData = getStatusData(actions, plan.actionStatuses, theme);
  const timelinessData = getTimelinessData(actions, plan.actionStatuses, theme, t);
  let phaseData;
  if (plan.actionImplementationPhases.length > 0) {
    phaseData = getPhaseData(actions, plan.actionImplementationPhases, plan.actionStatuses, theme, t);
  }

  return (
    <div>
      { phaseData && (
        <StatusDonut
          data={{ values: phaseData.values, labels: phaseData.labels }}
          currentValue={phaseData.total}
          colors={phaseData.colors.length > 0 && phaseData.colors}
          header="Toimenpiteiden vaiheet"
        />
      )}
      <StatusDonut
        data={{ values: progressData.values, labels: progressData.labels }}
        currentValue={progressData.total}
        colors={progressData.colors.length > 0 && progressData.colors}
        header="Toimenpiteiden tila"
      />
      <StatusDonut
        data={{ values: timelinessData.values, labels: timelinessData.labels }}
        currentValue={timelinessData.total}
        colors={timelinessData.colors.length > 0 && timelinessData.colors}
        header="Aktiivisten toimenpiteiden päivitys"
      />
    </div>
  );
};

ActionsStatusGraphs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusGraphs;
