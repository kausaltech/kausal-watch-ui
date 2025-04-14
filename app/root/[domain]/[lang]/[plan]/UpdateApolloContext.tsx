'use client';

import { PropsWithChildren } from 'react';
import { useApolloClient } from '@apollo/client';
import { usePlan } from '@/context/plan';
import { useWorkflowSelector } from '@/context/workflow-selector';
import { useSession } from 'next-auth/react';
import { isServer } from '@/common/environment';

type Props = { domain: string } & PropsWithChildren;

/**
 * Ensure Apollo context is up to date with the current plan to
 * allow necessary headers to be set in Apollo links.
 */
export function UpdateApolloContext({ children, domain }: Props) {
  const apolloClient = useApolloClient();
  const plan = usePlan();
  const session = useSession();
  const { workflow } = useWorkflowSelector();

  apolloClient.defaultContext.planIdentifier = plan.identifier;
  apolloClient.defaultContext.planDomain = domain;
  apolloClient.defaultContext.sessionToken =
    session.status === 'authenticated' ? session.data.idToken : undefined;
  apolloClient.defaultOptions.query = {
    ...(apolloClient.defaultOptions.query ?? {}),
    variables: {
      ...(apolloClient.defaultOptions.query?.variables ?? {}),
      workflow,
    },
  };

  return children;
}
