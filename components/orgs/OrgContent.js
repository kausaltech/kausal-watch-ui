import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ActionStatusTable from 'components/dashboard/ActionStatusTable';

import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem
} from 'reactstrap';
import PlanChip from 'components/plans/PlanChip';
import RichText from 'components/common/RichText';

import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';
import { OrganizationLink } from 'common/links';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { Meta } from 'components/layout';
import ActionsStatusGraphs from 'components/dashboard/ActionStatusGraphs';

const Tab = styled.button`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.btnBorderRadius} ${(props) => props.theme.btnBorderRadius} 0 0;
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: left;

  &:hover, &:focus {
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
  color: ${(props) => props.theme.themeColors.white };

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${(props) => props.theme.themeColors.white };
    line-height: ${(props) => props.theme.lineHeightSm};
    font-size: ${(props) => props.theme.fontSizeXl};
  }

  a {
    color: ${(props) => props.theme.themeColors.white };
    line-height: ${(props) => props.theme.lineHeightSm};
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
  color: ${(props) => props.theme.brandLight };
`;

const ActionTableHeader = styled.div`
  margin: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s100};

  h2 {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin: 0;
  }
`;

const ActionTableContainer = styled.div`
  overflow: auto ;
`;

const GET_ORG_DETAILS = gql`
  query OrganizationDetails($id: ID!) {
    organization(id: $id) {
      id
      classification {
        id
        name
        identifier
      }
      name
      abbreviation
      distinctName
      description
      url
      ancestors {
        id
      }
      plansWithActionResponsibilities {
        id
        name
        shortName
        organization {
          id
          name
          abbreviation
        }
        primaryOrgs {
          id
          name
        }
        actionImpacts {
          id
        }
        image {
          rendition(size: "128x128", crop: true) {
            id
            src
            alt
          }
        }
        actionStatuses {
          id
          identifier
          name
          isCompleted
        }
        features {
          hasActionIdentifiers
          hasActionOfficialName
          hasActionPrimaryOrgs
          publicContactPersons
        }
        actions(responsibleOrganization: $id) {
          id
          identifier
          name(hyphenated: true)
          officialName
          completion
          updatedAt
          scheduleContinuous
          startDate
          endDate
          order
          plan {
            id
          }
          schedule {
            id
          }
          status {
            id
            identifier
            name
          }
          implementationPhase {
            id
            identifier
            name
            order
          }
          impact {
            id
            identifier
          }
          categories {
            id
          }
          responsibleParties {
            id
            organization {
              id
              abbreviation
              name
            }
          }
          primaryOrg {
            id
            abbreviation
            name
            logo {
              rendition(size: "128x128", crop: true) {
                src
              }
            }
          }

          tasks {
            id
            state
            dueAt
          }
          mergedWith {
            id
            identifier
            plan {
              id
              shortName
              viewUrl
            }
          }
          indicators {
            id
            goals {
              id
            }
          }
          relatedIndicators {
            id
            indicatesActionProgress
            indicator {
              id
              goals {
                id
              }
            }
          }
        }
      }
      actionCount
      contactPersonCount
      parent {
        id
        name
      }
      logo(parentFallback: true) {
        id
        altText
        rendition(size: "128x128", crop: false) {
          id
          src
          alt
        }
      }
    }
  }
`;

function OrgContent(props) {
  const { id } = props;
  const plan = usePlan();
  const { t } = useTranslation(['common', 'actions']);
  const [ selectedPlanIndex, setSelectedPlan ] = useState(0);

  const { data, loading, error } = useQuery(GET_ORG_DETAILS, {
    variables: {
      id,
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { organization:org } = data;
  if (!org) {
    return <ErrorMessage statusCode={404} message={t('common:organization-not-found')} />;
  }

  console.log("org", org);
  const plans = data?.organization?.plansWithActionResponsibilities;

  return (
    <div className="mb-5">
      <Meta
        title={org.name}
      />
      <OrgHeader>
        <HeaderContainer>
          <Row>
            <Col md={{ size: 6, offset: org.logo?.rendition.src ? 2 : 0 }}>
              <SectionTitle>
                { t('common:organizations') }
              </SectionTitle>
            </Col>
          </Row>
          <Row>
            { org.logo?.rendition.src &&
              <Col md="2">
                <OrgLogo src={org.logo?.rendition.src} />
              </Col>
            }
            <Col md="8" xl="7" className="mb-5">
              {org.parent?.id &&
                <>
                  <OrganizationLink organizationId={org.parent.id}>
                    {org.parent.name}
                  </OrganizationLink>
                  {' '}
                  /
                </>
              }
              <h1>{org.name}</h1>
              { org.description &&
                <OrgDescription>
                  <RichText html={org.description} />
                </OrgDescription>
              }
              { org.url &&
                <OrgLink
                  href={org.url}
                >
                  {org.url}
                </OrgLink>
              }
            </Col>
          </Row>
        </HeaderContainer>
        <OrgTabs>
          <Container>
            <Nav role="tablist">
              { plans?.map((p, i) => (
                <NavItem key={p.id}>
                  <Tab
                    className={i === selectedPlanIndex ? "active" : ""}
                    aria-selected={i === selectedPlanIndex}
                    passHref
                    role="tab"
                    tabIndex="0"
                    aria-controls="list-view"
                    id="list-tab"
                    onClick={() => setSelectedPlan(i)}
                  >
                    <PlanChip
                      planImage={p?.image?.rendition.src}
                      planShortName={p.shortName || p.name}
                      organization={p.shortName ? p.name : p.organization.abbreviation}
                      size="md"
                      negative={i!== selectedPlanIndex}
                    />
                  </Tab>
                </NavItem>
              ))}
            </Nav>
          </Container>
        </OrgTabs>
      </OrgHeader>
      { plans.length ?
        <Container>
          <ActionTableHeader>
            <h2>
              { t('actions:org-responsible-in-actions', { actionCount: plans[selectedPlanIndex]?.actions.length }) }
            </h2>
          </ActionTableHeader>
          <ActionTableContainer>
            <ActionStatusTable
              enableExport={false}
              plan={plans[selectedPlanIndex]}
              actions={[...plans[selectedPlanIndex]?.actions]}
              orgs={[]}
            />
          </ActionTableContainer>
        </Container>
        :
        <Container />
      }
    </div>
  );
}

OrgContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OrgContent;
