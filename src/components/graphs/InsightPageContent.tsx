import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { aplans } from '@/common/api';
import ContentLoader from '@/components/common/ContentLoader';
import IndicatorsHero from '@/components/indicators/IndicatorsHero';

const CytoGraph = dynamic<{
  edges: any[];
  nodes: any[];
  filters: any;
  onFilterChange: (filters: any) => void;
}>(() => import('@/components/insight/CytoGraph'));

type InsightPageContentProps = {
  planId: string;
  locale: string;
  filters: any;
  router: any;
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
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        language: locale,
        plan: planId,
      };
      const resp = await aplans.get('insight', { params });
      const { edges, nodes } = resp;

      setEdges(edges);
      setNodes(nodes);
      setLoading(false);
    };

    fetchData();
  }, [locale, planId]);

  const handleFilterChange = (filters) => {
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
      content = <ContentLoader />;
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
