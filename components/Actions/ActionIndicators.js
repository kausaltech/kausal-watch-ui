import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Alert, Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { Link } from '../../routes';

import IndicatorGraph from '../Graphs/IndicatorGraph';

import Icon from '../Common/Icon';

function ActionIndicator(props) {
  const { relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const actions = indicator.actions.filter(action => action.id !== actionId);

  return (
    <Card className="mb-3">
      {(indicator.latestGraph && indicator.latestGraph.data)
        ? <IndicatorGraph graphId={indicator.latestGraph.id} />
        : (
          <CardBody>
            <CardTitle>
              <h5>{indicator.name}</h5>
            </CardTitle>
          </CardBody>
        )
      }
      <CardFooter>
        {actions.length > 0 && (
          <span>
            Liittyy myös toimenpiteisiin:
            {' '}
            {actions.map(action => (
              <Link key={action.identifier} route={`/action/${action.identifier}`}>
                <a><Badge>{action.identifier}</Badge></a>
              </Link>
            ))}
            {' | '}
          </span>
        )}
        <Link route={`/indicator/${indicator.id}`}>
          <a>
            Mittarin tarkemmat tiedot
            <Icon name="arrowRight" color="" />
          </a>
        </Link>
      </CardFooter>
    </Card>
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
