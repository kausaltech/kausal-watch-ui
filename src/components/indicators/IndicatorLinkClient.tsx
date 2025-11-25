'use client';

import React, { type ReactNode } from 'react';

import NextLink, { type LinkProps } from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';

import { disablePrefetch, getIndicatorLinkProps, prependPlanAndLocale } from '@/common/links';
import { usePlan } from '@/context/plan';

type LinkPropsWithoutHref = Omit<LinkProps, 'href'>;

export type IndicatorLinkClientProps = {
  id?: string | number;
  viewUrl?: string | null;
  children: ReactNode;
} & LinkPropsWithoutHref;

/**
 * Client component version of IndicatorLink that intercepts clicks
 * to open modal when plan.features.indicatorsOpenInModal is enabled
 */
export function IndicatorLinkClient({ id, viewUrl, children, ...other }: IndicatorLinkClientProps) {
  const plan = usePlan();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const openIndicatorsInModal = plan.features.indicatorsOpenInModal === true;

  // Build href similar to usePrependPlanAndLocale
  const basePath = getIndicatorLinkProps(id).href;
  let href: string;
  if (viewUrl) {
    href = `${viewUrl}${basePath}`;
  } else {
    href = prependPlanAndLocale(plan, basePath, locale);
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (openIndicatorsInModal && id) {
      e.preventDefault();

      // Update URL with indicator parameter
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('indicator', String(id));
      const query = `?${newSearchParams.toString()}`;
      router.replace(`${pathname}${query}`, { scroll: false });
    }
    // If modal is disabled, let NextLink handle navigation normally
  };

  return (
    <NextLink passHref {...disablePrefetch(other)} href={href} onClick={handleClick}>
      {children}
    </NextLink>
  );
}
