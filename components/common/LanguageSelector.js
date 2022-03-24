import { useState, useRef, useEffect } from 'react';
import { Link } from 'common/links';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Icon from './Icon';

const Selector = styled(UncontrolledDropdown)`
  a {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 ${(props) => props.theme.spaces.s050} ${(props) => props.theme.spaces.s100};
    color: ${(props) => props.theme.neutralDark};

    &:hover {
        text-decoration: none;
        color: ${(props) => props.theme.neutralDark};

        .highlighter {
          border-bottom: 5px solid ${(props) => props.theme.brandDark};
        }
      }

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      align-self: center;
      margin: 0;
    }
  }

  svg.icon {
    fill: ${(props) => props.mobile === 'true' ? props.theme.themeColors.dark : props.theme.brandNavColor} !important;
  }
`;

const CurrentLanguage = styled.span`
  display: inline-block;
  width: 1.5rem;
  margin: 0 .5rem;
  text-transform: uppercase;
  font-size: 90%;
  color: ${(props) => props.mobile === 'true' ? props.theme.themeColors.dark : props.theme.brandNavColor};
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  right: 0;
`;

const languageNames = {
  fi: 'Suomi',
  en: 'English',
  de: 'Deutsch',
};

const LanguageSelector = (props) => {
  const router = useRouter();
  const { mobile } = props;

  const { locales } = router
  if (locales?.length < 2) return (null);
  const handleLocaleChange = (ev) => {
    ev.preventDefault();
    window.location.href = ev.target.href;
  };

  return (
      <Selector nav inNavbar mobile={mobile.toString()} className={mobile && 'd-md-none'}>
        <DropdownToggle nav>
          <Icon name="globe" width="1.25rem" height="1.25rem" />
          <CurrentLanguage mobile={mobile.toString()}>{ router.locale }</CurrentLanguage>
        </DropdownToggle>
        <StyledDropdownMenu end>
          { locales.map((locale) => (
            <DropdownItem key={locale} tag="div">
                <Link locale={locale} href='/'>
                  <a onClick={handleLocaleChange}>
                    {languageNames[locale]}
                  </a>
                </Link>
              </DropdownItem>
          ))}
        </StyledDropdownMenu>
      </Selector>
  );
};

export default LanguageSelector;
