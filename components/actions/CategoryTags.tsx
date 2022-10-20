import React, { PropsWithChildren } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { darken, lighten, readableColor } from 'polished';
import { ActionListLink, Link, StaticPageLink } from 'common/links';
import BadgeTooltip from 'components/common/BadgeTooltip';
import {
  CategoryTagsCategoryFragment,
  CategoryTagsCategoryTypeFragment,
  CategoryTagsFragmentFragment } from 'common/__generated__/graphql';


const Categories = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }

  .badge {
    background-color: ${(props) => props.theme.neutralLight} !important;
    color: ${
    (props) => readableColor(props.theme.neutralLight, props.theme.themeColors.black, props.theme.themeColors.white)
    };

    &:hover {
      background-color: ${(props) => lighten(0.05, props.theme.neutralLight)} !important;
    }
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CategoryListItem = styled.li`
  margin-bottom: ${(props) => props.theme.spaces.s100};

  a {
    display: block;
  }

  &:hover {
    a {
      text-decoration: none;
    }
  }
`;

function CategoryLink(props: PropsWithChildren<CategoryBadgeProps>) {
  const { category, categoryType, children } = props;

  if (category.categoryPage) {
    return (
      <StaticPageLink page={category.categoryPage}>
        { children }
      </StaticPageLink>
    )
  } else {
    const filters = [{
      typeIdentifier: categoryType.identifier,
      categoryId: category.id,
    }];
    return (
      <ActionListLink categoryFilters={filters}>
        { children }
      </ActionListLink>
    )
  }

}

type CategoryContentProps<ExtraCatProps = {}, ExtraCTProps = {}> = {
  categories: [{
    id: string,
    name: string,
    categoryPage?: null | {
      urlPath: string,
    }
    helpText: string,
    iconsSvgUrl: string,
    iconImage?: {
      rendition?: {
        src: string,
      }
    }
    parent?: {
      iconsSvgUrl: string,
      iconImage?: {
        rendition?: {
          src: string,
        }
      }
    }
  }] & ExtraCatProps,
  categoryType: {
    identifier: string,
  } & ExtraCTProps,
}

export const CategoryContent = (props: CategoryContentProps) => {

  const { categories, categoryType } = props;
  console.log("categorycontent", props);

  const categoryHasIcon = (cat) =>
  !!(cat.iconImage || cat.iconSvgUrl || cat.parent?.iconImage || cat.parent?.iconSvgUrl);

  return (
      <CategoryList>
        { categories.map((item) =>
          <CategoryListItem key={item.id}>
            <CategoryLink category={item} categoryType={categoryType}>
              <BadgeTooltip
                id={item.id}
                tooltip={item.helpText}
                content={item.name}
                iconImage={item.iconImage?.rendition.src || item.parent?.iconImage?.rendition.src}
                iconSvg={item.iconSvgUrl || item.parent?.iconSvgUrl}
                size="md"
              />
            </CategoryLink>
          </CategoryListItem>
          )}
        </CategoryList>)
};

type CategoryTagsProps = {
  categories: CategoryTagsCategoryFragment[],
  types: CategoryTagsCategoryTypeFragment[],
}

function CategoryTags({ categories, types }: CategoryTagsProps) {
  const typeById = new Map(types.map(ct => [ct.id, ct]));

  /* TODO: a11y - this should probably be a list markup */
  /* If any of the categories in the group have an icon set, display all as iconed type  */
  const groupElements = types.map((ct) => {
    const cats = categories.filter(cat => cat.type.id === ct.id);
    if (!cats.length) return null; 
    const svgUrl = cats.map(cat => (cat.iconSvgUrl || cat.parent?.iconSvgUrl)).find(url => url);
    const iconImage = cats.map(cat => (cat.iconImage || cat.parent?.iconImage)).find(image => image);

    return (
      <div key={ct.id} className="mb-4">
        <h3>{ct.name}</h3>
        <CategoryContent
          categories={cats}
          categoryType={ct}
        />
      </div>
    );
  });
  return (
    <Categories>
      {groupElements}
    </Categories>
  );
}

const categoryFragment = gql`
fragment CategoryTagsCategory on Category {
  id
  identifier
  name
  leadParagraph
  color
  iconSvgUrl
  iconImage {
    rendition(size:"400x400", crop:false) {
      src
    }
  }
  type {
    id
  }
  level {
    id
    name
    namePlural
  }
  image {
    ...MultiUseImageFragment
  }
  categoryPage {
    title
    urlPath
  }
  parent {
    id
    identifier
    name
    image {
      ...MultiUseImageFragment
    }
    color
    iconSvgUrl
    iconImage {
      rendition(size:"400x400", crop:false) {
        src
      }
    }
    categoryPage {
        title
        urlPath
      }
   }
}
`;

const categoryTypeFragment = gql`
fragment CategoryTagsCategoryType on CategoryType {
  id
  name
  identifier
  hideCategoryIdentifiers
}
`;

CategoryTags.fragments = {
  category: categoryFragment,
  categoryType: categoryTypeFragment,
};

export default CategoryTags;
