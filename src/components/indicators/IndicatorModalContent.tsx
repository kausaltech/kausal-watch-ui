import type { ApolloError } from '@apollo/client';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';

import IndicatorValueSummary from './IndicatorValueSummary';

const ContentLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 20px;
  width: 100%;
  flex: 1;
`;

interface IndicatorModalContentProps {
  indicator?: IndicatorDetailsQuery['indicator'] | null;
  loading: boolean;
  error: ApolloError | undefined;
}

const IndicatorModalContent = ({ indicator, loading, error }: IndicatorModalContentProps) => {
  if (loading && !indicator)
    return (
      <ContentLoader>
        <Spinner />
      </ContentLoader>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!indicator) return <div>No data</div>;

  console.log('🪟 ---- indicator', indicator);
  const indicatorName = indicator.name;
  const indicatorDescription = indicator.description;
  const indicatorCategories = indicator.categories;
  const indicatorValues = indicator.values;
  const indicatorGoals = indicator.goals;
  return (
    <ContentWrapper>
      {loading && (
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      )}
      <h3 id="indicator-modal-title">{indicatorName}</h3>
      <IndicatorValueSummary
        timeResolution={indicator.timeResolution || ''}
        values={indicatorValues || []}
        goals={indicatorGoals || []}
        unit={indicator.unit || {}}
        desiredTrend={indicator.desiredTrend || undefined}
      />
      <div dangerouslySetInnerHTML={{ __html: indicatorDescription || '' }} />
    </ContentWrapper>
  );
};

export default IndicatorModalContent;
