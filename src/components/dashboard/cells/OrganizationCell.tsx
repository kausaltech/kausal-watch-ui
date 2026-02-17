import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { getThemeStaticURL } from '@/common/theme';

import { ActionListAction } from '../dashboard.types';

interface Props {
  action: ActionListAction;
}

const OrgLogo = styled.img`
  display: block;
  width: ${(props) => props.theme.spaces.s200};
  height: ${(props) => props.theme.spaces.s200};
`;

const OrganizationCell = ({ action }: Props) => {
  if (!action.primaryOrg) {
    return null;
  }
  const theme = useTheme();

  return (
    <OrgLogo
      src={action.primaryOrg.logo?.rendition?.src ?? getThemeStaticURL(theme.defaultAvatarOrgImage)}
      alt={action.primaryOrg.name}
      id={`L${action.primaryOrg.id}`}
    />
  );
};

export default OrganizationCell;
