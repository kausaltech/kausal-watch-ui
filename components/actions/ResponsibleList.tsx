import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import { OrganizationLink } from 'common/links';
import { slugify } from 'common/utils';
import BadgeTooltip from '../common/BadgeTooltip';
import { ActionContentAction } from './ActionContent';

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
  margin-bottom: ${(props) => props.theme.spaces.s100};
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const ResponsibleSpecifier = styled.div`
    margin: ${(props) => props.theme.spaces.s050} 0 ${(props) => props.theme.spaces.s050};
    line-height: ${(props) => props.theme.lineHeightMd};
`;

type ResponsibleBadgeProps = {
  responsibleParty: ActionContentAction['responsibleParties'][0];
}

function ResponsibleBadge({ responsibleParty }: ResponsibleBadgeProps) {
  const {
    organization: org,
    role,
    specifier
  } = responsibleParty;
  const { t } = useTranslation(['common', 'actions']);
  let size = 'md';
  let ariaLabel;

  // PRIMARY, COLLABORATOR

  if (role === 'PRIMARY') {
    size = 'lg';
    ariaLabel = `${t('responsible-party-main')}: ${org.abbreviation} ${org.name}`;
  } if (role === 'COLLABORATOR') {
    size = 'sm';
    ariaLabel = `${t('responsible-party-main')}: ${org.abbreviation} ${org.name}`;
  } else {
    ariaLabel = `${org.abbreviation} ${org.name}`;
  }

  return (
    <ResponsibleItem>
      <OrganizationLink organizationId={ org.id }>
        <a>
          <BadgeTooltip
            id={`org-${slugify(org.id)}`}
            tooltip={org.abbreviation !== "" ? org.name : undefined}
            ariaLabel={ariaLabel}
            content={org.abbreviation || org.name}
            size={size}
          />
        </a>
      </OrganizationLink>
      { specifier &&
        <ResponsibleSpecifier>
          {specifier}
        </ResponsibleSpecifier>
      }
    </ResponsibleItem>
  );
}

type ResponsibleListProps = {
  responsibleParties: ActionContentAction['responsibleParties']
}
function ResponsibleList(props: ResponsibleListProps) {
  const { responsibleParties } = props;
  const { t } = useTranslation(['common', 'actions']);
  /* TODO: a11y - this should probably be a list markup */

  return (
    <Responsibles>
      <h3>{t('responsible-parties')}</h3>
      <ResponsiblesList>
      { responsibleParties.map((item) => (
          <ResponsibleBadge key={item.id} responsibleParty={item} />
        ))
      }
      </ResponsiblesList>
    </Responsibles>
  );
}

export default ResponsibleList;
