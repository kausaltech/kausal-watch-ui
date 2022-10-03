import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { OrganizationLink } from 'common/links';
import { slugify } from 'common/utils';
import BadgeTooltip from '../common/BadgeTooltip';

const Responsibles = styled.div`
  a {
    margin-right: ${(props) => props.theme.spaces.s050};
  }

  h3 {
    font-size: ${(props) => props.theme.fontSizeBase};
  }
`;

const ResponsiblesList = styled.ul`
  margin-bottom: ${(props) => props.theme.spaces.s150};
  list-style: none;
  padding: 0;
`;

const ResponsibleItem = styled.li`
  font-size: ${(props) => props.theme.fontSizeSm};

  .badge {
    margin-bottom: 0;
  }
`;

const ResponsibleSpecifier = styled.div`
    margin-bottom: ${(props) => props.theme.spaces.s050};
`;
function ResponsibleBadge(props) {
  const {
    index,
    id,
    name,
    abbreviation,
    role,
    specifier
  } = props;
  const { t } = useTranslation(['common', 'actions']);
  let size = 'md';
  let ariaLabel;

  // PRIMARY, COLLABORATOR

  if (role === 'PRIMARY') {
    size = 'lg';
    ariaLabel = `${t('responsible-party-main')}: ${abbreviation} ${name}`;
  } else {
    ariaLabel = `${abbreviation} ${name}`;
  }

  return (
    <ResponsibleItem>
      <OrganizationLink organizationId={ id }>
        <BadgeTooltip
          id={`org-${slugify(id)}`}
          name={name !== abbreviation ? name : ''}
          ariaLabel={ariaLabel}
          abbreviation={abbreviation}
          size={size}
        />
      </OrganizationLink>
      { specifier &&
        <ResponsibleSpecifier>
          {specifier}
        </ResponsibleSpecifier>
      }
    </ResponsibleItem>
  );
}

function ResponsibleList(props) {
  const { responsibleParties } = props;
  const { t } = useTranslation(['common', 'actions']);
    /* TODO: a11y - this should probably be a list markup */

  return (
    <Responsibles>
      <h3>{t('responsible-parties')}</h3>
      <ResponsiblesList>
      { responsibleParties.map((item, index) => (
          <ResponsibleBadge
            t={t}
            key={item.organization.id}
            index={index}
            id={item.organization.id}
            name={item.organization.name}
            abbreviation={item.organization.abbreviation}
            role={item.role}
            specifier={item.specifier}
          />
        ))
      }
      </ResponsiblesList>
    </Responsibles>
  );
}

ResponsibleBadge.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  abbreviation: PropTypes.string,
  role: PropTypes.string,
  specifier: PropTypes.string,
};

ResponsibleList.propTypes = {
  responsibleParties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string,
  })).isRequired,
  t: PropTypes.func.isRequired,
};

export default ResponsibleList;
