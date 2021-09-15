import React, { useContext, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import _ from 'lodash';
import { Container, Spinner } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

import PlanContext from 'context/plan';

const Plot = dynamic(import('./Plot'));

const CategoryListSection = styled.div`
  background-color: ${(props) => props.theme.neutralLight};
  padding: ${(props) => props.theme.spaces.s100} 0;
`;

const TreemapContent = styled.div`
  text-align: center;
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

function makeTrace(cats) {
  const hasChildren = new Map();
  cats.forEach((cat) => {
    if (cat.parent) hasChildren.set(cat.parent.id, true);
  });

  const trace = {
    type: 'icicle',
    name: 'Utsläpp',
    labels: _.concat('<b>Total utsläpp</b>', cats.map((cat) => `<b>${cat.name}</b>`)),
    text: _.concat('50.921 Mt CO<sub>2</sub>e', cats.map((cat) => (cat.metadata[0]?.value ? `${cat.metadata[0]?.value} Mt` : '-'))),
    ids: _.concat('root', cats.map((cat) => cat.id)),
    parents: _.concat(null, cats.map((cat) => cat.parent?.id || 'root')),
    values: _.concat(10, cats.map((cat) => {
      if (hasChildren.get(cat.id)) return 0;
      return cat.metadata[0]?.value || 0;
    })),
    marker: {
      colors: _.concat('#B4B4B4', cats.map((cat) => cat.color || null)),
    },
    branchvalues: 'remainder',
    maxdepth: 2,
    textinfo: 'label+text',
    pathbar: {
      edgeshape: '/',
      thickness: 24,
      side: 'top',
    },
    tiling: {
      pad: 2,
    },
  };
  return trace;
}

const CategoryTreePlot = React.memo(({ data, onChangeSection }) => {
  const { planCategories } = data;

  // console.log(planCategories);
  const trace = makeTrace(planCategories);
  // console.log(trace);
  const layout = {
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 50, b: 20, l: 20, r: 20 },
    font: {
      family: "-apple-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', "
      + "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', "
      + 'sans-serif, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    },
    hovermode: false,
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  const handleSectionChange = (evt) => {
    const newCat = evt.frame.data[0].level;
    onChangeSection(newCat);
  };

  return (
    <Plot
      data={[trace]}
      layout={layout}
      config={config}
      useResizeHandler
      onAnimatingFrame={handleSectionChange}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

const CategoryTreeMap = React.memo(() => {
  const [activeCategory, setCategory] = useState(undefined);

  const onChangeSection = useCallback(
    (cat) => {
      console.log('onAnimatingFrame', cat);
      setCategory(cat);
      return false;
    }, [],
  );

  if (!process.browser) {
    return null;
  }
  const plan = useContext(PlanContext);
  const { data, loading, error } = useQuery(GET_CATEGORIES_FOR_TREEMAP, {
    variables: {
      plan: plan.identifier,
      categoryType: 'transition', // FIXME
    },
  });

  if (!data) return <Spinner size="sm" color="dark" className="mr-3" />;

  return (
    <CategoryListSection>
      <Container>
        <TreemapContent>
          <CategoryTreePlot
            data={data}
            onChangeSection={onChangeSection}
          />
          <button onClick={() => { setCategory(2); }}>{activeCategory}</button>
        </TreemapContent>
      </Container>
    </CategoryListSection>
  );
});
export default CategoryTreeMap;
