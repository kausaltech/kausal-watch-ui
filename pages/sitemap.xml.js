import React from 'react';
import fs from 'fs';
import { initializeApolloClient } from 'common/apollo';
import { gql } from '@apollo/client';

const Sitemap  = () => null;

const EXCLUDE_FROM_SITEMAP = [
  "_app.js",
  "_app.tsx",
  "_document.js",
  "_error.js",
  "index.js",
  "[...slug].js",
  "sitemap.xml.js",
];

function getStaticPages () {
  return fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return !EXCLUDE_FROM_SITEMAP.includes(staticPage);
    }).map(p => `/${p}`);
}

function getDynamicPages (data) {
  const impactGroups = data.plan.impactGroups.map(g => g.identifier).concat(['_others']);
  return [
    data.plan.pages.map(p => p.urlPath),
    data.plan.actions.map(p => `actions/${p.identifier}`),
    data.planIndicators.map(i => `indicators/${i.id}`),
    impactGroups.map(g => `dashboard?group=${g}`),
  ];
}

function urlTag(absoluteURL, priority) {
  return `
    <url>
      <loc>${absoluteURL}</loc>
      <changefreq>monthly</changefreq>
      <priority>${priority.toFixed(2)}</priority>
    </url>
  `;
}

function urlElement(baseURL, url, priority) {
  const u = new URL(url.replace(/\.js$/, ''), baseURL);
  return urlTag(u, priority);
}

async function getSiteData(planIdentifier) {
  const apollo = initializeApolloClient({planIdentifier});
  let plan;

  const QUERY = gql`
    query PlanSite($identifier: ID!) {
      plan(id: $identifier) {
        pages { urlPath },
        actions { identifier },
        impactGroups { identifier }
      }
      planIndicators(plan: $identifier) { id }
    }
  `;

  const { data, error } = await apollo.query({
    query: QUERY,
    variables: {
      identifier: planIdentifier,
    },
  });
  if (error) throw error;
  if (!data) {
    throw new Error(`No plan found for identifier '${planIdentifier}'`)
  }
  return data;
}


export const getServerSideProps = async ({ req, res }) => {
  const { planIdentifier, currentURL: { baseURL } } = req;

  const data = await getSiteData(planIdentifier, req);
  const pageGroups = getDynamicPages(data, baseURL);
  const staticPages = getStaticPages().filter((p) => {
    for (let g of pageGroups) {
      if (g.includes(p)) {
        return false;
      }
    }
    return true;
  });

  pageGroups.push(staticPages);
  const priorityStep = 1 / pageGroups.length;
  let urls = []
  let priority = 1;
  for (let group of pageGroups) {
    for (let url of group) {
      urls.push(urlElement(baseURL, url, priority));
    }
    priority = priority - priorityStep;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
         xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join(' ')}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
