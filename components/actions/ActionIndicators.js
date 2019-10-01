import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Badge, Alert, Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { Link } from '../../routes';
import { ActionLink, IndicatorLink } from '../../common/links';

import IndicatorGraph from '../graphs/IndicatorGraph';

import Icon from '../common/Icon';
import PlanContext from '../../context/plan';


function ActionIndicator(props) {
  const { relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const plan = useContext(PlanContext);
  const actions = indicator.actions.filter(action => action.id !== actionId);

  return (
    <Card className="mb-3">
      {(indicator.latestGraph || indicator.latestValue)
        ? <IndicatorGraph indicator={indicator} plan={plan} />
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
              <ActionLink key={action.identifier} id={action.identifier}>
                <a><Badge>{action.identifier}</Badge></a>
              </ActionLink>
            ))}
            {' | '}
          </span>
        )}
        <IndicatorLink id={indicator.id}>
          <a>
            Mittarin tarkemmat tiedot
            <Icon name="arrowRight" color="" />
          </a>
        </IndicatorLink>
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
