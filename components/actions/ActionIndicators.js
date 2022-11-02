import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Badge as BaseBadge,
  Card as BaseCard,
  CardBody,
  CardFooter,
} from 'reactstrap';
import styled from 'styled-components';
import { readableColor, shade } from 'polished';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import { withTranslation } from '../../common/i18n';
import { ActionLink, IndicatorLink } from '../../common/links';
import Icon from '../common/Icon';
import PlanContext from '../../context/plan';

const IndicatorsSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const Card = styled(BaseCard)`
  border-radius: ${(props) => props.theme.cardBorderRadius};
`;

const Badge = styled(BaseBadge)`
  background-color: ${(props) => props.theme.brandLight};
  color: ${
    (props) => readableColor(props.theme.brandLight, props.theme.themeColors.black, props.theme.themeColors.white)
  };
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &:hover {
    background-color:  ${(props) => shade(0.01, props.theme.brandLight)} !important;
  }

`;

function ActionIndicator(props) {
  const { t, relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const plan = useContext(PlanContext);
  const actions = indicator.actions.filter((action) => action.id !== actionId);

  return (
    <Card className="mb-4">
      <CardBody>
        {(indicator.latestGraph || indicator.latestValue)
          ? <IndicatorVisualisation indicatorId={indicator.id} />
          : <h3 className="mb-0">{indicator.name}</h3>}
      </CardBody>
      <CardFooter>
        {actions.length > 0 && (
          <span>
            {t('indicator-also-for-actions')}
            :
            {' '}
            {actions.map((action) => (
              <ActionLink key={action.identifier} action={action}>
                <a className="me-2">
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
      {relatedIndicators.map((relatedIndicator) => (
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
