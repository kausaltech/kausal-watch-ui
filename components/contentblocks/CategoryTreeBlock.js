import React, { useContext, useState, useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import ContentLoader from 'components/common/ContentLoader';
import { gql, useQuery } from '@apollo/client';
import CategoryTreeMap from 'components/graphs/CategoryTreeMap';
import CategoryCardContent from 'components/common/CategoryCardContent';

import PlanContext from 'context/plan';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s100};

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s100} 0;
  }
`;

const TreemapContent = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  text-align: center;
`;

const CategoryCard = styled.div`
  position: relative;
  z-index: 199;
  background-color: white;
  padding: 1rem;
  margin: 1rem 3px 3px 3px;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.5));
  border-left: .5rem solid ${(props) => props.color};
  border-radius: .5rem;

  &::after {
    content: '';
    position: absolute;
    right: 75%;
    z-index: 200;
    top: -1.25rem;
    width: 0;
    height: 0;
    border-top: 0;
    border-left: 1.25rem solid transparent;
    border-right: 1.25rem solid transparent;
    border-bottom: 1.25rem solid white;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    margin: 2rem 1rem 3px 0;
    height: calc(100% - 2rem);

    &::after {
    right: -1.5rem;
    top: 33%;
    border-top: 1.5rem solid transparent;
    border-bottom: 1.5rem solid transparent;
    border-left: 1.5rem solid white;
    border-right: 0;
  }
  }
`;

const CategoryTreeLayout = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    flex-direction: row;
  }
`;

const CategoryCardColumn = styled.div`
  flex: 0 0 50%;

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    flex: 0 0 33%;
  }
`;

const CategoryVizColumn = styled.div`
  flex: 0 0 50%;

  @media (min-width: ${(props) => props.theme.breakpointLg}) {
    flex: 0 0 66%;
  }
`;
const GET_CATEGORIES_FOR_TREEMAP = gql`
query GetCategoriesForTreeMap($plan: ID!, $categoryType: ID!) {
  planCategories(plan: $plan, categoryType: $categoryType) {
    id
    name
    color
    parent {
      id
    }
    metadata(id: "impact") {
      ...on CategoryMetadataNumericValue {
        value
      }
    }
  }
}
`;

const CategoryTreeSection = (props) => {
  const { sections } = props;
  const rootSection = {
    id: 'root',
    name: 'Total utsläpp',
    color: '#999999',
    parent: null,
    metadata: [
      {
        value: 50.921,
      },
    ],
  };

  const [activeCategory, setCategory] = useState(rootSection);

  // useCallback, so function prop does not cause graph re-rendering
  const onChangeSection = useCallback(
    (cat) => {
      const allSections = _.concat(rootSection, sections);
      const newCat = allSections.find((sect) => sect.id === cat);
      setCategory(newCat);
      return false;
    }, [],
  );

  // console.log(sections);

  return (
    <CategoryListSection>
      <Container fluid>
        <CategoryTreeLayout>
          <CategoryCardColumn>
            <CategoryCard color={activeCategory.color}>
              <CategoryCardContent category={activeCategory} />
            </CategoryCard>
          </CategoryCardColumn>
          <CategoryVizColumn>
            <TreemapContent>
              <CategoryTreeMap
                data={sections}
                onChangeSection={onChangeSection}
              />
            </TreemapContent>
          </CategoryVizColumn>
        </CategoryTreeLayout>

      </Container>
    </CategoryListSection>
  );
};

const CategoryTreeBlock = () => {
  const plan = useContext(PlanContext);
  const { data, loading, error } = useQuery(GET_CATEGORIES_FOR_TREEMAP, {
    variables: {
      plan: plan.identifier,
      categoryType: 'transition', // FIXME
    },
  });

  if (!data) return <ContentLoader />;

  return (
    <CategoryTreeSection sections={data?.planCategories} />
  );
};

export default CategoryTreeBlock;
