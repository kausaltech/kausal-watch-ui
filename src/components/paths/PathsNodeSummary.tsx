import React from 'react';

import { NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import ContentLoader from 'react-content-loader';
import { useTheme } from 'styled-components';

import { InstanceType } from '@/common/__generated__/paths/graphql';
import { activeGoalVar } from '@/context/paths/cache';
import { GET_NODE_CONTENT } from '@/queries/paths/get-paths-node';
import { getHttpHeaders } from '@/utils/paths/paths.utils';

import ActionNodeSummary from './ActionNodeSummary';
import InventoryNodeSummary from './InventoryNodeSummary';

const PathsContentLoader = (props) => {
  const theme = useTheme();
  return (
    <ContentLoader
      speed={1}
      width={330}
      height={80}
      viewBox="0 0 330 80"
      backgroundColor={theme.graphColors.grey010}
      foregroundColor={theme.graphColors.grey030}
      {...props}
    >
      <rect x="5" y="1" rx="3" ry="3" width="166" height="16" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="6" y="24" rx="3" ry="3" width="130" height="27" />
      <rect x="4" y="61" rx="3" ry="3" width="166" height="16" />
    </ContentLoader>
  );
};

type PathsNodeContentProps = {
  categoryId: string;
  node: string;
  pathsInstance: InstanceType;
  onLoaded?: (id: string, impact: number) => void;
};

const PathsNodeSummary = React.memo((props: PathsNodeContentProps) => {
  const { categoryId, node, pathsInstance, onLoaded } = props;
  const t = useTranslations();
  const pathsInstanceId = pathsInstance.id;
  const activeGoal = useReactiveVar(activeGoalVar);

  // Only show the impact of this type of goal
  const actionImpactGoal = pathsInstance.goals.find(
    (goal) => goal.id === 'net_emissions/emission_scope:direct+negative'
  );

  // For Inventory nodes show all goals, Always show the active goal first
  const displayAllGoals = true;
  const displayGoals = displayAllGoals
    ? pathsInstance.goals
    : activeGoal
      ? [activeGoal]
      : undefined;
  displayGoals?.sort((a, b) => (a.id === activeGoal?.id ? -1 : 1));

  const { data, loading, error, networkStatus } = useQuery(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: { node: node, goal: actionImpactGoal?.id },
    notifyOnNetworkStatusChange: true,
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: pathsInstanceId }),
    },
  });

  const refetching = networkStatus === NetworkStatus.refetch;

  if (loading && !refetching) {
    return <PathsContentLoader />;
  }
  if (error) {
    captureException(error, { extra: { pathsInstanceId: pathsInstance.id } });
    return null;
  }

  if (data) {
    if (data.node.__typename === 'ActionNode') {
      return (
        <ActionNodeSummary
          categoryId={categoryId}
          node={data.node}
          onLoaded={onLoaded ? onLoaded : () => void 0}
          refetching={refetching}
          displayGoal={actionImpactGoal}
        />
      );
    } else if (data.node.__typename && displayGoals) {
      return (
        <InventoryNodeSummary
          categoryId={categoryId}
          node={data.node}
          onLoaded={onLoaded ? onLoaded : () => void 0}
          displayGoals={displayGoals}
          refetching={refetching}
        />
      );
    }
    return null;
  }
});

PathsNodeSummary.displayName = 'PathsNodeSummary';

export default PathsNodeSummary;
