'use client';

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

import { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { usePlan } from 'context/plan';
import { getActionTermContext } from 'common/i18n';
import RichText from 'components/common/RichText';
import CategoryTags from 'components/actions/CategoryTags';
import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import ActionsTable from 'components/actions/ActionsTable';
import CausalNavigation from 'components/indicators/CausalNavigation';
import IndicatorHero from './IndicatorHero';

const Section = styled.section`
  padding: ${(props) => props.theme.spaces.s300} 0;

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }
`;

const GraphContainer = styled.div`
  padding: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s200};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeBase};
    text-align: center;
  }
`;

type Props = {
  indicator: NonNullable<IndicatorDetailsQuery['indicator']>;
};

function IndicatorDetails({ indicator }: Props) {
  const plan = usePlan();
  const t = useTranslations();

  const hasImpacts =
    indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;
  const mainGoals = indicator.goals?.filter((goal) => !goal?.scenario) ?? [];

  const allOrgs = [];
  /* If indicator has a common indicator for another org in the plan add it in the orgs list */
  indicator.common?.indicators.forEach((common) => {
    /* Make sure organization is included in this plan or is the organization of the active indicator */
    const orgInThisPlan =
      plan.primaryOrgs.find((org) => org.id === common.organization.id) ||
      indicator.organization.id === common.organization.id;
    if (orgInThisPlan)
      allOrgs.push({
        id: common.id,
        identifier: common.identifier,
        image: common.organization.logo?.rendition?.src,
        name: common.organization.name,
        shortName: common.organization.abbreviation,
        active: common.organization.id === indicator.organization.id,
        orgUrl: `/indicators/${common.id}`,
      });
  });

  const uniqueTypes = Array.from(
    new Map(indicator.categories.map((c) => [c.type.id, c.type])).values()
  );
  return (
    <div className="mb-5">
      <IndicatorHero
        indicator={indicator}
        orgs={plan.features.hasActionPrimaryOrgs ? allOrgs : null}
        goals={mainGoals}
      />
      <Container>
        <Row>
          <Col md="7" lg="8" className="mb-5">
            <RichText html={indicator.description} />
          </Col>
          <Col md="5" lg="4" className="mb-5">
            <CategoryTags
              categories={indicator.categories}
              types={uniqueTypes}
              noLink={true}
            />
          </Col>
        </Row>
        {(indicator.latestGraph ||
          (indicator.values && indicator.values.length > 0)) && (
          <Row>
            <Col className="mb-5">
              <GraphContainer>
                <h2>{indicator.name}</h2>
                <IndicatorVisualisation indicatorId={indicator.id} />
              </GraphContainer>
            </Col>
          </Row>
        )}
      </Container>
      {indicator.actions && indicator.actions.length > 0 && (
        <Section>
          <Container>
            <Row>
              <Col className="mb-4">
                <h2>
                  {t('indicator-related-actions', getActionTermContext(plan))}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <ActionsTable actions={indicator.actions} />
              </Col>
            </Row>
          </Container>
        </Section>
      )}
      {hasImpacts && (
        <CausalNavigation
          causes={indicator.relatedCauses}
          effects={indicator.relatedEffects}
        />
      )}
    </div>
  );
}

export default IndicatorDetails;
