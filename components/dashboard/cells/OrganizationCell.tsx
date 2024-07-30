import { ActionListAction } from '../dashboard.types';
import styled, { useTheme } from 'styled-components';
import { getThemeStaticURL } from '@/common/theme';

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
      src={
        action.primaryOrg.logo?.rendition?.src ??
        getThemeStaticURL(theme.defaultAvatarOrgImage)
      }
      alt={action.primaryOrg.name}
      id={`L${action.primaryOrg.id}`}
    />
  );
};

export default OrganizationCell;
