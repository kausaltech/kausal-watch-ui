'use client';

import { Suspense } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import styled from '@emotion/styled';

import { NetworkStatus } from '@apollo/client';
import { captureException } from '@sentry/nextjs';
import { useTranslations } from 'next-intl';

import ContentLoader from '@common/components/ContentLoader';
import DimensionalNodeVisualisation from '@common/components/paths/DimensionalNodeVisualisation';
import { transientOptions } from '@common/themes/styles/styled';

import type {
  GetNodePageQuery,
  GetNodePageQueryVariables,
} from '@/common/__generated__/paths/graphql';
import ErrorMessage from '@/components/common/ErrorMessage';
import RichText from '@/components/common/RichText';
import { Container } from '@/components/common/layout/LayoutGrid';
import NodeLinks from '@/components/paths/node/NodeLinks';
import { usePaths } from '@/context/paths/paths';
import { GET_NODE_PAGE, getNodePageVariables } from '@/queries/paths/get-paths-node-page';
import { usePreloadedPathsQuery } from '@/utils/paths/hooks/usePathsApollo';
import { useYearRange } from '@/utils/paths/hooks/usePathsSettings';

const HeaderSection = styled('div', transientOptions)<{ $color?: string | null }>`
  padding: ${({ theme }) => theme.spaces.s200} 0;
  background-color: ${({ $color, theme }) => $color || theme.graphColors.grey070};
`;

const HeaderCard = styled('div', transientOptions)<{ $refetching: boolean }>`
  padding: ${({ theme }) => theme.spaces.s200};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  background-color: ${({ theme }) => theme.themeColors.white};
  opacity: ${({ $refetching }) => ($refetching ? 0.5 : 1)};
  transition: opacity 0.5s ease;

  h1 {
    margin-bottom: ${({ theme }) => theme.spaces.s150};
    font-size: ${({ theme }) => theme.fontSizeXl};
    color: ${({ theme }) => theme.themeColors.dark};
  }
`;

const ShortDescription = styled.div`
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spaces.s100};
`;

const GraphWrapper = styled.div`
  position: relative;
  margin-top: ${({ theme }) => theme.spaces.s100};
  padding: ${({ theme }) => theme.spaces.s150};
  border-radius: ${({ theme }) => theme.cardBorderRadius};
  background-color: ${({ theme }) => theme.cardBackground.secondary};
`;

const BodySection = styled.div`
  margin-top: ${({ theme }) => theme.spaces.s200};
`;

type Props = {
  nodeId: string;
};

/**
 * The page of a node of the plan's Paths model. Its data is preloaded on the
 * server and streamed in, so the loader shows until it has arrived.
 */
export default function PathsNodePage(props: Props) {
  const t = useTranslations();
  return (
    <Suspense fallback={<ContentLoader initiallyVisible fullPage message={t('loading')} />}>
      <PathsNodePageContent {...props} />
    </Suspense>
  );
}

function PathsNodePageContent({ nodeId }: Props) {
  const t = useTranslations();
  const paths = usePaths();
  const yearRange = useYearRange();

  const { data, previousData, loading, error, networkStatus } = usePreloadedPathsQuery<
    GetNodePageQuery,
    GetNodePageQueryVariables
  >(GET_NODE_PAGE, {
    variables: getNodePageVariables(nodeId),
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });
  const refetching = networkStatus === NetworkStatus.refetch;
  const node = (data ?? previousData)?.node;

  if (!paths || !yearRange) return null;
  if (loading && !node) {
    return <ContentLoader initiallyVisible fullPage message={t('loading')} />;
  }
  if (!node) {
    if (error) {
      captureException(error, { extra: { nodeId, pathsInstance: paths.instance.id } });
    }
    return (
      <Container>
        <ErrorMessage message={t('error-loading-data')} />
      </Container>
    );
  }

  const { instance } = paths;
  const [startYear, endYear] = yearRange;

  return (
    <>
      <HeaderSection $color={node.color}>
        <Container>
          <HeaderCard $refetching={refetching}>
            {node.__typename === 'ActionNode' && (
              <Typography variant="overline" component="p">
                {t('action')}
              </Typography>
            )}
            <h1>{node.name}</h1>
            {node.shortDescription && (
              <ShortDescription>
                <RichText html={node.shortDescription} />
              </ShortDescription>
            )}
            {node.metricDim && (
              <GraphWrapper>
                <DimensionalNodeVisualisation
                  key={node.id}
                  title={node.name}
                  metric={node.metricDim}
                  startYear={startYear}
                  endYear={endYear}
                  color={node.color}
                  baselineForecast={node.metric?.baselineForecastValues ?? undefined}
                  instance={{
                    referenceYear: instance.referenceYear,
                    minimumHistoricalYear: instance.minimumHistoricalYear,
                    features: instance.features,
                  }}
                  site={null}
                  t={t}
                />
              </GraphWrapper>
            )}
          </HeaderCard>
        </Container>
      </HeaderSection>
      <Container>
        {node.description && (
          <BodySection>
            <Card>
              <CardContent>
                <RichText html={node.description} />
              </CardContent>
            </Card>
          </BodySection>
        )}
        <NodeLinks inputNodes={node.inputNodes} outputNodes={node.outputNodes} />
      </Container>
    </>
  );
}
