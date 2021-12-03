/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import {
  Row, Col,
} from 'reactstrap';
import LazyLoad from 'react-lazyload';
import Button from 'components/common/Button';
import { withTranslation } from 'common/i18n';
import ContentLoader from 'components/common/ContentLoader';
import { ActionListLink } from 'common/links';
import images, { getActionImage } from 'common/images';

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
      image {
        ...MultiUseImageFragment
      }
      plan {
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
      }
      categories {
        id
        image {
          ...MultiUseImageFragment
        }
        parent {
          id
          image {
            ...MultiUseImageFragment
          }
          parent {
            id
            image {
              ...MultiUseImageFragment
            }
          }
        }
      }
    }
  }
  ${images.fragments.multiUseImage}
`;

const ListHeader = styled(Col)`
  h2 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s400};
  }
`;

const CardContainer = styled(Col)`
  margin-bottom: ${(props) => props.theme.spaces.s150};

  .card {
    height: 100%;
  }

  .lazyload-wrapper {
    width: 100%;
  }
`;

function ActionCardList({ t, actions, plan }) {
  return (
    <Row>
      <ListHeader xs="12">
        <h2>{ t('recently-updated-actions') }</h2>
      </ListHeader>
      {actions.map((item) => (
        <CardContainer
          xs="12"
          md="6"
          lg="4"
          key={item.id}
          className="d-flex align-items-stretch"
          style={{ transition: 'all 0.5s ease' }}
        >
          <LazyLoad height={300}>
            <ActionHighlightCard
              action={item}
              imageUrl={getActionImage(plan, item)?.small.src}
              hideIdentifier={plan.hideActionIdentifiers}
            />
          </LazyLoad>
        </CardContainer>
      ))}
      <Col xs="12" className="mt-5 mb-5">
        <ActionListLink>
          <Button outline color="primary" tag="a">
            { t('see-all-actions') }
            {' '}
            <Icon name="arrowRight" color="black" />
          </Button>
        </ActionListLink>
      </Col>
    </Row>
  );
}

ActionCardList.propTypes = {
  t: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
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
        return <ActionCardList t={t} actions={data.planActions} plan={plan}/>;
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
