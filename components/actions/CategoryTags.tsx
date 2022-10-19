import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';
import { Badge, NavItem } from 'reactstrap';
import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import { darken, lighten, readableColor } from 'polished';
import { useTranslation } from 'common/i18n';
import { ActionListLink, Link, StaticPageLink } from 'common/links';
import { slugify } from 'common/utils';
import { gql } from '@apollo/client';
import { CategoryTagsCategoryFragment, CategoryTagsCategoryTypeFragment, CategoryTagsFragmentFragment } from 'common/__generated__/graphql';

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

const CatIconList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const CatIconListItem = styled.li`
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

const IconBadge = styled.div`
  display: flex;
  align-items: center;
  max-width: 320px;
  background-color: ${(props) => props.theme.neutralLight} !important;
  border-radius: ${(props) => props.theme.badgeBorderRadius};

  &:hover {
    background-color: ${(props) => darken(0.05, props.theme.neutralLight)} !important;
  }
`;

const IconImage = styled.div<{imageSrc?: string}>`
  display: block;
  text-align: center;
  height: ${(props) => props.imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  flex: 0 0 ${(props) => props.imageSrc ? props.theme.spaces.s600 : props.theme.spaces.s300};
  margin-right: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  background-image: url(${(props) => props.imageSrc || 'none'});
  background-size: cover;
  background-position: center center;
`;

const IconSvg = styled(SVG)`
  height: ${(props) => props.theme.spaces.s200};
  margin: ${(props) => props.theme.spaces.s050};
  fill: ${(props) => props.theme.brandDark};
`;

const IconName = styled.div`
  padding: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeBase};
  line-height: ${(props) => props.theme.lineHeightSm};
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: black;
`;

const StyledBadge = styled(Badge)`
  background-color: ${(props) => props.theme.badgeBackground} !important;
  color: ${(props) => props.theme.badgeColor};
  border-radius: ${(props) => props.theme.badgeBorderRadius};
  padding: ${(props) => props.theme.badgePaddingY} ${(props) => props.theme.badgePaddingX};
  font-weight: ${(props) => props.theme.badgeFontWeight};
  margin-bottom: ${(props) => props.theme.spaces.s050};
  max-width: 100%;
  word-break: break-all;
  word-break: break-word;
  hyphens: manual;
  white-space: normal;
  text-align: left;

  &.bg-secondary:hover {
    background-color:  ${(props) => darken(0.05, props.theme.neutralLight)} !important;
  }
`;

type CategoryBadgeProps<ExtraCatProps = {}, ExtraCTProps = {}> = {
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
}

function CategoryLink(props: PropsWithChildren<CategoryBadgeProps>) {
  const { category, categoryType, children } = props;

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

function CategoryBadge(props: CategoryBadgeProps) {
  const {
    category, categoryType
  } = props;
  const size = 'md';

  return (
    <CategoryLink category={category} categoryType={categoryType}>
      <StyledBadge size={size}>
        {category.name}
      </StyledBadge>
    </CategoryLink>
  )
}

type CategoryIconProps = CategoryBadgeProps & {
  iconImage: string|undefined|null,
  iconSvg: string|undefined|null,
}
function CategoryIcon(props: CategoryIconProps) {
  const {
    category, categoryType, iconImage, iconSvg,
  } = props;

  return (
    <CatIconListItem>
      <CategoryLink category={category} categoryType={categoryType}>
        <IconBadge>
          {iconSvg
            ? <IconImage><IconSvg src={iconSvg} preserveAspectRatio="xMinYMid meet" /></IconImage>
            : <IconImage imageSrc={iconImage} />}
          <IconName>{category.name}</IconName>
        </IconBadge>
      </CategoryLink>
    </CatIconListItem>
  );
}

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

    if (svgUrl || iconImage) {
      return (
        <div key={ct.identifier} className="mb-4">
          <h3>{ct.name}</h3>
          <CatIconList>
            { cats.map((cat) => (
                <CategoryIcon
                  key={cat.id}
                  category={cat}
                  categoryType={ct}
                  iconImage={iconImage?.rendition?.src}
                  iconSvg={svgUrl}
                />
              ))}
          </CatIconList>
        </div>
      );
    }
    return (
      <div key={ct.id} className="mb-4">
        <h3>{ct.name}</h3>
        { cats.map((cat) => (
          <CategoryBadge
            key={cat.id}
            category={cat}
            categoryType={ct}
        />
        ))}
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
