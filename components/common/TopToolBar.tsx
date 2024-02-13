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
import { useTranslations } from 'next-intl';
import { usePlan } from 'context/plan';

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
  const t = useTranslations();
  const plan = usePlan();
  console.log(plan);

  return (
    <ToolbarContainer fluid>
      <StyledDropdown isOpen={versionsDropdownOpen} toggle={versionsToggle}>
        <StyledDropdownToggle caret aria-label="action-versions">
          <StyledIcon
            name="pencil"
            className="icon"
            aria-label="actions-versions"
          />
          {t('draft')}
        </StyledDropdownToggle>
        <StyledDropdownMenu>
          <DropdownHeader>{t('action-versions')}</DropdownHeader>
          <DropdownItem>
            <DropdownItemText>
              <StyledIcon
                name="file"
                className="icon"
                aria-label="draft-action"
              />
              {t('draft')}
            </DropdownItemText>
          </DropdownItem>
          <DropdownItem>
            <DropdownItemText>
              <StyledIcon
                name="file"
                className="icon"
                aria-label="published-action"
              />
              {t('published')}
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
          {plan.adminUrl && (
            <DropdownItem
              as="a"
              href={plan.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledIcon
                name="lock"
                className="icon"
                aria-label="link-to-the-admin-site"
              />
              {t('admin-login')}
            </DropdownItem>
          )}
          <DropdownItem>
            <StyledIcon
              name="arrowRight"
              className="icon"
              aria-label="sign-out"
            />
            {t('sign-out')}
          </DropdownItem>
        </DropdownMenu>
      </StyledDropdown>
    </ToolbarContainer>
  );
};

export default TopToolBar;
