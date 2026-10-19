'use client';

import { type ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import Alert from '@mui/material/Alert';

import styled from '@emotion/styled';

import { NetworkStatus } from '@apollo/client';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import ContentLoader from 'react-content-loader';

import { transientOptions } from '@common/themes/styles/styled';

import type {
  GetOutcomeNodeContentQuery,
  OutcomeNodeFieldsFragment,
} from '@/common/__generated__/paths/graphql';
import { deploymentType } from '@/common/environment';
import { Card, CardBody } from '@/components/common/CardParts';
import ErrorMessage from '@/components/common/ErrorMessage';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import OutcomeCardSet from '@/components/paths/outcome/OutcomeCardSet';
import { usePaths } from '@/context/paths/paths';
import { GET_OUTCOME_NODE, getOutcomeNodeVariables } from '@/queries/paths/get-paths-page';
import { usePreloadedPathsQuery } from '@/utils/paths/hooks/usePathsApollo';
import {
  useActiveGoal,
  useActiveScenario,
  useYearRange,
} from '@/utils/paths/hooks/usePathsSettings';

const OutcomeBlockLoader = (props: React.ComponentProps<typeof ContentLoader>) => (
  <ContentLoader
    uniqueKey="outcome-block-loader"
    speed={2}
    width={1200}
    height={64}
    viewBox="0 0 1200 100"
    backgroundColor="#f4f4f4"
    foregroundColor="#c9c9c9"
    style={{ width: '100%' }}
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1200" height="100" />
  </ContentLoader>
);

const Background = styled.div`
  padding: 4rem 0 6rem;
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) =>
    readableColor(
      props.theme.brandDark,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
  min-height: 800px;
`;

const StyledTitle = styled.h1`
  margin-bottom: 2rem;
  font-size: ${(props) => props.theme.fontSizeLg};
  color: inherit;

  ${(props) => props.theme.breakpoints.up('md')} {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const StyledCard = styled(Card, transientOptions)<{ $disabled?: boolean }>`
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  h2 {
    margin-bottom: 2rem;
  }

  svg.what-this {
    width: 4rem;
    margin-bottom: 2rem;
    fill: ${(props) => props.theme.brandDark};
  }

  .card-body {
    opacity: ${({ $disabled = false }) => ($disabled ? 0.5 : 1)};
  }
`;

const findVisibleNodes: (
  allNodes: Map<string, OutcomenodeType>,
  lastNodeId: string,
  visibleNodes: OutcomenodeType[]
) => OutcomenodeType[] = (allNodes, lastNodeId: string, visibleNodes) => {
  // Using last active node Id, create an array of all visible nodes
  const lastNode = allNodes.get(lastNodeId)!;
  visibleNodes.unshift(lastNode);
  if (lastNode.outputNodes?.length) {
    if (!allNodes.has(lastNode.outputNodes[0].id)) return visibleNodes;
    findVisibleNodes(allNodes, lastNode.outputNodes[0].id, visibleNodes);
  }
  return visibleNodes;
};

export interface OutcomenodeType extends OutcomeNodeFieldsFragment {
  upstreamNodes: OutcomeNodeFieldsFragment[];
}

type PathsOutcomeBlockProps = {
  heading: string | null;
  helpText?: string | null;
  outcomeNodeId?: string | null;
};

function OutcomeBlockFrame(props: {
  heading: string | null;
  refetching?: boolean;
  children: ReactNode;
}) {
  const { heading, refetching = false, children } = props;
  return (
    <Background>
      <Container>
        <Row>
          <Col>
            <StyledTitle>{heading}</StyledTitle>
            <StyledCard $disabled={refetching}>
              <CardBody>{children}</CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Background>
  );
}

/**
 * The outcome node data may be preloaded on the server and streamed in, so
 * the block shows its loader until that data has arrived.
 */
export default function PathsOutcomeBlock(props: PathsOutcomeBlockProps) {
  return (
    <Suspense
      fallback={
        <OutcomeBlockFrame heading={props.heading}>
          <OutcomeBlockLoader />
        </OutcomeBlockFrame>
      }
    >
      <PathsOutcomeBlockContent {...props} />
    </Suspense>
  );
}

function PathsOutcomeBlockContent(props: PathsOutcomeBlockProps) {
  const { heading, outcomeNodeId } = props;
  const t = useTranslations();
  const pathsInstance = usePaths();
  const yearRange = useYearRange();
  const activeGoal = useActiveGoal();
  const activeScenario = useActiveScenario();
  const searchParams = useSearchParams();
  const queryNodeId = searchParams.get('node') ?? undefined;
  const [lastActiveNodeId, setLastActiveNodeId] = useState<string | undefined>(queryNodeId);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // No navigation: router.replace would re-render the page on the server
  useEffect(() => {
    if (queryNodeId === lastActiveNodeId) return;
    if (lastActiveNodeId) {
      window.history.replaceState(null, '', `?${createQueryString('node', lastActiveNodeId)}`);
    }
  }, [lastActiveNodeId, queryNodeId, createQueryString]);

  const variables = getOutcomeNodeVariables(outcomeNodeId, activeGoal?.id ?? null);
  const queryResp = usePreloadedPathsQuery<GetOutcomeNodeContentQuery>(GET_OUTCOME_NODE, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const { loading, error, previousData, networkStatus } = queryResp;
  const refetching = networkStatus === NetworkStatus.refetch;

  if (error) {
    captureException(error, {
      extra: { outcomeNodeId, pathsInstance: pathsInstance?.instance.id },
    });
  }
  const data = queryResp.data ?? previousData;

  // Memoised, so the card sets' memos hold
  const outcomeNode = data?.node as OutcomenodeType | undefined;
  const nodes = useMemo(() => {
    const allNodes = new Map<string, OutcomenodeType>();
    if (!outcomeNode) return { visible: [] as OutcomenodeType[], all: allNodes };
    (outcomeNode.upstreamNodes ?? []).forEach((node) =>
      allNodes.set(node.id, node as OutcomenodeType)
    );
    allNodes.set(outcomeNode.id, outcomeNode);
    const activeNodeId =
      lastActiveNodeId && allNodes.has(lastActiveNodeId) ? lastActiveNodeId : outcomeNode.id;
    // TODO: filtering out empty nodes, in some instances there are some -> investigate why
    return {
      visible: findVisibleNodes(allNodes, activeNodeId, []).filter((node) => node?.id),
      all: allNodes,
    };
  }, [outcomeNode, lastActiveNodeId]);

  return (
    <OutcomeBlockFrame heading={heading} refetching={refetching}>
      {deploymentType !== 'production' && !data?.node && !loading && (
        <Alert severity="warning">
          {t('error-no-outcome-node', { outcomeNodeId: outcomeNodeId ?? 'undefined' })}
        </Alert>
      )}
      {loading && !data && <OutcomeBlockLoader />}
      {error && <ErrorMessage message={error.message} />}
      {!error &&
        nodes.visible.map((node: OutcomenodeType, index: number) => (
          <OutcomeCardSet
            key={node.id}
            // Hacky solution to support different sub node titles depending on level
            subNodesTitle={index === 0 ? t('outcome-sub-nodes') : t('outcome-sub-nodes-secondary')}
            nodeMap={nodes.all}
            rootNode={node}
            startYear={yearRange[0]}
            endYear={yearRange[1]}
            activeScenario={activeScenario?.name || ''}
            parentColor="#666"
            activeNodeId={
              index < nodes.visible.length - 1 ? nodes.visible[index + 1].id : undefined
            }
            setLastActiveNodeId={setLastActiveNodeId}
            refetching={refetching}
          />
        ))}
    </OutcomeBlockFrame>
  );
}
