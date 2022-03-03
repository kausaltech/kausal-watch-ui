import React from 'react';
import fs from 'fs';

const Sitemap  = () => null;

const EXCLUDE_FROM_SITEMAP = [
  "_app.js",
  "_app.tsx",
  "_document.js",
  "_error.js",
  "[...slug].js",
  "sitemap.xml.js",
];

function getStaticPages () {
  return fs
    .readdirSync('pages')
    .filter((staticPage) => {
      return !EXCLUDE_FROM_SITEMAP.includes(staticPage);
    });
}

function staticUrlElement(baseURL, url) {
  const path = url.replace(/\.js$/, '');
  return `
    <url>
      <loc>${baseURL}/${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>
  `;
}


export const getServerSideProps = ({ req, res }) => {
  const { baseURL } = req.currentURL;
  const staticPages = getStaticPages()
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(url => staticUrlElement(baseURL, url))}
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
