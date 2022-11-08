import React, { PropsWithChildren } from 'react';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import { ActionListLink, StaticPageLink } from 'common/links';
import BadgeTooltip from 'components/common/BadgeTooltip';
import PopoverTip from 'components/common/PopoverTip';
import {
  CategoryTagsCategoryFragment,
  CategoryTagsCategoryTypeFragment,
 } from 'common/__generated__/graphql';


const Categories = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
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

type CategoryLinkProps<ExtraCatProps = {}, ExtraCTProps = {}> = {
  category: {
    id: string,
    name: string,
    categoryPage?: null | {
      urlPath: string,
    }
  } & ExtraCatProps,
  categoryType: {
    identifier: string,
  } & ExtraCTProps,
  noLink?: boolean,
}

function CategoryLink(props: PropsWithChildren<CategoryLinkProps>) {
  const { category, categoryType, noLink = false, children } = props;

  if (noLink) return <>{children}</>;

  if (category.categoryPage) {
    return (
      <StaticPageLink page={category.categoryPage}>
        <a>{ children }</a>
      </StaticPageLink>
    )
  } else {
    const filters = [{
      typeIdentifier: categoryType.identifier,
      categoryId: category.id,
    }];
    return (
      <ActionListLink categoryFilters={filters}>
        <a>{ children }</a>
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
    helpText?: string,
    iconSvgUrl?: string,
    iconImage?: {
      rendition?: {
        src: string,
      }
    }
    parent?: {
      iconSvgUrl?: string,
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
  noLink?: boolean,
}

export const CategoryContent = (props: CategoryContentProps) => {
  const { categories, categoryType, noLink=false } = props;
  return (
      <CategoryList>
        { categories.map((item) =>
          <CategoryListItem key={item.id}>
            <CategoryLink
              category={item}
              categoryType={categoryType}
              noLink={noLink}
            >
              <BadgeTooltip
                id={item.id}
                tooltip={item.helpText}
                content={item.name}
                iconImage={item.iconImage?.rendition.src || item.parent?.iconImage?.rendition.src}
                iconSvg={item.iconSvgUrl || item.parent?.iconSvgUrl}
                size="md"
                color="neutralLight"
                isLink={!noLink}
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

function CategoryTags(props: CategoryTagsProps) {
  const { categories, types } = props;
  const typeById = new Map(types.map(ct => [ct.id, ct]));

  const groupElements = types.map((ct) => {
    const cats = categories.filter(cat => cat.type.id === ct.id);
    if (!cats.length) return null; 

    return (
      <div key={ct.id} className="mb-4">
        <h3>
          {ct.name}
          {ct.helpText && (
            <PopoverTip
              content={ct.helpText}
              identifier={ct.id}
            />
          )}
        </h3>
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
  helpText
  iconImage {
    rendition(size:"400x400", crop:false) {
      src
    }
  }
  type {
    id
    identifier
    hideCategoryIdentifiers
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
  helpText
  hideCategoryIdentifiers
}
`;

CategoryTags.fragments = {
  category: categoryFragment,
  categoryType: categoryTypeFragment,
};

export default CategoryTags;
