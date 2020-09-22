import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Badge as BaseBadge,
  Card as BaseCard,
  CardBody,
  CardFooter,
} from 'reactstrap';
import styled from 'styled-components';

import { withTranslation } from '../../common/i18n';
import { ActionLink, IndicatorLink } from '../../common/links';
import IndicatorGraph from '../graphs/IndicatorGraph';
import Icon from '../common/Icon';
import PlanContext from '../../context/plan';

const IndicatorsSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const Card = styled(BaseCard)`
  border-radius: ${(props) => props.theme.cardBorderRadius};
`;

const Badge = styled(BaseBadge)`
  border-radius: ${(props) => props.theme.btnBorderRadius};
  color: ${(props) => props.theme.themeColors.white};
  background-color: ${(props) => props.theme.brandDark};
`;

function ActionIndicator(props) {
  const { t, relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const plan = useContext(PlanContext);
  const actions = indicator.actions.filter(action => action.id !== actionId);

  return (
    <Card className="mb-4">
      <CardBody>
        {(indicator.latestGraph || indicator.latestValue)
          ? <IndicatorGraph indicatorId={indicator.id} />
          : <h3 className="mb-0">{indicator.name}</h3>}
      </CardBody>
      <CardFooter>
        {actions.length > 0 && (
          <span>
            {t('indicator-also-for-actions')}
            :
            {' '}
            {actions.map(action => (
              <ActionLink key={action.identifier} action={action}>
                <a className="mr-2" href>
                  <Badge>{action.identifier}</Badge>
                </a>
              </ActionLink>
            ))}
            {' | '}
          </span>
        )}
        <IndicatorLink id={indicator.id}>
          <a>
            {t('indicator-more-information')}
            <Icon name="arrowRight" color="" />
          </a>
        </IndicatorLink>
      </CardFooter>
    </Card>
  );
}

function ActionIndicators(props) {
  const { t, actionId, relatedIndicators } = props;
  return (
    <IndicatorsSection>
      {relatedIndicators.map(relatedIndicator => (
        <ActionIndicator
          t={t}
          key={relatedIndicator.indicator.id}
          actionId={actionId}
          relatedIndicator={relatedIndicator}
        />
      ))}
    </IndicatorsSection>
  );
}

ActionIndicators.propTypes = {
  actionId: PropTypes.string.isRequired,
  relatedIndicators: PropTypes.array.isRequired,
};

export default withTranslation('common')(ActionIndicators);
