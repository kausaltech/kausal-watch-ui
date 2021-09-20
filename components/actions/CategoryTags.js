import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { Link } from 'routes';
import { slugify } from 'common/utils';
import { Badge } from 'reactstrap';

const Categories = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

function Categorybadge(props) {
  const {
    id,
    name,
    abbreviation,
    url,
  } = props;
  const size = 'md';
  const { t } = useTranslation();

  return (
    <Link href={url} passHref>
      <Badge
        id={`org-${slugify(id)}`}
        size={size}
      >
        {name}
      </Badge>
    </Link>
  );
}

function CategoryTags(props) {
  const { data } = props;
  const { t } = useTranslation();

  return (
    <Categories>
      { data
        && data.map((item) => (
          item.type.identifier !== 'action'
          && (
          <Categorybadge
            t={t}
            key={item.id}
            id={item.id}
            name={item.name}
            url={item.categoryPage ? item.categoryPage.urlPath : `/actions?category_${item.type.identifier}=${item.id}`}
          />
          )
        ))}
    </Categories>
  );
}

Categorybadge.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string,
};

CategoryTags.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default CategoryTags;
