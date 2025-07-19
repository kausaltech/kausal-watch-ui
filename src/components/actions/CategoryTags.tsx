import React, { PropsWithChildren } from 'react';

import { readableColor } from 'polished';
import styled from 'styled-components';

import {
  CategoryRecursiveFragmentFragment,
  CategoryTypeFragmentFragment,
} from '@/common/__generated__/graphql';
import { ActionListLink, StaticPageLink } from '@/common/links';
import BadgeTooltip from '@/components/common/BadgeTooltip';
import PopoverTip from '@/components/common/PopoverTip';
import { CATEGORY_TYPE_FRAGMENT } from '@/fragments/category-tags.fragment';
import { CATEGORY_FRAGMENT } from '@/fragments/category.fragment';

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
    id: string;
    name: string;
    categoryPage?: null | {
      urlPath: string;
    };
  } & ExtraCatProps;
  categoryType: {
    identifier: string;
  } & ExtraCTProps;
  noLink?: boolean;
};

function CategoryLink(props: PropsWithChildren<CategoryLinkProps>) {
  const { category, categoryType, noLink = false, children } = props;

  if (noLink) return <>{children}</>;

  if (category.categoryPage) {
    return (
      <StaticPageLink page={category.categoryPage}>
        <a>{children}</a>
      </StaticPageLink>
    );
  } else {
    const filters = [
      {
        typeIdentifier: categoryType.identifier,
        categoryId: category.id,
      },
    ];
    return (
      <ActionListLink categoryFilters={filters}>
        <a>{children}</a>
      </ActionListLink>
    );
  }
}

type CategoryContentProps = {
  categories: CategoryRecursiveFragmentFragment[];
  categoryType: CategoryTypeFragmentFragment;
  noLink?: boolean;
};

const Identifier = styled.span`
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.graphColors.grey070,
      props.theme.graphColors.grey020
    )};
`;

export const CategoryContent = (props: CategoryContentProps) => {
  const { categories, categoryType, noLink = false } = props;
  return (
    <CategoryList>
      {categories.map((item) => (
        <CategoryListItem key={item.id}>
          <CategoryLink category={item} categoryType={categoryType} noLink={noLink}>
            <BadgeTooltip
              id={item.id}
              tooltip={item.helpText}
              content={
                item.identifier && !item.type.hideCategoryIdentifiers ? (
                  <>
                    <Identifier>{item.identifier}.</Identifier> {item.name}
                  </>
                ) : (
                  item.name
                )
              }
              iconImage={item.iconImage?.rendition?.src || item.parent?.iconImage?.rendition?.src}
              iconSvg={item.iconSvgUrl || item.parent?.iconSvgUrl || undefined}
              size="md"
              color="neutralLight"
              isLink={!noLink}
              maxLines={item.name.length > 50 ? 2 : 4}
            />
          </CategoryLink>
        </CategoryListItem>
      ))}
    </CategoryList>
  );
};

type CategoryTagsProps = {
  categories: CategoryRecursiveFragmentFragment[];
  noLink?: boolean;
};

function CategoryTags(props: CategoryTagsProps) {
  const { categories, types, noLink = false } = props;
  const groupElements = types.map((ct) => {
    const cats = categories.filter((cat) => cat.type.id === ct.id);
    if (!cats.length) return null;
    /* If category type seems to have levels,
        use the level name of the first selected categoory
        as section header */
    const categoryTypeHeader =
      ct.levels.length > 0 && cats[0].level?.name ? cats[0].level.name : ct.name;

    return (
      <div key={ct.id} className="mb-4">
        {categoryTypeHeader || (ct.helpText && ct.id) ? (
          <h3>
            {categoryTypeHeader}
            {ct.helpText && <PopoverTip content={ct.helpText} identifier={ct.id} />}
          </h3>
        ) : null}
        <CategoryContent categories={cats} categoryType={ct} noLink={noLink} />
      </div>
    );
  });
  return <Categories>{groupElements}</Categories>;
}

CategoryTags.fragments = {
  category: CATEGORY_FRAGMENT,
  categoryType: CATEGORY_TYPE_FRAGMENT,
};

export default CategoryTags;
