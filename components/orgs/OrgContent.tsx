'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Container, Row, Col, Nav, NavItem } from 'reactstrap';
import { useTheme } from 'styled-components';

import ActionStatusTable from 'components/dashboard/ActionStatusTable';
import PlanChip from 'components/plans/PlanChip';
import RichText from 'components/common/RichText';
import { usePlan } from 'context/plan';
import { OrganizationLink } from 'common/links';
import { OrganizationDetailsQuery } from 'common/__generated__/graphql';

const Tab = styled.button`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.btnBorderRadius}
    ${(props) => props.theme.btnBorderRadius} 0 0;
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: left;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.brandLight};
  }
  &.active {
    color: ${(props) => props.theme.brandDark};
    background: ${(props) => props.theme.themeColors.white};
    &:hover {
      color: ${(props) => props.theme.themeColors.black};
    }
  }
`;

const OrgTabs = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  margin-bottom: 0;

  .nav {
    flex-wrap: nowrap;
    overflow: auto;
  }
`;

const HeaderContainer = styled(Container)`
  margin-bottom: ${(props) => props.theme.spaces.s200};
`;

const OrgHeader = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0 0 0;
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${(props) => props.theme.themeColors.white};
    line-height: ${(props) => props.theme.lineHeightSm};
    font-size: ${(props) => props.theme.fontSizeXl};
  }

  a {
    color: ${(props) => props.theme.themeColors.white};
    line-height: ${(props) => props.theme.lineHeightSm};

    &:hover {
      color: ${(props) => props.theme.themeColors.white};
    }
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    h1 {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }
`;

const SectionTitle = styled.p`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const OrgLogo = styled.img`
  display: block;
  margin-bottom: ${(props) => props.theme.spaces.s200};
  max-width: ${(props) => props.theme.spaces.s800};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    max-width: 100%;
  }
`;

const OrgDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const OrgLink = styled.a`
  display: block;
  font-size: ${(props) => props.theme.fontSizeSm};
  text-decoration: underline;
  color: ${(props) => props.theme.brandLight};
`;

const ActionTableHeader = styled.div`
  margin: ${(props) => props.theme.spaces.s300} 0
    ${(props) => props.theme.spaces.s100};

  h2 {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin: 0;
  }
`;

const ActionTableContainer = styled.div`
  overflow: auto;
`;

type Props = {
  org: NonNullable<OrganizationDetailsQuery['organization']>;
  planFromOrgQuery: NonNullable<OrganizationDetailsQuery['plan']>;
};

function OrgContent({ org, planFromOrgQuery }: Props) {
  const plan = usePlan();
  const t = useTranslations();
  const theme = useTheme();
  const [selectedPlanIndex, setSelectedPlan] = useState(0);

  // Make sure host plan is first
  const allPlans = [planFromOrgQuery, ...org.plansWithActionResponsibilities];
  const selectedPlan = allPlans[selectedPlanIndex];

  // add plan.feature.showActionUpdateStatus to backend
  const showUpdateStatus = theme.settings.dashboard?.showActionUpdateStatus;

  return (
    <div className="mb-5">
      <OrgHeader>
        <HeaderContainer>
          <Row>
            <Col md={{ size: 6, offset: org.logo?.rendition?.src ? 2 : 0 }}>
              <SectionTitle>
                {t('organizations', {
                  context: plan.generalContent.organizationTerm,
                })}
              </SectionTitle>
            </Col>
          </Row>
          <Row>
            {org.logo?.rendition?.src && (
              <Col md="2">
                <OrgLogo src={org.logo?.rendition.src} />
              </Col>
            )}
            <Col md="8" xl="7" className="mb-5">
              {org.parent?.id && (
                <>
                  <OrganizationLink organizationId={org.parent.id}>
                    {org.parent.name}
                  </OrganizationLink>{' '}
                  /
                </>
              )}
              <h1>{org.name}</h1>
              {org.description && (
                <OrgDescription>
                  <RichText html={org.description} />
                </OrgDescription>
              )}
              {org.url && <OrgLink href={org.url}>{org.url}</OrgLink>}
            </Col>
          </Row>
        </HeaderContainer>
        <OrgTabs>
          <Container>
            <Nav role="tablist">
              {allPlans.map((p, i) => (
                <NavItem key={p.id}>
                  <Tab
                    className={i === selectedPlanIndex ? 'active' : ''}
                    aria-selected={i === selectedPlanIndex}
                    role="tab"
                    tabIndex={0}
                    aria-controls="list-view"
                    id="list-tab"
                    onClick={() => setSelectedPlan(i)}
                  >
                    <PlanChip
                      planImage={p.image?.rendition?.src}
                      planShortName={`${p.shortName || p.name}${
                        p.versionName ? ` (${p.versionName})` : ''
                      }`}
                      organization={
                        p.shortName ? p.name : p.organization.abbreviation
                      }
                      size="md"
                      negative={i !== selectedPlanIndex}
                    />
                  </Tab>
                </NavItem>
              ))}
            </Nav>
          </Container>
        </OrgTabs>
      </OrgHeader>
      {allPlans.length ? (
        <Container fluid="lg">
          <ActionTableHeader>
            <h2>
              {t('org-responsible-in-actions', {
                actionCount: selectedPlan.actions.length,
              })}
            </h2>
          </ActionTableHeader>
          <ActionTableContainer>
            <ActionStatusTable
              columns={
                planFromOrgQuery.actionListPage?.__typename === 'ActionListPage'
                  ? planFromOrgQuery.actionListPage.dashboardColumns ?? []
                  : []
              }
              enableExport={false}
              planViewUrl={selectedPlan.viewUrl}
              plan={selectedPlan}
              actions={selectedPlan.actions}
              orgs={[]}
              showUpdateStatus={showUpdateStatus}
            />
          </ActionTableContainer>
        </Container>
      ) : (
        <Container />
      )}
    </div>
  );
}

export default OrgContent;
