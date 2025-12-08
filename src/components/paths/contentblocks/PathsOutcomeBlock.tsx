'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';
import { useTranslations } from 'next-intl';
import { readableColor } from 'polished';
import ContentLoader from 'react-content-loader';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import type {
  GetOutcomeNodeContentQuery,
  OutcomeNodeFieldsFragment,
} from '@/common/__generated__/paths/graphql';
import OutcomeCardSet from '@/components/paths/outcome/OutcomeCardSet';
import { activeGoalVar, activeScenarioVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import { GET_OUTCOME_NODE } from '@/queries/paths/get-paths-page';
import { getHttpHeaders } from '@/utils/paths/paths.utils';

const OutcomeBlockLoader = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={12}
    viewBox="0 0 600 12"
    backgroundColor="#f4f4f4"
    foregroundColor="#c9c9c9"
    style={{ width: '100%' }}
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="600" height="12" />
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

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    font-size: ${(props) => props.theme.fontSizeXl};
  }
`;

const StyledCard = styled(Card)<{ $disabled?: boolean }>`
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

export default function PathsOutcomeBlock(props: PathsOutcomeBlockProps) {
  const { heading, outcomeNodeId } = props;
  const t = useTranslations();
  const pathsInstance = usePaths();
  const yearRange = useReactiveVar(yearRangeVar);
  const activeGoal = useReactiveVar(activeGoalVar);
  const activeScenario = useReactiveVar(activeScenarioVar);
  //const path = '';
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    if (queryNodeId === lastActiveNodeId) return;
    if (lastActiveNodeId) {
      router.replace(pathname + '?' + createQueryString('node', lastActiveNodeId), {
        scroll: false,
      });
    }
  }, [lastActiveNodeId, queryNodeId, router, pathname, createQueryString]);

  // router.push(pathname + '?' + createQueryString('sort', 'asc'))
  const queryResp = useQuery<GetOutcomeNodeContentQuery>(GET_OUTCOME_NODE, {
    variables: { node: outcomeNodeId || 'net_emissions', goal: activeGoal?.id ?? null },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({
        instanceIdentifier: pathsInstance?.instance.id,
      }),
    },
  });

  const { loading, error, previousData, networkStatus } = queryResp;
  const refetching = networkStatus === NetworkStatus.refetch;

  if (error) return <p>Error : {error.message}</p>;
  const data = queryResp.data ?? previousData;

  const getVisibleNodes: (outcomeNode: OutcomenodeType) => {
    visible: OutcomenodeType[];
    all: Map<string, OutcomenodeType>;
  } = (outcomeNode: OutcomenodeType) => {
    if (!outcomeNode) return { visible: [], all: new Map() };
    const upstreamNodes = outcomeNode?.upstreamNodes ?? [];

    const allNodes: Map<string, OutcomenodeType> = new Map(
      upstreamNodes.map((node) => [node.id, node as OutcomenodeType])
    );

    allNodes.set(outcomeNode.id, outcomeNode);
    //setLastActiveNodeId(outcomeNode.id);
    const activeNodeId =
      lastActiveNodeId && allNodes.has(lastActiveNodeId) ? lastActiveNodeId : outcomeNode.id;
    // TODO: filtering out empty nodes, in some instances there are some -> investigate why
    return {
      visible: findVisibleNodes(allNodes, activeNodeId, []).filter((node) => node?.id),
      all: allNodes,
    };
  };

  const nodes = data?.node
    ? getVisibleNodes(data.node as OutcomenodeType)
    : { visible: [], all: new Map() };

  return (
    <Background>
      <Container>
        <Row>
          <Col>
            <StyledTitle>{heading}</StyledTitle>
            <StyledCard $disabled={refetching}>
              <CardBody>
                {loading && <OutcomeBlockLoader />}
                {nodes.visible.map((node: OutcomenodeType, index: number) => (
                  <OutcomeCardSet
                    key={node.id}
                    // Hacky solution to support different sub node titles depending on level
                    subNodesTitle={
                      index === 0 ? t('outcome-sub-nodes') : t('outcome-sub-nodes-secondary')
                    }
                    nodeMap={nodes.all}
                    rootNode={node}
                    startYear={yearRange[0]}
                    endYear={yearRange[1]}
                    activeScenario={activeScenario?.name || ''}
                    parentColor="#666"
                    activeNodeId={
                      index < nodes.visible.length - 1 ? nodes.visible[index + 1].id : undefined
                    }
                    lastActiveNodeId={lastActiveNodeId}
                    setLastActiveNodeId={setLastActiveNodeId}
                    refetching={refetching}
                  />
                ))}
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </Background>
  );
}
