import styled from '@emotion/styled';

import { type TypedDocumentNode, gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

import type { EmbedActionQuery, EmbedActionQueryVariables } from '@/common/__generated__/graphql';
import images from '@/common/images';
import ActionHighlightCard from '@/components/actions/ActionHighlightCard';
import { InvalidEmbedAddressError } from '@/context/embed';
import { usePlan } from '@/context/plan';

const GET_ACTION: TypedDocumentNode<EmbedActionQuery, EmbedActionQueryVariables> = gql`
  query EmbedAction($plan: ID!, $identifier: ID!) {
    action(plan: $plan, identifier: $identifier) {
      id
      identifier
      name(hyphenated: true)
      officialName
      completion
      updatedAt
      image {
        ...CardImage
      }
      plan {
        id
      }
      color
      statusSummary {
        identifier
      }
      status {
        id
        identifier
        name
        color
      }
      implementationPhase {
        id
        name
        identifier
      }
      categories {
        id
        image {
          ...CardImage
        }
        parent {
          id
          image {
            ...CardImage
          }
          parent {
            id
            image {
              ...CardImage
            }
          }
        }
      }
    }
  }
  ${images.fragments.cardImage}
`;

interface ActionEmbedPropsType {
  path: string[];
  maxWidth?: number;
}

interface ActionCardWrapperProps {
  maxWidth: number;
}

const DEFAULT_MAX_WIDTH = 600;

const ActionCardWrapper = styled.div<ActionCardWrapperProps>`
  max-width: ${(props) => props.maxWidth}px;
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    max-width: 100%;
  }
`;

const ActionEmbed = ({ path, maxWidth }: ActionEmbedPropsType) => {
  const plan = usePlan();
  if (path.length < 1) {
    throw new InvalidEmbedAddressError('Could not retrieve action data');
  }
  const { loading, error, data } = useQuery(GET_ACTION, {
    variables: {
      plan: plan.identifier,
      identifier: path[0],
    },
  });
  if (loading) return null;
  if (error || data == null || data.action == null) {
    throw new InvalidEmbedAddressError('Could not retrieve action data');
  }
  return (
    <ActionCardWrapper maxWidth={maxWidth ?? DEFAULT_MAX_WIDTH}>
      <ActionHighlightCard
        action={data.action}
        imageUrl={data.action?.image?.small?.src || undefined}
        hideIdentifier={plan.hideActionIdentifiers}
      />
    </ActionCardWrapper>
  );
};

export default ActionEmbed;
