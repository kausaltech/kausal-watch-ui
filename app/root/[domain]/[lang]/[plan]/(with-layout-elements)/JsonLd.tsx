'use client';

import { usePlan } from '@/context/plan';
import { getMetaTitles } from '@/utils/metadata';

type Props = {
  domain: string;
};

export function JsonLd({ domain }: Props) {
  const plan = usePlan();
  const { title } = getMetaTitles(plan);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: title,
    url: domain,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
