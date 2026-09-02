import type { ContentPageQuery, PlanContextQuery } from '@/common/__generated__/graphql';

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
