import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Badge as BaseBadge,
  Card as BaseCard,
  CardBody,
  CardFooter,
} from 'reactstrap';
import styled from 'styled-components';

import { ActionLink, IndicatorLink } from '../../common/links';
import IndicatorGraph from '../graphs/IndicatorGraph';
import Icon from '../common/Icon';
import PlanContext from '../../context/plan';

const Card = styled(BaseCard)`
  border-radius: ${(props) => props.theme.cardBorderRadius};
`;

const Badge = styled(BaseBadge)`
  border-radius: ${(props) => props.theme.btnBorderRadius};
  color: ${(props) => props.theme.themeColors.white};
  background-color: ${(props) => props.theme.brandDark};
`;

function ActionIndicator(props) {
  const { relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const plan = useContext(PlanContext);
  const actions = indicator.actions.filter(action => action.id !== actionId);

  return (
    <Card className="mb-4">
      <CardBody>
        {(indicator.latestGraph || indicator.latestValue)
          ? <IndicatorGraph indicator={indicator} plan={plan} />
          : <h5 className="mb-0">{indicator.name}</h5>}
      </CardBody>
      <CardFooter>
        {actions.length > 0 && (
          <span>
            Liittyy myös toimenpiteisiin:
            {' '}
            {actions.map(action => (
              <ActionLink key={action.identifier} action={action}>
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
        <ActionIndicator
          key={relatedIndicator.indicator.id}
          actionId={actionId}
          relatedIndicator={relatedIndicator}
        />
      ))}
    </div>
  );
}

ActionIndicators.propTypes = {
  actionId: PropTypes.string.isRequired,
  relatedIndicators: PropTypes.array.isRequired,
};

export default ActionIndicators;
