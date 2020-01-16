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

  const sortedPoints = points.map((mqPoint) => {
    const out = { ...mqPoint };
    out.hasPoint = actionHasPoint(mqPoint.id);
    return out;
  });
  sortedPoints.sort((a, b) => {
    const hasDiff = b.hasPoint - a.hasPoint;
    if (hasDiff) return hasDiff;
    return a.order - b.order;
  });

  const icons = sortedPoints.map(mqPoint => {
    const desc = mqPoint.hasPoint ? mqPoint.descriptionYes : mqPoint.descriptionNo;
    return (
      <MQPointIcon
        key={mqPoint.id}
        id={`mqpoint-icon-${uniqueId()}`}
        completed={mqPoint.hasPoint}
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
