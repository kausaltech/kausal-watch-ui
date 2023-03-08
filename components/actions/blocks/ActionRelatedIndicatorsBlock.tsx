import React, { useContext } from 'react';
import {
  Row, Col,
  Badge as BaseBadge,
  Card as BaseCard,
  CardBody,
  CardFooter,
} from 'reactstrap';
import styled from 'styled-components';
import { readableColor, shade } from 'polished';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import { ActionLink, IndicatorLink } from 'common/links';
import Icon from 'components/common/Icon';
import PlanContext from 'context/plan';
import { useTranslation } from 'common/i18n';
import { SectionHeader } from 'components/actions/ActionContent';

const IndicatorsSection = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s400};
`;

const Card = styled(BaseCard)`
  border-radius: ${(props) => props.theme.cardBorderRadius};

  h3 {
    font-size: ${(props) => props.theme.fontSizeMd};
  }
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
        <IndicatorLink id={indicator.id}>
          <a>
            <h3>
              {indicator.name}
              <Icon name="arrowRight" color="" />
            </h3>
          </a>
        </IndicatorLink>
        {(indicator.latestGraph || indicator.latestValue)
          ? <IndicatorVisualisation indicatorId={indicator.id} />
          : null}
      </CardBody>
      {actions.length > 0 && (
        <CardFooter>
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
            </span>
        </CardFooter>
      )}
    </Card>
  );
}

const ActionRelatedIndicatorsBlock = (props) => {
  const { indicators, actionId } = props;
  const { t } = useTranslation();

  return (
    <div>
    <Row>
      <Col>
        <SectionHeader>{ t('indicators') }</SectionHeader>
      </Col>
    </Row>
    <Row>
      <Col sm="12">
        <IndicatorsSection>
          {indicators.map((relatedIndicator) => (
            <ActionIndicator
              t={t}
              key={relatedIndicator.indicator.id}
              actionId={actionId}
              relatedIndicator={relatedIndicator}
            />
          ))}
        </IndicatorsSection>
      </Col>
    </Row>
  </div>
  )
}

export default ActionRelatedIndicatorsBlock;
