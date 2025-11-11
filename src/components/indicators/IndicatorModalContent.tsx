import type { ApolloError } from '@apollo/client';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

import type {
  CategoryRecursiveFragmentFragment,
  CategoryTypeFragmentFragment,
  IndicatorDetailsQuery,
  IndicatorListQuery,
} from '@/common/__generated__/graphql';

import CategoryTags from '../actions/CategoryTags';
import IndicatorValueSummary from './IndicatorValueSummary';
import IndicatorVisualisation from './IndicatorVisualisationNew';

const ContentLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1 1 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  min-height: 0;
`;

const ModalHeader = styled.div`
  flex: 0 0 auto;
  padding: ${({ theme }) => `${theme.spaces.s200} ${theme.spaces.s200} 0 ${theme.spaces.s200}`};
`;

const ModalScrollableContent = styled.div`
  flex: 1 1 0;
  overflow-y: auto;
  padding: ${({ theme }) => `0 ${theme.spaces.s200} ${theme.spaces.s200} ${theme.spaces.s200}`};
  min-height: 0;

  /* Implement scroll shadows */
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;

  background:
    /* Shadow Cover TOP */
    linear-gradient(white 30%, rgba(255, 255, 255, 0)) center top,
    /* Shadow Cover BOTTOM */ linear-gradient(rgba(255, 255, 255, 0), white 70%) center bottom,
    /* Shadow TOP */ linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0)) center top,
    /* Shadow BOTTOM */ linear-gradient(to top, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0)) center bottom;

  background-repeat: no-repeat;
  background-size:
    100% 40px,
    100% 40px,
    100% 14px,
    100% 14px;
  background-attachment: local, local, scroll, scroll;
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
  usableCategoryTypes: NonNullable<IndicatorListQuery['plan']>['categoryTypes'];
}

const IndicatorModalContent = ({
  indicator,
  loading,
  error,
  usableCategoryTypes,
}: IndicatorModalContentProps) => {
  if (loading && !indicator)
    return (
      <ContentWrapper>
        <ContentLoader>
          <Spinner />
        </ContentLoader>
      </ContentWrapper>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!indicator) return <div>No data</div>;

  // console.log('🪟 ---- indicator', indicator);
  const indicatorName = indicator.name;
  const indicatorDescription = indicator.description;
  const uniqueTypes = Array.from(
    new Map(indicator.categories.map((c) => [c.type.id, c.type])).values()
  );

  const indicatorCategories = indicator.categories
    .filter((cat) => uniqueTypes.includes(cat.type))
    .filter((cat) => usableCategoryTypes.some((type) => type.id === cat.type.id));
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
      <ModalHeader>
        <h3 id="indicator-modal-title">{indicatorName}</h3>
      </ModalHeader>
      <ModalScrollableContent>
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
        <div style={{ marginTop: '10px' }}>
          <CategoryTags
            categories={indicatorCategories as CategoryRecursiveFragmentFragment[]}
            types={uniqueTypes as CategoryTypeFragmentFragment[]}
            noLink={true}
            compact={true}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: indicatorDescription || '' }} />
        <IndicatorVisualisation indicatorId={indicator.id} />
      </ModalScrollableContent>
    </ContentWrapper>
  );
};

export default IndicatorModalContent;
