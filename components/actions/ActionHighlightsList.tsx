/* eslint-disable max-classes-per-file */
import React, { useContext } from 'react';
import { gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import {
  ActionHightlightListQuery,
  PlanContextFragment,
} from 'common/__generated__/graphql';
import EmbedContext from 'context/embed';
import Button from 'components/common/Button';
import { getActionTermContext, useTranslation } from 'common/i18n';
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
      color
      status {
        id
        identifier
        name
      }
      statusSummary {
        identifier
      }
      implementationPhase {
        id
        name
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
    {},
    props,
    { embed: undefined, children: undefined }
  );
  return <Col {...childProps}>{props.children}</Col>;
};

const StyledCardContainer = styled(ReactStrapCol)`
  margin-bottom: ${(props) => props.theme.spaces.s150};
  ${(props) => (props.embed.active ? '' : 'transition: all 0.5s ease;')}

  .card {
    height: 100%;
  }
`;

export type ActionHighlightListAction = NonNullable<
  ActionHightlightListQuery['planActions']
>;

type ActionCardListProps = {
  t: (arg0: string, arg1: Record<string, unknown>) => string;
  actions: ActionHighlightListAction;
  plan: PlanContextFragment;
  displayHeader?: boolean;
};

function ActionCardList(props: ActionCardListProps) {
  const { t, actions, plan, displayHeader } = props;
  // Components which use the EmbedContext support embedding
  const embed = useContext(EmbedContext);

  return (
    <Row>
      {displayHeader && (
        <ListHeader xs="12">
          <h2>
            {t('recently-updated-actions', getActionTermContext(plan) || {})}
          </h2>
        </ListHeader>
      )}
      {actions?.map((item) => (
        <StyledCardContainer
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
            hideIdentifier={plan.hideActionIdentifiers || false}
          />
        </StyledCardContainer>
      ))}
      {!embed.active && (
        <Col xs="12" className="mt-5 mb-5">
          <ActionListLink>
            <Button color="primary" tag="a">
              {t('see-all-actions', getActionTermContext(plan) || {})}{' '}
              <Icon name="arrowRight" />
            </Button>
          </ActionListLink>
        </Col>
      )}
    </Row>
  );
}

type ActionHighlightsListProps = {
  plan: PlanContextFragment;
  count?: number;
  displayHeader?: boolean;
};

function ActionHighlightsList(props: ActionHighlightsListProps) {
  const { plan, count, displayHeader } = props;
  const { t } = useTranslation();

  const queryParams = {
    plan: plan.identifier,
    first: count ?? 6,
    orderBy: '-updatedAt',
  };

  // TODO: Convert to useQuery
  return (
    <Query query={GET_ACTION_LIST} variables={queryParams}>
      {({ data, loading, error }) => {
        if (loading) return <ContentLoader />;
        if (error)
          return (
            <p>{t('error-loading-actions', getActionTermContext(plan))}</p>
          );
        return (
          <ActionCardList
            t={t}
            actions={data.planActions}
            plan={plan}
            displayHeader={displayHeader ?? true}
          />
        );
      }}
    </Query>
  );
}

export default ActionHighlightsList;
