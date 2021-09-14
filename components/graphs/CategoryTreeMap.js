import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { gql, useQuery } from '@apollo/client';

import PlanContext from 'context/plan';

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
    labels: cats.map((cat) => cat.name),
    ids: cats.map((cat) => cat.id),
    parents: cats.map((cat) => cat.parent?.id || null),
    values: cats.map((cat) => {
      if (hasChildren.get(cat.id)) return 0;
      return cat.metadata[0]?.value || 0;
    }),
    marker: {
      colors: cats.map((cat) => cat.color || null),
      line: {
        width: 2,
      },
    },
    branchvalues: 'remainder',
    maxdepth: 2,
  };
  return trace;
}

const CategoryTreeMap = () => {
  if (!process.browser) {
    return null;
  }
  const Plot = dynamic(import('./Plot'));
  const plan = useContext(PlanContext);
  const { data, loading, error } = useQuery(GET_CATEGORIES_FOR_TREEMAP, {
    variables: {
      plan: plan.identifier,
      categoryType: 'transition', // FIXME
    },
  });

  if (!data) return <div>Loading</div>;

  const { planCategories } = data;
  console.log(planCategories);
  const trace = makeTrace(planCategories);
  console.log(trace);
  const layout = {
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    margin: {"t": 20, "b": 20, "l": 20, "r": 20},
  };

  const out = <Plot data={[trace]} layout={layout} />;
  return out;
};

export default CategoryTreeMap;
