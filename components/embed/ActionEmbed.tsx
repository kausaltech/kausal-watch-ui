import { gql, useQuery } from '@apollo/client';
import { usePlan } from 'context/plan';
import images from 'common/images';

import { InvalidEmbedAddressError } from 'context/embed';
import ActionHighlightCard from 'components/actions/ActionHighlightCard';
import { GetEmbedActionQuery } from 'common/__generated__/graphql';

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

interface ActionEmbedPropsType {
  path: string[]
}

const ActionEmbed = ({path} : ActionEmbedPropsType) => {
  const plan = usePlan();
  if (path.length < 1) {
    throw new InvalidEmbedAddressError('Could not retrieve action data');
  }
  const { loading, error, data } = useQuery<GetEmbedActionQuery>(GET_ACTION, {
     variables: {
      plan: plan.identifier,
      identifier: path[0],
    }
  });
  if (loading) return null;
  if (error || data == null || data.action == null) {
    throw new InvalidEmbedAddressError('Could not retrieve action data');
  }
  return <ActionHighlightCard
    action={data.action}
    imageUrl={data.action?.image?.rendition?.src || undefined}
    hideIdentifier={plan.hideActionIdentifiers}
  />;

}

export default ActionEmbed;
