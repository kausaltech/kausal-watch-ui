import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import styled from 'styled-components';
import { lighten } from 'polished';
import { useTranslation } from 'common/i18n';
import { Link } from 'common/links';
import { slugify } from 'common/utils';

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
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      background-color: ${(props) => lighten(0.05, props.theme.neutralLight)} !important;
    }
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
        <Badge
          id={`org-${slugify(id)}`}
          size={size}
        >
          {name}
        </Badge>
      </a>
    </Link>
  );
}
function CategoryTags(props) {
  const { data } = props;
  const { t } = useTranslation();

  const categoryTypes = [...new Set(data.map((cat) => cat.type?.id))];
  // const categoryLevels = [...new Set(data.map((cat) => cat.level?.id))];
  const categoryGroups = categoryTypes.map((catType) => data.filter((cat) => cat.type.id === catType));

  /* TODO: a11y - this should probably be a list markup */
  return (
    <Categories>
      { categoryGroups
        && categoryGroups.map((catGroup, index) => (
          <div key={catGroup[0].id} className="mb-4">
            <h3>{catGroup[0].type.name}</h3>
            { catGroup.map((item) => (
              <Categorybadge
                t={t}
                key={item.id}
                id={item.id}
                name={item.name}
                url={item.categoryPage ? item.categoryPage.urlPath : `/actions?category_${item.type.identifier}=${item.id}`}
              />
            ))}
          </div>
        ))}
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
