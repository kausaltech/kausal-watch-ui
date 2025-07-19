/* eslint-disable max-classes-per-file */
import React, { useContext } from 'react';

import { gql } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  ActionHightlightListQuery,
  ActionHightlightListQueryVariables,
  PlanContextFragment,
} from 'common/__generated__/graphql';
import { getActionTermContext } from 'common/i18n';
import images, { getActionImage } from 'common/images';
import { ActionListLink } from 'common/links';
import Button from 'components/common/Button';
import EmbedContext from 'context/embed';
import { useTranslations } from 'next-intl';
import { Col, Row } from 'reactstrap';
import styled from 'styled-components';

import Icon from '../common/Icon';
import ActionHighlightCard from './ActionHighlightCard';

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
        color
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
    text-align: center;
    padding: ${(props) => props.theme.spaces.s100};
    border-radius: ${(props) => props.theme.cardBorderRadius};
    background-color: ${(props) => props.theme.themeColors.white};
    color: ${(props) => props.theme.headingsColor};
    margin-bottom: ${(props) => props.theme.spaces.s300};
    font-size: ${(props) => props.theme.fontSizeLg};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeXl};
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

export type ActionHighlightListAction = NonNullable<ActionHightlightListQuery['planActions']>;

type ActionCardListProps = {
  actions: ActionHighlightListAction;
  plan: PlanContextFragment;
  displayHeader?: boolean;
};

function ActionCardList(props: ActionCardListProps) {
  const t = useTranslations();
  const { actions, plan, displayHeader } = props;
  // Components which use the EmbedContext support embedding
  const embed = useContext(EmbedContext);

  return (
    <Row>
      {displayHeader && (
        <ListHeader xs="12">
          <h2>{t('recently-updated-actions', getActionTermContext(plan) || {})}</h2>
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
              {t('see-all-actions', getActionTermContext(plan) || {})} <Icon.ArrowRight />
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
  const t = useTranslations();

  const queryParams = {
    plan: plan.identifier,
    first: count ?? 6,
    orderBy: '-updatedAt',
  };

  const { data, error } = useSuspenseQuery<
    ActionHightlightListQuery,
    ActionHightlightListQueryVariables
  >(GET_ACTION_LIST, {
    variables: queryParams,
  });

  if (error || !data.planActions)
    return <p>{t('error-loading-actions', getActionTermContext(plan))}</p>;

  return (
    <ActionCardList actions={data.planActions} plan={plan} displayHeader={displayHeader ?? true} />
  );
}

export default ActionHighlightsList;
