import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CategoryTags from 'components/actions/CategoryTags';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { IndicatorListLink } from 'common/links';
import { usePlan } from 'context/plan';
import { getActionTermContext, useTranslation } from 'common/i18n';

import RichText from 'components/common/RichText';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { Meta } from 'components/layout';

import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import ActionsTable from 'components/actions/ActionsTable';

import CausalNavigation from 'components/indicators/CausalNavigation';
import IndicatorHero from './IndicatorHero';

const GET_INDICATOR_DETAILS = gql`
  query IndicatorDetails($id: ID, $plan: ID, $identifier: ID) {
    indicator(plan: $plan, id: $id, identifier: $identifier) {
      id
      identifier
      name
      level(plan: $plan)
      description
      timeResolution
      organization {
        id
        classification {
          id
          name
        }
        name
        abbreviation
        logo {
          id
          rendition(size: "128x128", crop: true) {
            src
          }
        }
      }
      categories {
        identifier
        name
        id
        type {
          identifier
          name
          id
          levels {
            id
            name
          }
        }
      }
      common {
        id
        indicators {
          id
          identifier
          organization {
            id
            classification {
              id
              name
            }
            name
            abbreviation
            logo {
              id
              rendition(size: "128x128", crop: true) {
                src
              }
            }
          }
        }
      }
      unit {
        id
        name
        shortName
        verboseName
        verboseNamePlural
      }
      latestGraph {
        id
      }
      values {
        id
        date
        value
      }
      goals {
        id
        date
        value
        scenario {
          id
        }
      }
      actions(plan: $plan) {
        id
        ...ActionsTable
      }
      relatedCauses {
        id
        effectType
        confidenceLevel
        causalIndicator {
          id
          name
          level(plan: $plan)
        }
      }
      relatedEffects {
        id
        effectType
        confidenceLevel
        effectIndicator {
          id
          name
          level(plan: $plan)
        }
      }
    }
  }
  ${ActionsTable.fragments.action}
`;

const Section = styled.section`
  padding: ${(props) => props.theme.spaces.s300} 0;

  h2 {
    font-size: ${(props) => props.theme.fontSizeMd};
    margin-bottom: ${(props) => props.theme.spaces.s100};
  }
`;

const GraphContainer = styled.div`
  border: 1px solid ${(props) => props.theme.themeColors.light};
  padding: ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s200};
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeBase};
    text-align: center;
  }
`;

function IndicatorDetails({ id }) {
  const plan = usePlan();
  const { t } = useTranslation();

  // Ensure id is a number
  if (isNaN(parseInt(id, 10))) {
    return <ErrorMessage statusCode={404} message={t('indicator-not-found')} />;
  }

  const { data, loading, error } = useQuery(GET_INDICATOR_DETAILS, {
    variables: {
      id,
      plan: plan.identifier,
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { indicator } = data;
  if (!indicator) {
    return <ErrorMessage statusCode={404} message={t('indicator-not-found')} />;
  }

  const hasImpacts =
    indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;
  const mainGoals = indicator.goals.filter((goal) => !goal.scenario);

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
        image: common.organization.logo?.rendition.src,
        name: common.organization.name,
        shortName: common.organization.abbreviation,
        active: common.organization.id === indicator.organization.id,
        orgUrl: `/indicators/${common.id}`,
      });
  });

  return (
    <div className="mb-5">
      <Meta title={indicator.name} />
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
              types={indicator.categories.map((c) => c.type)}
              noLink={true}
            />
          </Col>
        </Row>
        {(indicator.latestGraph || indicator.values.length > 0) && (
          <Row>
            <Col className="mb-5">
              <GraphContainer>
                <ErrorBoundary>
                  <h2>{indicator.name}</h2>
                  <IndicatorVisualisation indicatorId={indicator.id} />
                </ErrorBoundary>
              </GraphContainer>
            </Col>
          </Row>
        )}
      </Container>
      {indicator.actions.length > 0 && (
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
                <ActionsTable actions={indicator.actions} t={t} />
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

IndicatorDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IndicatorDetails;
