import { type ComponentType, type PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { readableColor } from 'polished';

import { ActionListLink, StaticPageLink } from '@/common/links';
import BadgeTooltip from '@/components/common/BadgeTooltip';
import PopoverTip from '@/components/common/PopoverTip';
import { CATEGORY_TYPE_FRAGMENT } from '@/fragments/category-tags.fragment';
import { CATEGORY_TAG_FRAGMENT } from '@/fragments/category.fragment';

const Categories = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$compact ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeMd};
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => (props.$compact ? props.theme.fontSizeSm : props.theme.fontSizeBase)};
    margin-bottom: ${(props) =>
      props.$compact ? props.theme.spaces.s025 : props.theme.spaces.s100};
  }
`;

const CategoryGroup = styled.div<{ $compact?: boolean }>`
  margin-bottom: ${(props) => (props.$compact ? props.theme.spaces.s050 : props.theme.spaces.s200)};
`;

const CategoryBadges = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spaces.s050};
`;

type CategoryFilter = { typeIdentifier: string; categoryId: string };

type ListLinkComponentProps = PropsWithChildren<{
  categoryFilters: CategoryFilter[];
  filterGroupLabel?: string;
  filterValueLabel?: string;
}>;

type CategoryLinkMode = 'default' | 'indicator-list';

type CategoryLinkProps<ExtraCatProps = object, ExtraCTProps = object> = {
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
  categoryTypeHeader?: string | null;
  noLink?: boolean;
  ListLinkComponent?: ComponentType<ListLinkComponentProps>;
  linkMode?: CategoryLinkMode;
};

function CategoryLink(props: PropsWithChildren<CategoryLinkProps>) {
  const {
    category,
    categoryType,
    categoryTypeHeader,
    noLink = false,
    children,
    ListLinkComponent = ActionListLink,
    linkMode = 'default',
  } = props;

  if (noLink) return <>{children}</>;

  const filters = [
    {
      typeIdentifier: categoryType.identifier,
      categoryId: category.id,
    },
  ];

  if (linkMode === 'indicator-list') {
    return (
      <ListLinkComponent
        categoryFilters={filters}
        filterGroupLabel={categoryTypeHeader || categoryType.identifier}
        filterValueLabel={category.name}
      >
        {children}
      </ListLinkComponent>
    );
  }

  if (category.categoryPage) {
    return <StaticPageLink page={category.categoryPage}>{children}</StaticPageLink>;
  }

  return <ActionListLink categoryFilters={filters}>{children}</ActionListLink>;
}

const Identifier = styled.span`
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.graphColors.grey070,
      props.theme.graphColors.grey020
    )};
`;

type CategoryTagLike = {
  id: string;
  identifier: string;
  name: string;
  helpText: string;
  color: string;
  iconSvgUrl: string | null;
  iconImage?: { rendition?: { src: string } | null } | null;
  categoryPage?: { urlPath: string } | null;
  level?: { name: string } | null;
  parent?: CategoryTagLike | null;
  type: { id: string; hideCategoryIdentifiers: boolean };
};

type CategoryTypeLike = {
  id: string;
  identifier: string;
  name?: string;
  helpText?: string;
  levels?: Array<{ name: string }>;
};

type CategoryContentProps = {
  categories: CategoryTagLike[];
  categoryType: CategoryTypeLike;
  categoryTypeHeader?: string | null;
  noLink?: boolean;
  compact?: boolean;
  ListLinkComponent?: ComponentType<ListLinkComponentProps>;
  linkMode?: CategoryLinkMode;
};

export const CategoryContent = (props: CategoryContentProps) => {
  const {
    categories,
    categoryType,
    categoryTypeHeader,
    noLink = false,
    compact = false,
    ListLinkComponent,
    linkMode = 'default',
  } = props;

  return (
    <CategoryBadges>
      {categories.map((item) => (
        <li key={item.id}>
          <CategoryLink
            category={item}
            categoryType={categoryType}
            categoryTypeHeader={categoryTypeHeader}
            noLink={noLink}
            ListLinkComponent={ListLinkComponent}
            linkMode={linkMode}
          >
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
              size={compact ? 'sm' : 'md'}
              themeColor="neutralLight"
              color={item.color || item.parent?.color || undefined}
              isLink={!noLink}
              maxLines={item.name.length > 50 ? 2 : 4}
            />
          </CategoryLink>
        </li>
      ))}
    </CategoryBadges>
  );
};

type CategoryTagsProps = {
  categories: CategoryTagLike[];
  types: CategoryTypeLike[];
  noLink?: boolean;
  compact?: boolean;
  ListLinkComponent?: ComponentType<ListLinkComponentProps>;
  linkMode?: CategoryLinkMode;
};

function CategoryTags(props: CategoryTagsProps) {
  const {
    categories,
    types,
    noLink = false,
    compact = false,
    ListLinkComponent,
    linkMode = 'default',
  } = props;

  const groupElements = types.map((ct) => {
    const cats = categories.filter((cat) => cat.type.id === ct.id);
    if (!cats || !cats.length) return null;
    /* If category type seems to have levels,
        use the level name of the first selected categoory
        as section header */

    const categoryTypeHeader =
      (ct.levels?.length ?? 0) > 0 && cats[0].level?.name ? cats[0].level.name : ct.name;

    return (
      <CategoryGroup key={ct.id} $compact={compact}>
        {categoryTypeHeader || (ct.helpText && ct.id) ? (
          <h3>
            {categoryTypeHeader}
            {ct.helpText && <PopoverTip content={ct.helpText} identifier={ct.id} />}
          </h3>
        ) : null}
        <CategoryContent
          categories={cats}
          categoryType={ct}
          categoryTypeHeader={categoryTypeHeader}
          noLink={noLink}
          compact={compact}
          ListLinkComponent={ListLinkComponent}
          linkMode={linkMode}
        />
      </CategoryGroup>
    );
  });

  return <Categories $compact={compact}>{groupElements}</Categories>;
}

CategoryTags.fragments = {
  category: CATEGORY_TAG_FRAGMENT,
  categoryType: CATEGORY_TYPE_FRAGMENT,
};

export default CategoryTags;
