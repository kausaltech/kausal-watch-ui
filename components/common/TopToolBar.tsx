import React from 'react';
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import styled from 'styled-components';
import Icon from '@/components/common/Icon';

const ToolbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.themeColors.black};
  font-family: 'Inter';
`;

const StyledDropdown = styled(Dropdown)`
  margin: ${(props) => props.theme.spaces.s050} 0;
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  background-color: ${(props) => props.theme.themeColors.black};
  color: ${(props) => props.theme.themeColors.light};
  border-color: ${(props) => props.theme.themeColors.light};
  padding: 8px 15px;

  &:after {
    margin-left: 30px;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.light};
    border-color: ${(props) => props.theme.themeColors.light};
  }
`;

const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  padding: 8px 10px;
  color: ${(props) => props.theme.headingsColor};
  font-weight: ${(props) => props.theme.headingsFontWeight};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: 'Inter';
`;

const DropdownHeader = styled.h6`
  border-bottom: 1px solid ${(props) => props.theme.headingsColor};
  margin: 0 auto;
  text-align: center;
`;

const DropdownItemText = styled.div`
  display: block;
`;

export const TopToolBar = () => {
  const [versionsDropdownOpen, setVersionsDropdownOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const versionsToggle = () =>
    setVersionsDropdownOpen((prevState) => !prevState);
  const userToggle = () => setUserDropdownOpen((prevState) => !prevState);

  return (
    <ToolbarContainer fluid>
      <StyledDropdown isOpen={versionsDropdownOpen} toggle={versionsToggle}>
        <StyledDropdownToggle caret aria-label="action-versions">
          <StyledIcon
            name="pencil"
            className="icon"
            aria-label="actions-versions"
          />
          Draft
        </StyledDropdownToggle>
        <StyledDropdownMenu>
          <DropdownHeader>Action versions</DropdownHeader>
          <DropdownItem>
            <DropdownItemText>
              <StyledIcon
                name="file"
                className="icon"
                aria-label="draft-action"
              />
              Draft
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem>
            <DropdownItemText>
              <StyledIcon
                name="file"
                className="icon"
                aria-label="published-action"
              />
              Published
            </DropdownItemText>
          </DropdownItem>
        </StyledDropdownMenu>
      </StyledDropdown>
      <StyledDropdown isOpen={userDropdownOpen} toggle={userToggle}>
        <StyledDropdownToggle caret aria-label="user-name-icon">
          <StyledIcon name="user" className="icon" aria-label="user-icon" />
          Wilhelm Viever
        </StyledDropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            as="a"
            href="https://admin.watch.kausal.tech/admin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledIcon
              name="link"
              className="icon"
              aria-label="link-to-the-admin-site"
            />
            Go to the Admin site
          </DropdownItem>
          <DropdownItem>
            <StyledIcon
              name="arrowRight"
              className="icon"
              aria-label="sign-out"
            />
            Sign out
          </DropdownItem>
        </DropdownMenu>
      </StyledDropdown>
    </ToolbarContainer>
  );
};

export default TopToolBar;
