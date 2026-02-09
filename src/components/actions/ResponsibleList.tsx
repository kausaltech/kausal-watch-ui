import React from 'react';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { usePaths } from '@/context/paths/paths';
import { usePlan } from '@/context/plan';

import OrganizationChip from '../common/OrganizationChip';
import type { ActionContentAction } from './ActionContent';

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

type ResponsibleListProps = {
  heading: string | null;
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
          <ResponsibleItem>
            <OrganizationChip
              key={item.id}
              organization={item.organization}
              role={item.role}
              specifier={item.specifier}
              linkToOrganization={linkToOrganization}
            />
          </ResponsibleItem>
        ))}
      </ResponsiblesList>
    </Responsibles>
  );
}

export default ResponsibleList;
