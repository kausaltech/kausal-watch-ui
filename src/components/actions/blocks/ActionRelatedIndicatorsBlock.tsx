import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { readableColor, shade } from 'polished';
import { Badge as BaseBadge, Card as BaseCard, CardBody, CardFooter, Col, Row } from 'reactstrap';

import type { GetActionDetailsQuery } from '@/common/__generated__/graphql';
import { ActionLink, IndicatorLink } from '@/common/links';
import { SectionHeader } from '@/components/actions/ActionContent';
import Icon from '@/components/common/Icon';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';
import { usePlan } from '@/context/plan';

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
  color: ${(props) =>
    readableColor(
      props.theme.brandLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
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
    background-color: ${(props) => shade(0.01, props.theme.brandLight)} !important;
  }
`;

const IndicatorActionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  &[title]::before {
    content: attr(title);
    display: inline-block;
    margin-right: ${(props) => props.theme.spaces.s100};
    font-size: ${(props) => props.theme.fontSizeSm};
  }
`;

const IndicatorActionListItem = styled.li`
  display: inline-block;
`;

type RelatedIndicator = NonNullable<GetActionDetailsQuery['action']>['relatedIndicators'][number];

type ActionIndicatorProps = {
  relatedIndicator: RelatedIndicator;
  actionId: string;
};

function ActionIndicator(props: ActionIndicatorProps) {
  const t = useTranslations();
  const { relatedIndicator, actionId } = props;
  const { indicator } = relatedIndicator;
  const plan = usePlan();
  const actions = indicator.actions.filter((action) => action.id !== actionId);

  return (
    <Card className="mb-4">
      <CardBody>
        <IndicatorLink id={indicator.id}>
          <h3>
            {indicator.name}
            <Icon.ArrowRight color="" />
          </h3>
        </IndicatorLink>
        {indicator.latestGraph || indicator.latestValue ? (
          <IndicatorVisualisation indicatorId={indicator.id} />
        ) : null}
      </CardBody>
      {actions.length > 0 && (
        <CardFooter>
          <IndicatorActionsList title={t('indicator-also-for-actions')}>
            {actions.map((action) => (
              <IndicatorActionListItem key={action.identifier}>
                <ActionLink action={action} className="me-2">
                  <Badge>
                    {!plan.hideActionIdentifiers && `${action.identifier}. `}
                    {action.name}
                  </Badge>
                </ActionLink>
              </IndicatorActionListItem>
            ))}
          </IndicatorActionsList>
        </CardFooter>
      )}
    </Card>
  );
}

// FIXME: Type properly
type ActionRelatedIndicatorsBlockProps = {
  indicators: RelatedIndicator[];
  actionId: string;
};

const ActionRelatedIndicatorsBlock = (props: ActionRelatedIndicatorsBlockProps) => {
  const { indicators, actionId } = props;
  const t = useTranslations();

  // FIXME: Assume indicator not connected to any plan are "draft" until we have API solution for this
  const filteredIndicators = indicators.filter(
    (relatedIndicator) => relatedIndicator.indicator.plans.length > 0
  );

  if (filteredIndicators.length === 0) {
    return null;
  }

  return (
    <div>
      <Row>
        <Col>
          <SectionHeader>{t('indicators')}</SectionHeader>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <IndicatorsSection>
            {filteredIndicators.map((relatedIndicator) => (
              <ActionIndicator
                key={relatedIndicator.indicator.id}
                actionId={actionId}
                relatedIndicator={relatedIndicator}
              />
            ))}
          </IndicatorsSection>
        </Col>
      </Row>
    </div>
  );
};

export default ActionRelatedIndicatorsBlock;
