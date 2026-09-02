import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import ContentLoader from '@common/components/ContentLoader';

import { aplans } from '@/common/api';
import IndicatorsHero from '@/components/indicators/IndicatorsHero';
import type {
  CytoGraphOwnProps,
  InsightEdge,
  InsightFilters,
  InsightNode,
} from '@/components/insight/CytoGraph';

const CytoGraph = dynamic<CytoGraphOwnProps>(() => import('@/components/insight/CytoGraph'));

type InsightPageContentProps = {
  planId: string;
  locale: string;
  filters: InsightFilters;
  router: { replace: (href: string) => void };
  testId?: string;
};

const InsightPageContent = ({
  planId,
  locale,
  filters,
  router,
  testId,
}: InsightPageContentProps) => {
  const [loading, setLoading] = useState(true);
  const [edges, setEdges] = useState<InsightEdge[]>([]);
  const [nodes, setNodes] = useState<InsightNode[]>([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        language: locale,
        plan: planId,
      };
      const resp = await aplans.get<{ edges: InsightEdge[]; nodes: InsightNode[] }>('insight', {
        params,
      });
      const { edges, nodes } = resp;

      setEdges(edges);
      setNodes(nodes);
      setLoading(false);
    };

    void fetchData();
  }, [locale, planId]);

  const handleFilterChange = (filters: InsightFilters) => {
    const { indicator } = filters;

    let queryParams = '';
    if (indicator) {
      queryParams = `?indicator=${indicator}`;
    }
    router.replace('/insight' + queryParams);
  };

  let content;

  const isServer = typeof window === 'undefined';
  if (!isServer) {
    if (loading) {
      content = <ContentLoader message={t('loading')} />;
    } else {
      content = (
        <CytoGraph
          edges={edges}
          nodes={nodes}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      );
    }
  }

  return (
    <>
      <IndicatorsHero testId={testId} />
      {content}
    </>
  );
};

export default InsightPageContent;
