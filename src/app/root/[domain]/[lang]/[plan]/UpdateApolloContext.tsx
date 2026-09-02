'use client';

import { type PropsWithChildren } from 'react';

import { useApolloClient } from '@apollo/client/react';
import { useSession } from 'next-auth/react';

import { usePlan } from '@/context/plan';
import { useWorkflowSelector } from '@/context/workflow-selector';

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

  /* eslint-disable react-hooks/immutability -- Apollo intentionally exposes mutable defaults for updating link context. */
  apolloClient.defaultContext.planIdentifier = plan.identifier;
  apolloClient.defaultContext.planDomain = domain;
  apolloClient.defaultContext.sessionToken =
    session.status === 'authenticated' ? session.data.idToken : undefined;
  apolloClient.defaultOptions.query = {
    ...(apolloClient.defaultOptions.query ?? {}),
    variables: {
      ...((apolloClient.defaultOptions.query?.variables ?? {}) as Record<string, unknown>),
      workflow,
    },
  };
  /* eslint-enable react-hooks/immutability */

  return children;
}
