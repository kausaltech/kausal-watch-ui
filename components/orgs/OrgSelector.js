import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import OrgChip from 'components/orgs/OrgChip';
import Icon from 'components/common/Icon';

const OrgSelect = styled.div`
  display: flex;
  align-items: center;
`;

const OrgDivider = styled.div``;

const OrgAvatar = styled.img`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
`;

const OrgTitle = styled.div`
  margin: 0 0.5rem 0 1rem;
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) =>
    `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
  font-weight: ${(props) => props.theme[props.weight]};
`;

const DropdownContent = styled.div`
  max-height: 250px;
  overflow: scroll;
`;

const OrgDropdownItem = styled.a`
  display: block;
  padding: 0.5rem;
  margin: 0 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.graphColors.grey010};
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.5rem;
  background: none;
  line-height: 1.5rem;
  border: none;
  font-size: 1rem;
  color: ${(props) => props.theme.brandNavColor};
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    background-color: ${(props) => props.theme.graphColors.grey010};
    color: ${(props) => props.theme.themeColors.dark};
  }
`;

const OrgSelector = (props) => {
  const { orgs } = props;
  const activeOrg = orgs.find((org) => org.active === true);
  if (!activeOrg) {
    throw new Error('No active organization');
  }
  return (
    <OrgSelect>
      <OrgDivider />
      <UncontrolledDropdown>
        <StyledDropdownToggle data-toggle="dropdown" tag="button">
          <OrgAvatar src={activeOrg.image} alt="" />
          <OrgTitle>{activeOrg.shortName}</OrgTitle>
          <Icon.AngleDown />
        </StyledDropdownToggle>
        <DropdownMenu role="menu">
          <DropdownContent>
            {orgs.map((org) => (
              <OrgDropdownItem href={org.orgUrl} key={org.id} role="menuitem">
                <OrgChip image={org.image} name={org.shortName} size="md" />
              </OrgDropdownItem>
            ))}
          </DropdownContent>
        </DropdownMenu>
      </UncontrolledDropdown>
    </OrgSelect>
  );
};

export default OrgSelector;
