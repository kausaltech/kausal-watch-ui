import type { ApolloError } from '@apollo/client';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

import type { IndicatorDetailsQuery } from '@/common/__generated__/graphql';

interface IndicatorModalContentProps {
  indicator?: IndicatorDetailsQuery['indicator'] | null;
  loading: boolean;
  error: ApolloError | undefined;
}

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

const IndicatorModalContent = ({ indicator, loading, error }: IndicatorModalContentProps) => {
  if (loading && !indicator) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!indicator) return <div>No data</div>;

  const indicatorName = indicator.name;
  const indicatorDescription = indicator.description;
  const indicatorCategories = indicator.categories;
  const indicatorValues = indicator.values;
  const indicatorGoals = indicator.goals;
  return (
    <div>
      {loading && (
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      )}
      <h5>{indicatorName}</h5>
    </div>
  );
};

export default IndicatorModalContent;
