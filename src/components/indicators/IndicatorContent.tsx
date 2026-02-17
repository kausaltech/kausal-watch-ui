'use client';

import React from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { Col, Container, Row } from 'reactstrap';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';
import { getActionTermContext } from '@/common/i18n';
import ActionsTable from '@/components/actions/ActionsTable';
import CategoryTags from '@/components/actions/CategoryTags';
import ChangeHistory from '@/components/common/ChangeHistory';
import RichText from '@/components/common/RichText';
import CausalNavigation from '@/components/indicators/CausalNavigation';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';
import { usePlan } from '@/context/plan';

import IndicatorHero from './IndicatorHero';
import IndicatorModalContentBlock from './IndicatorModalContentBlock';

const Section = styled.section`
  margin-bottom: ${(props) => props.theme.spaces.s200};

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }
`;

const CausalNavigationSection = styled(Section)`
  background-color: ${(props) => props.theme.cardBackground.secondary};
  padding: ${(props) => props.theme.spaces.s100} 0;
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
  layout: NonNullable<IndicatorDetailsQuery['plan']>['indicatorListPage'];
  testId?: string;
};

function IndicatorContent({ indicator, layout, testId }: Props) {
  const plan = usePlan();
  const t = useTranslations();

  const hasLayout =
    layout &&
    ((layout.detailsMainTop && layout.detailsMainTop.length > 0) ||
      (layout.detailsMainBottom && layout.detailsMainBottom.length > 0) ||
      (layout.detailsAside && layout.detailsAside.length > 0));

  const hasImpacts = indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;
  const mainGoals = indicator.goals?.filter((goal) => !goal?.scenario) ?? [];

  const showIndicatorGraph = !indicator.hideIndicatorGraph;
  const showIndicatorTable = !indicator.hideIndicatorTable;
  const showGraphOrTable = showIndicatorGraph || showIndicatorTable;
  // header visible only if graph is visible
  const showGraphHeader = showIndicatorGraph;

  const allOrgs: {
    id: string;
    identifier: string | null;
    image: string | null | undefined;
    name: string;
    shortName: string | null;
    active: boolean;
    orgUrl: string;
  }[] = [];
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
    <div className="mb-5" data-testid={testId}>
      <IndicatorHero
        indicator={indicator}
        orgs={plan.features.hasActionPrimaryOrgs ? allOrgs : null}
        goals={mainGoals}
        legacyMode={!hasLayout}
      />
      <Container>
        <Row>
          {/* Main content = detailsMainTop */}
          <Col md="7" lg="8" className="mb-5">
            {/* Admin created layout */}
            {hasLayout &&
              layout?.detailsMainTop &&
              layout.detailsMainTop.map((block, index) => {
                return (
                  <IndicatorModalContentBlock key={block.id} block={block} indicator={indicator} />
                );
              })}
            {/* Legacy support */}
            {!hasLayout && <RichText html={indicator.description || ''} isCollapsible={false} />}
          </Col>
          {/* Side bar = detailsAside */}
          <Col md="5" lg="4" className="mb-5">
            {/* Admin created layout */}
            {hasLayout &&
              layout?.detailsAside &&
              layout.detailsAside.map((block, index) => {
                return (
                  <IndicatorModalContentBlock key={block.id} block={block} indicator={indicator} />
                );
              })}
            {/* Legacy support */}
            {!hasLayout && (
              <CategoryTags categories={indicator.categories} types={uniqueTypes} noLink={true} />
            )}
          </Col>
        </Row>
        <Row>
          {/* Main content = detailsMainBottom */}
          {hasLayout &&
            layout?.detailsMainBottom &&
            layout.detailsMainBottom.map((block, index) => {
              return (
                <IndicatorModalContentBlock key={block.id} block={block} indicator={indicator} />
              );
            })}
          {/* Legacy support */}
          {!hasLayout && (
            <div>
              {(indicator.latestGraph || (indicator.values && indicator.values.length > 0)) &&
                showGraphOrTable && (
                  <Row>
                    <Col className="mb-4">
                      <GraphContainer>
                        {showGraphHeader && <h2>{indicator.name}</h2>}
                        <IndicatorVisualisation
                          indicatorId={indicator.id}
                          showReference={true}
                          showGraph={showIndicatorGraph}
                          showTable={showIndicatorTable}
                        />
                      </GraphContainer>
                    </Col>
                  </Row>
                )}
              {indicator.actions && indicator.actions.length > 0 && (
                <Row>
                  <Col className="mb-4">
                    <Section>
                      <h2>{t('indicator-related-actions', getActionTermContext(plan))}</h2>
                      <ActionsTable actions={indicator.actions} />
                    </Section>
                  </Col>
                </Row>
              )}
              {plan.features.enableChangeLog && indicator.changeLogMessage && (
                <ChangeHistory
                  entityType="indicator"
                  entityId={String(indicator.id)}
                  entry={indicator.changeLogMessage}
                />
              )}
            </div>
          )}
        </Row>
      </Container>
      {!hasLayout && hasImpacts && (
        <CausalNavigationSection>
          <Container>
            <Row>
              <Col>
                <CausalNavigation
                  causes={indicator.relatedCauses}
                  effects={indicator.relatedEffects}
                  legacyMode={true}
                />
              </Col>
            </Row>
          </Container>
        </CausalNavigationSection>
      )}
    </div>
  );
}

export default IndicatorContent;
