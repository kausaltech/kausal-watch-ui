'use client';

import { PropsWithChildren } from 'react';
import { useApolloClient } from '@apollo/client';
import { usePlan } from '@/context/plan';

type Props = { domain: string } & PropsWithChildren;

/**
 * Ensure Apollo context is up to date with the current plan to
 * allow necessary headers to be set in Apollo links.
 */
export function UpdateApolloContext({ children, domain }: Props) {
  const apolloClient = useApolloClient();
  const plan = usePlan();

  apolloClient.defaultContext.planIdentifier = plan.identifier;
  apolloClient.defaultContext.planDomain = domain;

  return children;
}
