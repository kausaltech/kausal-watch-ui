import { useLocale } from 'next-intl';
import Link from 'next/link';
import styled from 'styled-components';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Icon from './Icon';
import { useTheme } from 'styled-components';
import { PlanContextFragment } from '@/common/__generated__/graphql';
import { usePlan } from '@/context/plan';
import { useApolloClient } from '@apollo/client';

const LanguageSelectorListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: ${(props) => props.theme.spaces.s050};
  }

  @media (max-width: ${(props) => props.theme.breakpointMd}) {
    display: block;
  }
`;

const Selector = styled(UncontrolledDropdown)<{ $mobile: boolean }>`
  button {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 0 ${(props) => props.theme.spaces.s050}
      ${(props) => props.theme.spaces.s100};
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

  svg {
    fill: ${(props) =>
      props.$mobile
        ? props.theme.themeColors.dark
        : props.theme.brandNavColor} !important;
  }
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 !important;
  text-decoration: none;
  background: none;
  border: none;

  svg.icon {
    fill: ${(props) => props.theme.themeColors.dark} !important;
  }

  @media (min-width: ${(props) => props.theme.breakpointMd}) {
    align-self: center;
    margin: 0 ${(props) => props.theme.spaces.s200} 0 0;

    svg.icon {
      fill: ${(props) => props.theme.brandNavColor} !important;
    }
  }
`;

const CurrentLanguage = styled.span<{ $mobile: boolean }>`
  display: inline-block;
  width: 1.5rem;
  margin: 0;
  text-transform: uppercase;
  font-size: 90%;
  color: ${(props) =>
    props.$mobile ? props.theme.themeColors.dark : props.theme.brandNavColor};
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  right: 0;

  a {
    display: block;
    width: 100%;
    color: ${(props) => props.theme.textColor.primary};

    &:hover {
      text-decoration: none;
    }
  }

  .dropdown-item.active,
  .dropdown-item:active {
    color: ${(props) => props.theme.textColor.primary};
    background-color: ${(props) => props.theme.cardBackground.secondary};
  }
`;

const ActiveLanguage = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

// For now, we only show language names without variants (e.g., "English" instead of "English (Australia)" as it's
// arguably unlikely that a site uses two variants of the same base language.
const languageNames = {
  fi: 'Suomi',
  en: 'English',
  de: 'Deutsch',
  sv: 'Svenska',
  es: 'Español',
  da: 'Dansk',
  lv: 'Latviešu',
};

function getLocales(plan: PlanContextFragment) {
  return [plan.primaryLanguage, ...(plan.otherLanguages ?? [])];
}

type LanguageSelectorProps = {
  mobile?: boolean;
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const currentLocale = useLocale();
  const theme = useTheme();
  const plan = usePlan();
  const apolloClient = useApolloClient();
  const { mobile = false } = props;

  const locales = getLocales(plan).filter(
    (locale) => !theme.settings.hiddenLocales?.includes(locale)
  );

  if (locales?.length < 2) return null;
  // Strip language variant (if any)
  const languageCode = currentLocale?.split('-')[0];

  const getLocaleHref = (locale: string) =>
    plan.domain?.basePath ? `/${locale}/${plan.domain.basePath}` : `/${locale}`;

  return (
    <LanguageSelectorListItem>
      <Selector inNavbar $mobile={mobile} className={mobile && 'd-md-none'}>
        <StyledDropdownToggle color="link" data-toggle="dropdown" tag="button">
          <Icon name="globe" width="1.75rem" height="1.75rem" />
          <CurrentLanguage $mobile={mobile}>{languageCode}</CurrentLanguage>
        </StyledDropdownToggle>
        <StyledDropdownMenu end>
          {locales.map((locale) => (
            <DropdownItem
              key={locale}
              tag="div"
              active={locale === currentLocale}
            >
              {locale !== currentLocale ? (
                <Link
                  locale={locale}
                  href={getLocaleHref(locale)}
                  // Reset the cache so that stale locale cache isn't used. Required because the
                  // locale isn't passed to query calls as an argument.
                  onClick={() => apolloClient.clearStore()}
                >
                  {languageNames[locale.split('-')[0]]}
                </Link>
              ) : (
                <ActiveLanguage>
                  {languageNames[locale.split('-')[0]]}
                </ActiveLanguage>
              )}
            </DropdownItem>
          ))}
        </StyledDropdownMenu>
      </Selector>
    </LanguageSelectorListItem>
  );
};

export default LanguageSelector;
