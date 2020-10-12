import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanContext from 'context/plan';
import StatusDonut from 'components/graphs/StatusDonut';

const getProgressData = (actions) => {
  const plan = useContext(PlanContext);
  const progress = { values: [], labels: [], good: 0 };
  plan.actionStatuses.forEach((status) => {
    let statusCount = 0;
    actions.forEach((action) => {
      if (action.status.identifier === status.identifier) statusCount += 1;
    });
    if (statusCount > 0) {
      progress.values.push(statusCount);
      progress.labels.push(status.identifier);
    }

    if (
      status.identifier === 'not_started'
      || status.identifier === 'on_time'
      || status.identifier === 'completed') progress.good += statusCount;
  });

  return progress;
};

const ActionsStatusGraphs = (props) => {
  const { actions } = props;
  const progressData = getProgressData(actions);
  return (
    <div>
      <StatusDonut
        data={{ values: progressData.values, labels: progressData.labels }}
        currentValue={progressData.good}
      />
    </div>
  );
};

ActionsStatusGraphs.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ActionsStatusGraphs;
