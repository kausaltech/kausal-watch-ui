import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ActionStatusTable from 'components/dashboard/ActionStatusTable';

import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem
} from 'reactstrap';

const Tab = styled.button`
  background: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: 0.5em 0.5em 0 0;
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  text-align: center;

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


import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';
import { Link, ActionLink } from 'common/links';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { Meta } from 'components/layout';
import theme from 'common/theme';

const IndicatorsTabs = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  margin-bottom: 0;
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
    float: right;
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
      ancestors {
        id
      }
      plansWithActionResponsibilities {
        name
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
        actions(responsibleOrganization: $id) {
           id
           identifier
           name
           updatedAt
           tasks {
             id
           }
           tasks {
             id
             state
             dueAt
           }
           status {
             identifier
             name
           }
           plan {
             id
             viewUrl
           }
           responsibleParties {
             id
             organization {
               id
               abbreviation
               name
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
  const { t } = useTranslation();
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
    return <ErrorMessage statusCode={404} message={t('indicator-not-found')} />;
  }

  const plans = data?.organization?.plansWithActionResponsibilities;

  return (
    <div className="mb-5">
      <Meta
        title={org.name}
      />
      <OrgHeader>
        <Container>
          <Row>
            <Col md={{ size: 6, offset: 2 }}>
              <SectionTitle>
                { t('organizations') }
              </SectionTitle>
            </Col>
          </Row>
          <Row>
            <Col md="2">
              <OrgLogo src={org.logo?.rendition.src} alt={org.logo?.altText} />
            </Col>
            <Col md="8" xl="7" className="mb-5">
              {org.parent?.id &&
                <>
                  <Link href={`/organizations/${org.parent.id}`}>
                    {org.parent.name}
                  </Link>
                  {' '}
                  /
                </>
              }
              <h1>{org.name}</h1>
              <OrgDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </OrgDescription>
              <OrgLink
                href="#"
              >
                Link to Org site
              </OrgLink>
            </Col>
          </Row>
        </Container>
        <IndicatorsTabs>
          <Container>
            <Nav role="tablist">
              { plans.map((p, i) => (
                <NavItem>
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
                    { p.name }
                  </Tab>
                </NavItem>
              ))}
            </Nav>
          </Container>
        </IndicatorsTabs>
      </OrgHeader>
      <Container>
        <ActionStatusTable
          enableExport={false}
          plan={plans[selectedPlanIndex]}
          actions={[...plans[selectedPlanIndex].actions]}
          orgs={[]}
        />
      </Container>
    </div>
  );
}

OrgContent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default OrgContent;
