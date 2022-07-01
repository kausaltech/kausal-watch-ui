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
import { Link, ActionLink } from 'common/links';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import { Meta } from 'components/layout';

const ORG_DEFAULT_AVATAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";

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
      description
      url
      ancestors {
        id
      }
      plansWithActionResponsibilities {
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

  console.log("DATA", data)
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
              <OrgLogo src={org.logo?.rendition.src || ORG_DEFAULT_AVATAR} alt={org.logo?.altText} />
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
        </Container>
        <IndicatorsTabs>
          <Container>
            <Nav role="tablist">
              { plans?.map((p, i) => (
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
        </IndicatorsTabs>
      </OrgHeader>
      <Container>
        <ActionStatusTable
          enableExport={false}
          plan={plans[selectedPlanIndex]}
          actions={[...plans[selectedPlanIndex]?.actions]}
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
