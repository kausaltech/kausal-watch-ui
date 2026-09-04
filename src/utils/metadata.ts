import type { Metadata } from 'next';

import type { ContentPageQuery, PlanContextQuery } from '@/common/__generated__/graphql';

/**
 * The `robots` metadata for a plan, for spreading into a `Metadata` object.
 *
 * Next.js merges a segment's metadata into its parent's per own enumerable
 * key, so `robots: undefined` is not the same as leaving `robots` out: the key
 * is present and overwrites whatever a parent layout resolved. Returning an
 * empty object instead keeps an inherited directive intact, such as the
 * `noindex` that non-production deployments set for every page.
 */
export function getRobotsMetadata(hideFromSearchEngines: boolean): Pick<Metadata, 'robots'> {
  if (!hideFromSearchEngines) {
    return {};
  }

  return { robots: { index: false, follow: false } };
}

export function getMetaImage(page: ContentPageQuery['planPage']) {
  switch (page?.__typename) {
    case 'StaticPage':
      return page.headerImage?.social?.src ?? page.headerImage?.fullMedium?.src;
    case 'CategoryPage':
      return (
        page.category?.image?.social?.src ??
        page.category?.image?.fullMedium?.src ??
        page.category?.parent?.image?.social?.src ??
        page.category?.parent?.image?.fullMedium?.src
      );
    default:
      return undefined;
  }
}

export function getMetaDescription(page: ContentPageQuery['planPage']) {
  switch (page?.__typename) {
    case 'StaticPage':
      return page.leadParagraph;
    case 'CategoryPage':
      return page.category?.leadParagraph;
    default:
      return undefined;
  }
}

export function getMetaTitles(plan: NonNullable<PlanContextQuery['plan']>) {
  if (plan.parent) {
    return {
      title: plan.parent.name,
      navigationTitle: plan.parent.generalContent.siteTitle || plan.parent.name,
    };
  }

  return {
    title: plan.generalContent.siteTitle || plan.name,
    navigationTitle: plan.generalContent.siteTitle || plan.name,
  };
}
