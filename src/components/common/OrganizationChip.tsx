import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import type { ActionResponsiblePartyRole } from '@/common/__generated__/graphql';
import { OrganizationLink } from '@/common/links';
import { slugify } from '@/common/utils';
import type { BadgeTooltipProps } from '@/components/common/BadgeTooltip';
import BadgeTooltip from '@/components/common/BadgeTooltip';

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

type OrganizationChipProps = {
  organization: {
    id: string;
    abbreviation: string | null;
    name: string | null;
    email?: string;
  };
  role?: ActionResponsiblePartyRole | null;
  specifier?: string;
  linkToOrganization?: boolean;
};

function OrganizationChip(props: OrganizationChipProps) {
  const { organization, role, specifier, linkToOrganization = true } = props;
  const t = useTranslations();

  let size = 'md' as BadgeTooltipProps['size'];
  let ariaLabel;

  // PRIMARY, COLLABORATOR

  if (role === 'PRIMARY') {
    size = 'lg';
    ariaLabel = `${t('responsible-party-main')}: ${organization.abbreviation} ${organization.name}`;
  }
  if (role === 'COLLABORATOR') {
    size = 'sm';
    ariaLabel = `${t('responsible-party-main')}: ${organization.abbreviation} ${organization.name}`;
  } else {
    ariaLabel = `${organization.abbreviation} ${organization.name}`;
  }

  return (
    <>
      {linkToOrganization ? (
        <OrganizationLink organizationId={organization.id}>
          <BadgeTooltip
            id={`org-${slugify(organization.id)}`}
            tooltip={organization.abbreviation !== '' ? (organization.name ?? '') : undefined}
            ariaLabel={ariaLabel}
            content={organization.abbreviation || organization.name}
            size={size}
            themeColor="badgeColor"
            isLink
          />
        </OrganizationLink>
      ) : (
        <BadgeTooltip
          id={`org-${slugify(organization.id)}`}
          tooltip={organization.abbreviation !== '' ? (organization.name ?? '') : undefined}
          ariaLabel={ariaLabel}
          content={organization.abbreviation || organization.name}
          size={size}
          themeColor="badgeColor"
          isLink
        />
      )}
      {specifier && <ResponsibleSpecifier>{specifier}</ResponsibleSpecifier>}
      {organization.email && (
        <Address>
          {t('email')}: <a href={`mailto:${organization.email}`}>{organization.email}</a>
        </Address>
      )}
    </>
  );
}

export default OrganizationChip;
