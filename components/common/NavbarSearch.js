'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { InputGroup } from 'reactstrap';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { SearchProvider, WithSearch } from '@elastic/react-search-ui';
import { Link, usePrependPlanAndLocale } from 'common/links';
import WatchSearchAPIConnector from 'common/search';
import Icon from 'components/common/Icon';
import PlanChip from 'components/plans/PlanChip';
import { usePlan } from 'context/plan';
import { useApolloClient } from '@apollo/client';
import { getActionTermContext } from 'common/i18n';
import { useRouter } from 'next/navigation';

const StyledInputGroup = styled(InputGroup)`
  flex-wrap: nowrap;
`;

const NavBarSearchListItem = styled.li`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.input`
  display: ${(props) => (props.$isOpen ? 'block' : 'hidden')};
  width: ${(props) => (props.$isOpen ? 'auto' : '0')};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em +
      ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  padding: ${(props) =>
    props.$isOpen
      ? `${props.theme.inputPaddingY} ${props.theme.inputPaddingY}`
      : '0'};
  color: ${(props) => props.theme.themeColors.black};
  background-color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border: 0;

  &:focus,
  &:focus-visible {
    outline: 3px solid ${(props) => props.theme.inputBtnFocusColor};
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  height: calc(
    ${(props) => props.theme.inputLineHeight}em +
      ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  padding: 0 0.5rem;
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.brandNavColor
      : props.theme.brandNavBackground};
  border: 0;
  border-bottom: 3px solid;
  border-bottom-color: ${(props) =>
    props.$isActive
      ? props.theme.brandNavColor
      : props.theme.brandNavBackground};
  border-radius: 0;

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme.brandNavColor};
  }
  .icon {
    fill: ${(props) =>
      props.$isActive
        ? props.theme.brandNavBackground
        : props.theme.brandNavColor} !important;
  }
`;

const ResultsBox = styled.div`
  display: inline-block;
  z-index: 2000;
  width: 400px;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.5);
`;

const ResultsHeader = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s025};
  color: ${(props) => props.theme.graphColors.grey070};
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const ResultCount = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
`;

const ResultsFooter = styled.div`
  padding-top: ${(props) => props.theme.spaces.s025};
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  text-align: right;
  font-weight: ${(props) => props.theme.fontWeightBold};

  .icon {
    fill: ${(props) => props.theme.brandDark} !important;
  }
`;

const HitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HitItem = styled.li`
  border-top: 1px solid ${(props) => props.theme.graphColors.grey030};
  padding: ${(props) => props.theme.spaces.s050};
  margin: 0 -${(props) => props.theme.spaces.s050};

  h6 {
    margin: ${(props) => props.theme.spaces.s050} 0;
    font-size: ${(props) => props.theme.fontSizeBase};
    font-weight: ${(props) => props.theme.fontWeightNormal};
  }

  a {
    color: ${(props) => props.theme.themeColors.black};

    &:hover {
      background: ${(props) => props.theme.graphColors.grey010};
      text-decoration: none;

      h6 {
        text-decoration: underline;
      }
    }
  }

  em {
    font-style: normal;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

const HitType = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.25px;
`;

const HitHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HitHighlight = styled.div`
  margin: 0 0 ${(props) => props.theme.spaces.s050} 0;
  color: ${(props) => props.theme.graphColors.grey050};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  line-height: 1;
`;

const SearchControls = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  top: -4px;
  visibility: hidden;

  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  &::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }
