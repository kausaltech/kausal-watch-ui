import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'common/i18n';
import { OrganizationLink } from 'common/links';
import { slugify } from 'common/utils';
import BadgeTooltip from '../common/BadgeTooltip';

const Responsibles = styled.div`
  font-size: ${(props) => props.theme.fontSizeMd};
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

function ResponsibleBadge(props) {
  const {
    t,
    index,
    id,
    name,
    abbreviation,
  } = props;
  let size = 'md';
  let ariaLabel;

  if (index === 0) {
    size = 'lg';
    ariaLabel = `${t('responsible-party-main')}: ${abbreviation} ${name}`;
  } else {
    ariaLabel = `${abbreviation} ${name}`;
  }

  return (
    <OrganizationLink organizationId={ id }>
      <BadgeTooltip
        id={`org-${slugify(id)}`}
        name={name}
        ariaLabel={ariaLabel}
        abbreviation={abbreviation}
        size={size}
      />
    </OrganizationLink>
  );
}

function ResponsibleList(props) {
  const { t, data } = props;

  return (
    <Responsibles>
      <h3>{t('responsible-parties')}</h3>
      { data
        ? data.map((item, index) => (
          <ResponsibleBadge
            t={t}
            key={item.id}
            index={index}
            id={item.id}
            name={item.name}
            abbreviation={item.abbreviation}
          />
        ))
        : <h6>{t('responsible-parties-missing')}</h6> }
    </Responsibles>
  );
}

ResponsibleBadge.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string,
};

ResponsibleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('common')(ResponsibleList);
