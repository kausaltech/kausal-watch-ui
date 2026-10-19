import React, { Suspense, useId, useMemo } from 'react';

import { useTheme } from '@emotion/react';

import { NetworkStatus } from '@apollo/client';
import { captureException } from '@sentry/nextjs';
import ContentLoader from 'react-content-loader';

import type {
  GetInstanceContextQuery,
  GetNodeContentQuery,
  GetNodeContentQueryVariables,
} from '@/common/__generated__/paths/graphql';
import { usePaths } from '@/context/paths/paths';
import { GET_NODE_CONTENT, getNodeContentVariables } from '@/queries/paths/get-paths-node';
import { usePreloadedPathsQuery } from '@/utils/paths/hooks/usePathsApollo';
import { useActiveGoal } from '@/utils/paths/hooks/usePathsSettings';

import ActionNodeSummary from './ActionNodeSummary';
import InventoryNodeSummary from './InventoryNodeSummary';

const PathsContentLoader = (props) => {
  const theme = useTheme();
  // Stable between server and browser, unlike the random default, so the
  // loader can be server-rendered; and unique per loader on the page
  const uniqueKey = useId();
  return (
    <ContentLoader
      uniqueKey={uniqueKey}
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

//   pathsInstance: GetInstanceContextQuery['instance'];
type PathsNodeContentProps = {
  categoryId: string;
  node: string;
  onLoaded?: (id: string, impact: number) => void;
  targetNodeId?: string | null;
};

/**
 * The node data may be preloaded on the server and streamed in. The loader
 * reserves the space for it meanwhile.
 */
const PathsNodeSummary = React.memo((props: PathsNodeContentProps) => (
  <Suspense fallback={<PathsContentLoader />}>
    <PathsNodeSummaryContent {...props} />
  </Suspense>
));

function PathsNodeSummaryContent(props: PathsNodeContentProps) {
  const { categoryId, node, onLoaded, targetNodeId } = props;
  const paths = usePaths();
  const pathsInstance = paths?.instance;
  const activeGoal = useActiveGoal();

  // Only show the impact of default goal if exists
  const actionImpactGoal = pathsInstance?.goals.find((goal) => goal.default === true);

  // Inventory nodes show every goal, the active one first. Sorted as a copy:
  // the goals belong to the Paths context, and summaries memoise on the array.
  const goals = pathsInstance?.goals;
  const activeGoalId = activeGoal?.id;
  const displayGoals = useMemo(() => {
    if (!goals) return undefined;
    const isActive = (goal: { id: string }) => (goal.id === activeGoalId ? 1 : 0);
    return [...goals].sort((a, b) => isActive(b) - isActive(a));
  }, [goals, activeGoalId]);

  const { data, loading, error, networkStatus } = usePreloadedPathsQuery<
    GetNodeContentQuery,
    GetNodeContentQueryVariables
  >(GET_NODE_CONTENT, {
    fetchPolicy: 'no-cache',
    variables: getNodeContentVariables(node, pathsInstance?.goals, targetNodeId),
    notifyOnNetworkStatusChange: true,
    skip: !pathsInstance,
  });

  if (!pathsInstance) {
    captureException(new Error('Paths instance not found in context'));
    return null;
  }

  const refetching = networkStatus === NetworkStatus.refetch;

  if (loading && !refetching) {
    return <PathsContentLoader />;
  }
  if (error) {
    captureException(error, { extra: { pathsInstanceId: pathsInstance.id } });
    return null;
  }

  if (!data?.node) {
    return null;
  }
  if (data?.node) {
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
          displayGoals={
            displayGoals as React.ComponentProps<typeof InventoryNodeSummary>['displayGoals']
          }
          refetching={refetching}
        />
      );
    }
    return null;
  }
}

PathsNodeSummary.displayName = 'PathsNodeSummary';

export default PathsNodeSummary;
