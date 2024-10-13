'use client';
import { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import {
  GetPageQuery,
  GetPageQueryVariables,
} from '@/common/__generated__/paths/graphql';
import ContentLoader from '@/components/common/ContentLoader';
import OutcomeCardSet from '@/components/paths/outcome/OutcomeCardSet';
import { activeScenarioVar, yearRangeVar } from '@/context/paths/cache';
import { usePaths } from '@/context/paths/paths';
import GET_PAGE from '@/queries/paths/get-paths-page';
import { getHttpHeaders } from '@/utils/paths/paths.utils';
import { NetworkStatus, useQuery, useReactiveVar } from '@apollo/client';

const ErrorBackground = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  min-height: 800px;
`;

const StyledCard = styled(Card)<{ $disabled?: boolean }>`
  margin-top: 5rem;
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

const findVisibleNodes = (allNodes, lastNodeId: string, visibleNodes) => {
  // Using last active node Id, create an array of all visible nodes
  const lastNode = allNodes.get(lastNodeId)!;
  visibleNodes.unshift(lastNode);
  if (lastNode.outputNodes?.length) {
    if (!allNodes.has(lastNode.outputNodes[0].id)) return visibleNodes;
    findVisibleNodes(allNodes, lastNode.outputNodes[0].id, visibleNodes);
  }
  return visibleNodes;
};

export default function PathsOutcomeBlock() {
  //const { heading, helpText, outcomeNodeId } = props;
  const t = useTranslations();
  const pathsInstance = usePaths();
  const yearRange = useReactiveVar(yearRangeVar);
  const activeScenario = useReactiveVar(activeScenarioVar);
  const path = '';
  const [lastActiveNodeId, setLastActiveNodeId] = useState<string | undefined>(
    undefined
  );
  const queryResp = useQuery<GetPageQuery, GetPageQueryVariables>(GET_PAGE, {
    variables: { path, goal: null },
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

  const data = queryResp.data ?? previousData;

  if (loading && !refetching) {
    return <ContentLoader />;
  }

  if (data?.page) {
    const outcomeNode = data.page?.outcomeNode ?? null;
    const upstreamNodes = outcomeNode?.upstreamNodes ?? [];

    const allNodes = new Map(upstreamNodes.map((node) => [node.id, node]));

    allNodes.set(outcomeNode.id, outcomeNode);
    //setLastActiveNodeId(outcomeNode.id);
    const activeNodeId = outcomeNode.id;
    // TODO: filtering out empty nodes, in some instances there are some -> investigate why
    const visibleNodes = findVisibleNodes(allNodes, activeNodeId, []).filter(
      (node) => node?.id
    );

    //const outcomeType = visibleNodes[0].quantity;

    return (
      <ErrorBackground className="mb-5">
        <Container>
          <Row>
            <Col>
              <StyledCard $disabled={refetching}>
                <CardBody>
                  {visibleNodes.map((node, index) => (
                    <OutcomeCardSet
                      key={node.id}
                      // Hacky solution to support different sub node titles depending on level
                      subNodesTitle={
                        index === 0
                          ? t('outcome-sub-nodes')
                          : t('outcome-sub-nodes-secondary')
                      }
                      nodeMap={allNodes}
                      rootNode={node}
                      startYear={yearRange[0]}
                      endYear={yearRange[1]}
                      activeScenario={activeScenario?.name || ''}
                      parentColor="#666"
                      activeNodeId={
                        index < visibleNodes.length - 1
                          ? visibleNodes[index + 1].id
                          : undefined
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
      </ErrorBackground>
    );
  }
}
