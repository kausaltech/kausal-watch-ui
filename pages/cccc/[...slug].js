import React from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import { request, gql } from 'graphql-request';

import Layout from 'components/layout';

const GET_CONTENT = gql`
query planPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    id
    title
    ... on CategoryPage {
      body {
        id
        __typename
      }
    }
  }
}`;

const endpoint = 'https://api.watch.kausal.tech/v1/graphql/';
const fetcher = (query, vars) => request(endpoint, query, vars);

function Page(props) {
  const initialData = props.data;
  const { variables } = props;
  const { data } = useSWR([GET_CONTENT, variables], fetcher, { initialData });

  const { title, body } = data?.planPage;

  return (
    <Layout>
      <h1>{title}</h1>
      {body.map((block) => (
        <div key={block.id}>
          <h2>{block.__typename}</h2>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const variables = {
    plan: 'tampere-ilmasto',
    path: `/${_.join(params.slug, '/')}`,
  };

  // Fetch data from external API
  const data = await fetcher(GET_CONTENT, variables);

  // Pass data to the page via props
  return { props: { data, variables } };
}

export default Page;