`;

const RESULTS_LIMIT = 4;

function ResultItem(props) {
  const t = useTranslations();
  const plan = usePlan();
  const { hit } = props;
  const itemImage = hit.plan.image?.rendition?.src;
  // FIXME: Group by hit.object.__typename?

  const typeName = (hit) => {
    const { object, page } = hit;
    if (object) {
      const typename = object.__typename;
      if (typename === 'Action') {
        return t('action', getActionTermContext(plan));
      } else if (typename === 'Indicator') {
        return t('indicator');
      }
    } else if (page) {
      if (page.category) {
        return page.category.level?.name;
      }
      return t('page');
    }
  };

  return (
    <HitItem key={hit.id}>
      <a href={hit.url}>
        <HitHeader>
          <PlanChip
            planImage={itemImage}
            planShortName={hit.plan.shortName || hit.plan.name}
            size="sm"
          />
          <HitType>{typeName(hit)}</HitType>
        </HitHeader>
        <h6>{hit.title}</h6>
        {hit.highlight && (
          <HitHighlight>
            <span dangerouslySetInnerHTML={{ __html: hit.highlight }} />
            ...
          </HitHighlight>
        )}
      </a>
    </HitItem>
  );
}

const ResultList = (props) => {
  const { results, searchTerm, loading } = props;
  const t = useTranslations();
  //const plan = usePlan();
  const counts = [
    {
      name: 'Pages',
      count: results.filter((result) => result.page).length,
    },
    {
      name: 'Actions',
      count: results.filter((result) => result.object?.__typename === 'Action')
        .length,
    },
    {
      name: 'Indicators',
      count: results.filter(
        (result) => result.object?.__typename === 'Indicator'
      ).length,
    },
  ];

  // FIXME: can we limit the number of results earlier?
  // We could show { counts.map((count) => count.count > 0 ? `${count.name}: ${count.count} ` : '' ) }
  return (
    <>
      <ResultsHeader>
        {t('searching-for', { term: searchTerm })}
        <ResultCount>
          {loading && <p>{t('loading')}...</p>}
          {!loading && results.length === 0 && t('search-no-results')}
        </ResultCount>
      </ResultsHeader>
      {!loading && (
        <HitList>
          {results.slice(0, RESULTS_LIMIT).map((r, i) => (
            <ResultItem key={i} hit={r} />
          ))}
        </HitList>
      )}
      <ResultsFooter>
        {results.length > 0 ? (
          <Link
            prefetch={false}
            href={`/search?q=${searchTerm}`}
            legacyBehavior
          >
            <a>
              {t('see-all-results', { count: results.length })}
              <Icon name="arrow-right" />
            </a>
          </Link>
        ) : (
          <Link prefetch={false} href={`/search`} legacyBehavior>
            <a data-testId="search-advanced">
              {t('search-advanced')} <Icon name="arrow-right" />
            </a>
          </Link>
        )}
      </ResultsFooter>
    </>
  );
};

function NavbarSearch() {
  const plan = usePlan();
  const apolloClient = useApolloClient();

  if (!plan.features.enableSearch) {
    return null;
  }

  // TODO: Translate a11y text
  const connector = new WatchSearchAPIConnector({ plan, apolloClient });
  return (
    <SearchProvider
      config={{
        apiConnector: connector,
        debug: false,
        hasA11yNotifications: true,
        a11yNotificationMessages: {
          searchResults: ({ totalResults, searchTerm }) =>
            `Searching for "${searchTerm}". Showing first ${RESULTS_LIMIT} results out of ${totalResults}.`,
        },
      }}
    >
      <WithSearch
        mapContextToProps={({
          isLoading,
          searchTerm,
          setSearchTerm,
          results,
        }) => ({
          isLoading,
          searchTerm,
          setSearchTerm,
          results,
        })}
      >
        {(context) => {
          return (
            <Search
              isLoading={context.isLoading}
              searchTerm={context.searchTerm}
              setSearchTerm={context.setSearchTerm}
              results={context.results}
            />
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

function Search({ isLoading, searchTerm, setSearchTerm, results }) {
  const searchInput = useRef();
  const t = useTranslations();
  const router = useRouter();
  const searchPath = usePrependPlanAndLocale('/search?q=');

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchElement = useRef(null);

  // Clear search term if the input is hidden
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm('');
  };

  // Close results modal if clicked outside search ui
  useEffect(() => {
    const handlePageClick = (e) => {
      if (!searchElement.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchTerm('');
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handlePageClick);

      return () => {
        document.removeEventListener('mousedown', handlePageClick);
      };
    }
  }, [searchOpen, setSearchTerm]);

  // Use popper to place and size search modal
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchOpen) {
      searchInput.current.focus();
      setSearchOpen(true);
    } else if (searchInput.current.value) {
      const href = `${searchPath}${searchTerm}`;
      router.push(href);
      closeSearch();
    } else closeSearch();
  };

  return (
    <NavBarSearchListItem className="nav-item" ref={searchElement}>
      <SearchControls ref={setReferenceElement}>
        <form autoComplete="off" aria-label={t('search')}>
          <StyledInputGroup>
            <TextInput
              type="search"
              id="q"
              name="q"
              autoComplete="off"
              aria-autocomplete="list"
              placeholder={t('search')}
              aria-label={t('search')}
              role="combobox"
              aria-expanded={searchTerm.length > 1}
              aria-haspopup="listbox"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value, {
                  debounce: 400,
                })
              }
              onFocus={(e) => setSearchOpen(true)}
              ref={searchInput}
              $isOpen={searchOpen}
            />
            <SearchButton
              $isActive={searchOpen}
              type="submit"
              onClick={handleSubmit}
              aria-label={t('search')}
              data-testid="nav-search-btn"
            >
              <Icon
                name="search"
                width="1.75rem"
                height="1.75rem"
                aria-hidden="true"
                focusable="false"
              />
            </SearchButton>
          </StyledInputGroup>
        </form>
      </SearchControls>
      {/* TODO: is there a way to control results visibility better? */}
      {/* TODO: display loading state but currently isLoading does not update itself */}
      {searchTerm.length > 1 && searchOpen && (
        <ResultsBox
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <Arrow ref={setArrowElement} style={styles.arrow} />
          <ResultList
            results={results}
            searchTerm={searchTerm}
            anchor={searchElement}
            loading={isLoading}
          />
        </ResultsBox>
      )}
    </NavBarSearchListItem>
  );
}

export default NavbarSearch;
