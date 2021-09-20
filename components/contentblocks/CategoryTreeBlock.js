import React, { useContext, useState, useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import ContentLoader from 'components/common/ContentLoader';
import { gql, useQuery } from '@apollo/client';
import CategoryTreeMap from 'components/graphs/CategoryTreeMap';
import CategoryCardContent from 'components/common/CategoryCardContent';

import PlanContext from 'context/plan';
import CategoryActionList from 'components/actions/CategoryActionList';

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s100};

  h2 {
    text-align: center;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    padding: ${(props) => props.theme.spaces.s400} 0;
  }
`;

const TreemapContent = styled.div`
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

// TODO: clean out unecessary fields. Fetching a lot for now

const GET_CATEGORIES_FOR_TREEMAP = gql`
query GetCategoriesForTreeMap($plan: ID!, $categoryType: ID!) {
  planCategories(plan: $plan, categoryType: $categoryType) {
    id
    name
    shortDescription
    image {
      id
      title
      imageCredit
      altText
      rendition(size:"600x300") {
        width
        height
        src
        alt
      }
    }
    categoryPage {
      id
      title
      path
      slug
      url
      urlPath
      depth
      contentType
      body {
        ... on RichTextBlock {
          value
        }
      }
    }
    color
    parent {
      id
    }
    level {
      id
      name
      namePlural
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
  // console.log(sections);
  const rootSection = sections.find((sect) => sect.parent === null);
  // console.log(rootSection);
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

  return (
    <CategoryListSection>
      <Container>
        <h2>Utsläpp</h2>
        <CategoryTreeLayout>
          <CategoryCardColumn>
            <CategoryCard color={activeCategory.color}>
              <CategoryCardContent
                category={activeCategory}
                totalEmissions="50.921"
                key={activeCategory.id}
              />
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
        <CategoryActionList
          categoryId={activeCategory.id === 'root' ? 0 : activeCategory.id}
          categories={sections}
        />
      </Container>
    </CategoryListSection>
  );
};

const CategoryTreeBlock = () => {
  const plan = useContext(PlanContext);
  if (!process.browser) {
    return null;
  }

  const { data, loading, error } = useQuery(GET_CATEGORIES_FOR_TREEMAP, {
    variables: {
      plan: plan.identifier,
      categoryType: 'transition', // FIXME
    },
  });

  if (!data) return <ContentLoader />;

  const findFirstAncestorColor = (id) => {
    const currentCat = data?.planCategories.find((cat) => cat.id === id);
    if (currentCat.color === null) return findFirstAncestorColor(currentCat.parent?.id);
    return currentCat.color;
  };

  const augmentedCategories = data?.planCategories.map((cat) => ({
    ...cat,
    color: findFirstAncestorColor(cat.id),
  }));

  console.log('con color', augmentedCategories);
  return (
    <CategoryTreeSection sections={augmentedCategories} />
  );
};

export default CategoryTreeBlock;
