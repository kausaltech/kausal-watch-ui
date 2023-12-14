import { gql, useQuery } from '@apollo/client';
import { usePlan } from 'context/plan';
import images from 'common/images';

import { InvalidEmbedAddressError } from 'context/embed';
import ActionHighlightCard from 'components/actions/ActionHighlightCard';
import { GetEmbedActionQuery } from 'common/__generated__/graphql';
import styled from 'styled-components';

const GET_ACTION = gql`
  query GetEmbedAction($plan: ID!, $identifier: ID!) {
    action(plan: $plan, identifier: $identifier) {
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
  const { loading, error, data } = useQuery<GetEmbedActionQuery>(GET_ACTION, {
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
        imageUrl={data.action?.image?.large?.src || undefined}
        hideIdentifier={plan.hideActionIdentifiers}
      />
    </ActionCardWrapper>
  );
};

export default ActionEmbed;
