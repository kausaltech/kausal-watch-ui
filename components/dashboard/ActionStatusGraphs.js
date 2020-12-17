import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'common/moment';
import { useTheme } from 'common/theme';
import PlanContext from 'context/plan';
import { useTranslation } from 'common/i18n';
import StatusDonut from 'components/graphs/StatusDonut';

const getTimelinessData = (actions, colors) => {
  const timeliness = {
    values: [],
    labels: [],
    good: 0,
    total: 0,
    colors: [],
  };

  const now = moment();
  let under30 = 0;
  let under60 = 0;
  let over60 = 0;
  let merged = 0;
  let total = 0;
  let good = 0;

  actions.forEach((action) => {
    const actionUpdated = moment(action.updatedAt);
    const age = moment.duration(now.diff(actionUpdated));
    total += 1;

    if (action.mergedWith) {
      merged += 1;
      total -= 1;
    } else if (age.as('hours') >= 24 * 60) over60 += 1;
    else if (age.as('hours') >= 24 * 30) {
      under60 += 1;
      good += 1;
    } else if (age.as('hours') < 24 * 30) {
      under30 += 1;
      good += 1;
    }
  });

  timeliness.values.push(under30);
  timeliness.labels.push('Under 30 days');
  timeliness.colors.push(colors.GOOD_COLORS[0]);
  timeliness.values.push(under60);
  timeliness.labels.push('Under 60 days');
  timeliness.colors.push(colors.GOOD_COLORS[1]);
  timeliness.values.push(over60);
  timeliness.labels.push('Over 60 days');
  timeliness.colors.push(colors.BAD_COLORS[0]);
  timeliness.values.push(merged);
  timeliness.labels.push('Merged');
  timeliness.colors.push(colors.NEUTRAL_COLORS[0]);

  timeliness.total = `${Math.round((good / total) * 100)}%`;

  return timeliness;
};

const getProgressData = (actions, colors) => {
  const { t } = useTranslation();
  const progress = {
    values: [],
    labels: [],
    good: 0,
    total: 0,
    colors: [],
  };
  const ORDER_GOOD = [
    'completed',
    'on_time',
    'in_progress',
    'not_started',
  ];
  const ORDER_NEUTRAL = [
    'merged',
    'postponed',
    'cancelled',
    undefined,
  ];
  const ORDER_BAD = [
    'late',
    'severely_late',
  ];

  let mergedCount = 0;
  let totalCount = 0;

  ORDER_GOOD.forEach((status, index) => {
    let statusCount = 0;
    let statusName = '';
    actions.forEach((action) => {
      if (action.status?.identifier === status) {
        if (action.mergedWith) mergedCount += 1;
        else {
          statusCount += 1;
          totalCount += 1;
          statusName = action.status.name;
        }
      }
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(statusName);
      progress.colors.push(colors.GOOD_COLORS[index]);
    }
    progress.good += statusCount;
  });

  ORDER_BAD.forEach((status, index) => {
    let statusCount = 0;
    let statusName = '';
    actions.forEach((action) => {
      if (action.status?.identifier === status) {
        if (action.mergedWith) mergedCount += 1;
        else {
          statusCount += 1;
          totalCount += 1;
          statusName = action.status.name;
        }
      }
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(statusName);
      progress.colors.push(colors.BAD_COLORS[index]);
    }
  });

  ORDER_NEUTRAL.forEach((status, index) => {
    let statusCount = 0;
    let statusName = '';
    actions.forEach((action) => {
      if (action.status?.identifier === status) {
        if (action.mergedWith) mergedCount += 1;
        else {
          statusCount += 1;
          totalCount += 1;
          statusName = action.status.name;
        }
      }
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(statusName);
      progress.colors.push(colors.NEUTRAL_COLORS[index]);
    }
  });

  if (mergedCount > 0) {
    progress.values.push(mergedCount);
    progress.labels.push(t('merged'));
    progress.colors.push(colors.NEUTRAL_COLORS[0]);
  }

  progress.total = `${Math.round((progress.good / totalCount) * 100)}%`;
  return progress;
};

const getPhaseData = (actions, phases, colors) => {
  const theme = useTheme();
  const phaseData = {
    labels: [],
    values: [],
    colors: [],
    total: 0,
  };

  const phaseColors = [
    theme.graphColors.grey050,
    theme.graphColors.green010,
    theme.graphColors.green050,
    theme.graphColors.green070,
    theme.graphColors.green090,
    theme.graphColors.grey010,
  ];

  phases.forEach((phase, index) => {
    const actionCountOnPhase = actions.filter((action) => action.implementationPhase?.id === phase.id);

    phaseData.labels.push(phase.name);
    phaseData.values.push(actionCountOnPhase.length);
    phaseData.colors.push(phaseColors[index]);
    phaseData.total += actionCountOnPhase.length;
  });

  phaseData.labels.push('No Phase');
  phaseData.values.push(actions.length - phaseData.total);
  phaseData.colors.push('#ffffff');

  return phaseData;
};

const ActionsStatusGraphs = (props) => {
  const { actions } = props;
  const theme = useTheme();
  const plan = useContext(PlanContext);

  const pieColors = {};
  pieColors.GOOD_COLORS = [
    theme.graphColors.green070,
    theme.graphColors.green050,
    theme.graphColors.green030,
    theme.graphColors.green010,
    theme.graphColors.blue070,
    theme.graphColors.blue050,
    theme.graphColors.blue030,
    theme.graphColors.blue010,
  ];

  pieColors.NEUTRAL_COLORS = [
    theme.themeColors.white,
    theme.graphColors.grey030,
    theme.graphColors.grey050,
  ];

  pieColors.BAD_COLORS = [
    theme.graphColors.yellow030,
    theme.graphColors.yellow070,
  ];

  const progressData = getProgressData(actions, pieColors);
  const timelinessData = (getTimelinessData(actions, pieColors));
  let phaseData;
  if (plan.actionImplementationPhases.length > 0) {
    phaseData = getPhaseData(actions, plan.actionImplementationPhases, pieColors);
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
        header="Toimenpiteiden päivitys"
      />
    </div>
  );
};

ActionsStatusGraphs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusGraphs;
