/* eslint-disable max-classes-per-file */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import LazyLoad from 'react-lazyload';

import EmbedContext from 'context/embed';
import Button from 'components/common/Button';
import { getActionTermContext, withTranslation } from 'common/i18n';
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
      name(hyphenated: true)
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

const ReactStrapCol = (props) => {
  const childProps = Object.assign(
    // remove the embed prop so it won't end up as a DOM attribute
    {}, props, {embed: undefined, children: undefined}
  );
  return <Col {...childProps}>{props.children}</Col>
}

const StyledCardContainer = styled(ReactStrapCol)`
  margin-bottom: ${(props) => props.theme.spaces.s150};
  ${(props) => props.embed.active ? '' : 'transition: all 0.5s ease;'}

  .card {
    height: 100%;
  }

  .lazyload-wrapper {
    width: 100%;
  }
`;

const ConditionalLazyLoad = (props) => {
  if (props.embed?.active) {
    return <>{ props.children }</>;
  }
  return (
    <LazyLoad height={300}>
      {props.children}
    </LazyLoad>
  );
}

const CardContainer = (props) => {
  return <StyledCardContainer {...props}>
    <ConditionalLazyLoad {...props}>
      {props.children}
    </ConditionalLazyLoad>
  </StyledCardContainer>
}

function ActionCardList({ t, actions, plan, displayHeader }) {
  // Components which use the EmbedContext support embeding
  const embed = useContext(EmbedContext);

  return (
    <Row>
      { displayHeader && <ListHeader xs="12">
        <h2>{ t('recently-updated-actions', getActionTermContext(plan)) }</h2>
      </ListHeader> }
      {actions.map((item) => (
        <CardContainer
          xs="12"
          md="6"
          lg="4"
          key={item.id}
          className="d-flex align-items-stretch"
          embed={embed}
        >
          <ActionHighlightCard
            action={item}
            imageUrl={getActionImage(plan, item)?.small.src}
            hideIdentifier={plan.hideActionIdentifiers}
          />
        </CardContainer>
      ))}
      <Col xs="12" className="mt-5 mb-5">
        <ActionListLink>
          <Button outline color="primary" tag="a">
            { t('see-all-actions', getActionTermContext(plan)) }
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
  displayHeader: PropTypes.bool,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

function ActionHighlightsList(props) {
  const {
    t, plan, count, displayHeader
  } = props;
  console.log(count);
  const queryParams = {
    plan: plan.identifier,
    first: count ?? 6,
    orderBy: '-updatedAt',
  };

  return (
    <Query query={GET_ACTION_LIST} variables={queryParams}>
      {({ data, loading, error }) => {
        if (loading) return <ContentLoader />;
        if (error) return <p>{ t('error-loading-actions', getActionTermContext(plan)) }</p>;
        return <ActionCardList t={t} actions={data.planActions} plan={plan} displayHeader={displayHeader ?? true}/>;
      }}
    </Query>
  );
}

ActionHighlightsList.propTypes = {
  t: PropTypes.func.isRequired,
  count: PropTypes.number,
  displayHeader: PropTypes.bool,
  plan: PropTypes.shape({
    identifier: PropTypes.string,
  }).isRequired,
};

export default withTranslation('common')(ActionHighlightsList);
