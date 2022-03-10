import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { IndicatorListLink } from 'common/links';
import { usePlan } from 'context/plan';
import { useTranslation } from 'common/i18n';

import RichText from 'components/common/RichText';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import ErrorBoundary from 'components/common/ErrorBoundary';
import { Meta } from 'components/layout';

import IndicatorVisualisation from 'components/indicators/IndicatorVisualisation';
import ActionsTable from 'components/actions/ActionsTable';
import IndicatorValueSummary from 'components/indicators//IndicatorValueSummary';
import CausalNavigation from 'components/indicators//CausalNavigation';


const GET_INDICATOR_DETAILS = gql`
  query IndicatorDetails($id: ID, $plan: ID, $identifier: ID) {
    indicator(plan: $plan, id: $id, identifier: $identifier) {
      id
      identifier
      name
      level(plan: $plan)
      description
      timeResolution
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
      goals(plan: $plan) {
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

const IndicatorHero = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s200};
  padding: ${(props) => props.theme.spaces.s600} 0;
  background-color: ${(props) => props.theme.themeColors.light};

  a {
    color: inherit;
  }

  h1 {
    font-size: ${(props) => props.theme.fontSizeLg};
    hyphens: auto;

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXl};
    }
  }
`;

const IndicatorLevel = styled.span`
a {
  display: inline-block;
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  margin-bottom: ${(props) => props.theme.spaces.s150};

  color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColorFg;
      case 'operational':
        return props.theme.operationalIndicatorColorFg;
      case 'tactical':
        return props.theme.tacticalIndicatorColorFg;
      case 'strategic':
        return props.theme.strategicIndicatorColorFg;
      default:
        return props.theme.themeColors.black;
    }
  }};

  background-color: ${(props) => {
    switch (props.level) {
      case 'action':
        return props.theme.actionColor;
      case 'operational':
        return props.theme.operationalIndicatorColor;
      case 'tactical':
        return props.theme.tacticalIndicatorColor;
      case 'strategic':
        return props.theme.strategicIndicatorColor;
      default:
        return '#cccccc';
    }
  }};

  &:hover {
    color: inherit;
    text-decoration: underline;
  }
}
`;

const Section = styled.section`
  padding: ${(props) => props.theme.spaces.s300} 0;

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s100};
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

  const hasImpacts = indicator.relatedCauses.length > 0 || indicator.relatedEffects.length > 0;
  const mainGoals = indicator.goals.filter((goal) => !goal.scenario);

  return (
    <div className="mb-5">
      <Meta
        title={indicator.name}
      />
      <IndicatorHero level={indicator.level}>
        <Container>
          <IndicatorLevel level={indicator.level}>
            <IndicatorListLink>
              <a>
                { t(indicator.level) }
              </a>
            </IndicatorListLink>
          </IndicatorLevel>
          <h1>{indicator.name}</h1>
          { (mainGoals.length > 0) && (
            <IndicatorValueSummary
              timeResolution={indicator.timeResolution}
              values={indicator.values}
              unit={indicator.unit}
              goals={mainGoals}
            />
          )}
        </Container>
      </IndicatorHero>
      <Container>
        <Row>
          <Col md="10" className="mb-5 pt-4">
            <RichText html={indicator.description} />
          </Col>
        </Row>
        {(indicator.latestGraph || indicator.values.length > 0)
        && (
          <Row>
            <Col className="mb-5">
              <ErrorBoundary>
                <IndicatorVisualisation indicatorId={indicator.id} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
      </Container>
      { indicator.actions.length > 0 && (
        <Section>
          <Container>
            <Row>
              <Col className="mb-4">
                <h2>{t('indicator-related-actions')}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <ActionsTable
                  actions={indicator.actions}
                  t={t}
                />
              </Col>
            </Row>
          </Container>
        </Section>
      )}
      { hasImpacts
        && (
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
