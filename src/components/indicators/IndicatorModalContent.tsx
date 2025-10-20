import type { ApolloError } from '@apollo/client';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

import type {
  CategoryRecursiveFragmentFragment,
  CategoryTypeFragmentFragment,
  IndicatorDetailsQuery,
} from '@/common/__generated__/graphql';

import CategoryTags from '../actions/CategoryTags';
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

const PlansList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: block;
`;

const PlansListItem = styled.li`
  display: inline-block;
  margin-right: ${(props) => props.theme.spaces.s050};

  &:after {
    content: ', ';
    display: inline-block;
  }
  &:last-child:after {
    content: '';
    display: none;
  }
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
  const uniqueTypes = Array.from(
    new Map(indicator.categories.map((c) => [c.type.id, c.type])).values()
  );
  const indicatorCategories = indicator.categories.filter((cat) => uniqueTypes.includes(cat.type));
  const indicatorValues = indicator.values;
  const indicatorGoals = indicator.goals;

  const publishedPlans = indicator.plans.filter((plan) => plan.publishedAt);
  return (
    <ContentWrapper>
      {loading && (
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      )}
      <h3 id="indicator-modal-title">{indicatorName}</h3>
      {publishedPlans.length > 1 && (
        <PlansList>
          {publishedPlans.map((plan) => (
            <PlansListItem key={plan.id}>{plan.shortName || plan.name}</PlansListItem>
          ))}
        </PlansList>
      )}
      <IndicatorValueSummary
        timeResolution={indicator.timeResolution || ''}
        values={indicatorValues || []}
        goals={indicatorGoals || []}
        unit={indicator.unit || {}}
        desiredTrend={indicator.desiredTrend || undefined}
      />
      <CategoryTags
        categories={indicatorCategories as CategoryRecursiveFragmentFragment[]}
        types={uniqueTypes as CategoryTypeFragmentFragment[]}
        noLink={true}
        compact={true}
      />
      <div dangerouslySetInnerHTML={{ __html: indicatorDescription || '' }} />
    </ContentWrapper>
  );
};

export default IndicatorModalContent;
