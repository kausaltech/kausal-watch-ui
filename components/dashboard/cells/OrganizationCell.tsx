import { ActionListAction } from '../dashboard.types';
import styled from 'styled-components';

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

  return (
    <OrgLogo
      src={
        action.primaryOrg.logo?.rendition?.src ??
        '/static/themes/default/images/default-avatar-org.png'
      }
      alt={action.primaryOrg.name}
      id={`L${action.primaryOrg.id}`}
    />
  );
};

export default OrganizationCell;
