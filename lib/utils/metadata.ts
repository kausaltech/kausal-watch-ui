import { GetContentPageQuery } from '@/common/__generated__/graphql';

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
