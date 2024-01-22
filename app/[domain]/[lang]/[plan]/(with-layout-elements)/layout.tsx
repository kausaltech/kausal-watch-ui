'use client';

import { ReactNode } from 'react';

import Header from '@/components/HeaderComponent';
import Footer from '@/components/Footer';
import { usePlan } from '@/context/plan';
import { StyledMain } from './StyledMain';
import { getMetaTitles } from '@/utils/metadata';

type Props = {
  params: { domain: string };
  children: ReactNode;
};

/**
 * Route group to support adding a header, footer and other
 * layout elements that shouldn't be applied to embeds.
 */
export default function Layout({ children, params }: Props) {
  const plan = usePlan();
  const { navigationTitle, title } = getMetaTitles(plan);

  const jsonLd = `{
    "@context" : "https://schema.org",
    "@type" : "WebSite",
    "name" : "${title}",
    "url" : "${params.domain}"
  }`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header siteTitle={navigationTitle} />
      <StyledMain id="main">{children}</StyledMain>
      <Footer siteTitle={navigationTitle} />{' '}
    </>
  );
}
