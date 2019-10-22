/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Row, Col, Button,
} from 'reactstrap';
import { withTranslation } from '../../common/i18n';
import ContentLoader from '../common/ContentLoader';
import { Link } from '../../routes';
import { ActionListLink } from '../../common/links';

import ActionHighlightCard from './ActionHighlightCard';
import Icon from '../common/Icon';

export const GET_ACTION_LIST = gql`
  query ActionHightlightList($plan: ID!, $first: Int!, $orderBy: String!) {
    planActions(plan: $plan, first: $first, orderBy: $orderBy) {
      id
      identifier
      name
      officialName
      completion
      updatedAt
      plan {
        id
      }
      status {
        id
        identifier
        name
      }
      categories {
        id
      }
    }
  }
`;

function ActionCardList({ t, actions }) {
  return (
    <Row>
      <Col xs="12">
        <h2 className="mb-5">{ t('recently-updated-actions') }</h2>
      </Col>
      {actions.map((item) => (
        <Col
          xs="12"
          md="6"
          lg="4"
          key={item.id}
          className="mb-4 d-flex align-items-stretch"
          style={{ transition: 'all 0.5s ease' }}
        >
          <ActionHighlightCard action={item} />
        </Col>
      ))}
      <Col xs="12" className="mt-5 mb-5">
        <ActionListLink>
          <a>
            <Button outline color="dark">
              { t('see-all-actions') }
              {' '}
              <Icon name="arrowRight" color="black" />
            </Button>
          </a>
        </ActionListLink>
      </Col>
    </Row>
  );
}

ActionCardList.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

function ActionHighlightsList(props) {
  const {
    t, plan,
  } = props;
  const queryParams = {
    plan: plan.identifier,
    first: 6,
    orderBy: '-updatedAt',
  };

  return (
    <Query query={GET_ACTION_LIST} variables={queryParams}>
      {({ data, loading, error }) => {
        if (loading) return <ContentLoader />;
        if (error) return <p>{ t('error-loading-actions') }</p>;
        return <ActionCardList t={t} actions={data.planActions} />;
      }}
    </Query>
  );
}

ActionHighlightsList.propTypes = {
  t: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

export default withTranslation('common')(ActionHighlightsList);
