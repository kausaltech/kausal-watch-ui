import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Alert } from 'reactstrap';
import IndicatorGraph from '../Graphs/IndicatorGraph';

import Icon from '../Common/Icon';

function ActionIndicator(props) {
  const { relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const actions = indicator.actions.filter(action => action.id !== actionId);

  return (
    <div>
      {(indicator.latestGraph && indicator.latestGraph.data)
        ? <IndicatorGraph graphId={indicator.latestGraph.id} />
        : (
          <div>
            <h4>
              {indicator.name}
            </h4>
            <Badge color="light">ei graafia</Badge>
          </div>
        )
      }
      <Alert className="mt-3 mb-5">
        {actions.length > 0 && (
          <span>
            Tämä mittari liittyy myös toimenpiteisiin:
            {' '}
            {actions.map(action => (
              <Badge>{action.identifier}</Badge>
            ))}
            {' | '}
          </span>
        )}
        <a href={`/indicator/${indicator.id}`}>
          <strong>
            Katso mittarin tarkemmat tiedot
            <Icon name="arrowRight" color="" />
          </strong>
        </a>
      </Alert>
    </div>
  );
}

function ActionIndicators(props) {
  const { actionId, relatedIndicators } = props;
  return (
    <div>
      {relatedIndicators.map(relatedIndicator => (
        <ActionIndicator key={relatedIndicator.indicator.id} actionId={actionId} relatedIndicator={relatedIndicator} />
      ))}
    </div>
  );
}

ActionIndicators.propTypes = {
  actionId: PropTypes.string.isRequired,
  relatedIndicators: PropTypes.array.isRequired,
};

export default ActionIndicators;
