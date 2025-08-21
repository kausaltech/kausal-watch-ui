import React from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { ActionResponsiblePartiesBlock } from '@/common/__generated__/graphql';
import { OrganizationLink } from '@/common/links';
import { slugify } from '@/common/utils';
import BadgeTooltip, { BadgeTooltipProps } from '@/components/common/BadgeTooltip';
import { usePaths } from '@/context/paths/paths';
import { usePlan } from '@/context/plan';

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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => props.theme.spaces.s050};
`;

const ResponsibleItem = styled.li`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const ResponsibleSpecifier = styled.div`
  margin: ${(props) => props.theme.spaces.s050} 0 ${(props) => props.theme.spaces.s050};
  line-height: ${(props) => props.theme.lineHeightMd};
`;

const Address = styled.address`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
`;

type ResponsibleBadgeProps = {
  responsibleParty: ActionContentAction['responsibleParties'][0];
  linkToOrganization?: boolean;
};

function ResponsibleBadge({ responsibleParty, linkToOrganization = true }: ResponsibleBadgeProps) {
  const { organization: org, role, specifier } = responsibleParty;
  const t = useTranslations();

  let size = 'md' as BadgeTooltipProps['size'];
  let ariaLabel;

  // PRIMARY, COLLABORATOR

  if (role === 'PRIMARY') {
    size = 'lg';
    ariaLabel = `${t('responsible-party-main')}: ${org.abbreviation} ${org.name}`;
  }
  if (role === 'COLLABORATOR') {
    size = 'sm';
    ariaLabel = `${t('responsible-party-main')}: ${org.abbreviation} ${org.name}`;
  } else {
    ariaLabel = `${org.abbreviation} ${org.name}`;
  }

  return (
    <ResponsibleItem>
      {linkToOrganization ? (
        <OrganizationLink organizationId={org.id}>
          <BadgeTooltip
            id={`org-${slugify(org.id)}`}
            tooltip={org.abbreviation !== '' ? org.name : undefined}
            ariaLabel={ariaLabel}
            content={org.abbreviation || org.name}
            size={size}
            color="badgeColor"
            isLink
          />
        </OrganizationLink>
      ) : (
        <BadgeTooltip
          id={`org-${slugify(org.id)}`}
          tooltip={org.abbreviation !== '' ? org.name : undefined}
          ariaLabel={ariaLabel}
          content={org.abbreviation || org.name}
          size={size}
          color="badgeColor"
          isLink
        />
      )}
      {specifier && <ResponsibleSpecifier>{specifier}</ResponsibleSpecifier>}
      {org.email && (
        <Address>
          {t('email')}: <a href={`mailto:${org.email}`}>{org.email}</a>
        </Address>
      )}
    </ResponsibleItem>
  );
}

type ResponsibleListProps = {
  heading: ActionResponsiblePartiesBlock['heading'];
  responsibleParties: ActionContentAction['responsibleParties'];
};
function ResponsibleList(props: ResponsibleListProps) {
  const { heading, responsibleParties } = props;
  const t = useTranslations();
  const plan = usePlan();
  const pathsInstance = usePaths();
  // TODO: Remove this once we have a proper way to check if org page is supported
  const linkToOrganization = pathsInstance ? false : true;
  const { organizationTerm } = plan.generalContent;
  /* TODO: a11y - this should probably be a list markup */

  return (
    <Responsibles>
      <h3>{heading || t('responsible-parties', { context: organizationTerm })}</h3>
      <ResponsiblesList>
        {responsibleParties.map((item) => (
          <ResponsibleBadge
            key={item.id}
            responsibleParty={item}
            linkToOrganization={linkToOrganization}
          />
        ))}
      </ResponsiblesList>
    </Responsibles>
  );
}

export default ResponsibleList;
