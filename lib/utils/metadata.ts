import {
  GetContentPageQuery,
  GetPlanContextQuery,
} from '@/common/__generated__/graphql';

export function getMetaImage(page: GetContentPageQuery['planPage']) {
  switch (page?.__typename) {
    case 'StaticPage':
      return page.headerImage?.large?.src;
    case 'CategoryPage':
      return (
        page.category?.image?.large?.src ??
        page.category?.parent?.image?.large?.src
      );
    default:
      return undefined;
  }
}

export function getMetaDescription(page: GetContentPageQuery['planPage']) {
  switch (page?.__typename) {
    case 'StaticPage':
      return page.leadParagraph;
    case 'CategoryPage':
      return page.category?.leadParagraph;
    default:
      return undefined;
  }
}

export function getMetaTitles(plan: NonNullable<GetPlanContextQuery['plan']>) {
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
