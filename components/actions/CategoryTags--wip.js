import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

import styled from 'styled-components';
import { darken, lighten, readableColor } from 'polished';
import { useTranslation } from 'common/i18n';
import { Link } from 'common/links';
import { slugify } from 'common/utils';
import BadgeTooltip from 'components/common/BadgeTooltip';

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

function Categorybadge(props) {
  const {
    id,
    name,
    url,
  } = props;
  const size = 'md';
  return (
    <Link href={url}>
      <a>
        <StyledBadge
          id={`org-${slugify(id)}`}
          size={size}
        >
          {name}
        </StyledBadge>
      </a>
    </Link>
  );
}


export const CategoryContent = (props) => {

  const { category, t } = props;
  console.log("categorycontent", props);

  const getCategoryPath = (cat) => cat.categoryPage
  ? cat.categoryPage.urlPath
  : `/actions?cat-${cat.type?.identifier}=${cat.id}`;

  const categoryHasIcon = (cat) =>
  !!(cat.iconImage || cat.iconSvgUrl || cat.parent?.iconImage || cat.parent?.iconSvgUrl);

  return (
      <CategoryList>
        { category.map((item) =>
          <CategoryListItem key={item.id}>
              <BadgeTooltip
                t={t}
                id={item.id || item.identifier}
                tooltip={item.helpText}
                content={item.name}
                iconImage={item.iconImage?.rendition.src || item.parent?.iconImage?.rendition.src}
                iconSvg={item.iconSvgUrl || item.parent?.iconSvgUrl}
                size="md"
                url={getCategoryPath(item)}
              />
          </CategoryListItem>
          )}
        </CategoryList>)
};

function CategoryTags(props) {
  const { data } = props;
  const { t } = useTranslation();

  const categoryTypes = [...new Set(data.map((cat) => cat.type?.id))];
  // const categoryLevels = [...new Set(data.map((cat) => cat.level?.id))];
  const categoryGroups = categoryTypes.map((catType) => data.filter((cat) => cat.type.id === catType));

  console.log("categorytags", props);
  //const categryLink = {item.categoryPage ? item.categoryPage.urlPath : `/actions?cat-${item.type.identifier}=${item.id}`};
  /* TODO: a11y - this should probably be a list markup */
  /* If any of the categories in the group have an icon set, display all as iconed type  */
  return (
    <Categories>
      { categoryGroups
        && categoryGroups.map((catGroup, index) => (
          <div key={catGroup[0].id} className="mb-4">
          <h3>{catGroup[0].type.name}</h3>
          <CategoryContent category={catGroup} t={t}/>
        </div>))
      }
    </Categories>
  );
}
Categorybadge.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
};

CategoryTags.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CategoryTags;
