import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import MQPointIcon from './MQPointIcon';

const MQPoints = (props) => {
  const {
    action,
    points,
  } = props;

  const actionHasPoint = (id) => action.monitoringQualityPoints
    && action.monitoringQualityPoints.find(obj => obj.id === id) !== undefined;

  const icons = points.map(mqPoint => {
    const completed = actionHasPoint(mqPoint.id);
    const desc = completed ? mqPoint.descriptionYes : mqPoint.descriptionNo;
    return (
      <MQPointIcon
        key={mqPoint.id}
        id={`mqpoint-icon-${uniqueId()}`}
        completed={completed}
        description={desc}
      />
    );
  });

  return (
    <span className="action-mqpoints">
      {icons}
    </span>
  );
};

MQPoints.propTypes = {
  action: PropTypes.object.isRequired,
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MQPoints;

