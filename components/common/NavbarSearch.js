import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputGroup, Popover, PopoverBody } from 'reactstrap';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { SearchProvider, WithSearch, SearchBox, Results } from '@elastic/react-search-ui';
import { Link } from 'common/links';
import { useTheme } from 'common/theme';
import WatchSearchAPIConnector from 'common/search';
import Icon from 'components/common/Icon';
import PlanChip from 'components/plans/PlanChip';
import { usePlan } from 'context/plan';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'common/i18n';

const TextInput = styled.input`
  display: ${(props) => (props.isOpen === 'true' ? 'block' : 'hidden')};
  width: ${(props) => (props.isOpen === 'true' ? 'auto' : '0')};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  padding: ${(props) => (props.isOpen === 'true' ? `${props.theme.inputPaddingY} ${props.theme.inputPaddingY}` : '0')};
  color: ${(props) => props.theme.themeColors.black};
  background-color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border: 0;

  &:focus, &:focus-visible {
    outline: 3px solid ${(props) => props.theme.inputBtnFocusColor};
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  padding: 0 .5rem;
  background-color: ${(props) => props.isActive === 'true' ? props.theme.themeColors.black : props.theme.brandNavBackground};
  border: 0;
  border-radius: ${(props) => props.theme.btnBorderRadius};
  border-width: ${(props) => props.theme.btnBorderWidth};

  &:hover {
    background-color: ${(props) => transparentize(0.4, props.theme.themeColors.black)};
  }
  .icon {
    fill: ${(props) => props.isActive === 'true' ? props.theme.themeColors.white : props.theme.brandNavColor} !important;
  }
`;

const ResultsBox = styled.div`
  display: inline-block;
  z-index: 2000;
  width: 400px;
  padding: 5px 10px;
  font-size: 13px;
  border-radius: 6px;
  background: #FFFFFF;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, .5);
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

function ResultItem(props) {
  const { t } = useTranslation();
  const { hit } = props;
  const itemImage = hit.plan.image?.rendition?.src;
  // FIXME: Group by hit.object.__typename?

  const typeName = (hit) => {
    const { object, page } = hit;
    if (object) {
      const typename = object.__typename;
      if (typename === 'Action') {
        return t('action');
      } else if (typename === 'Indicator') {
        return t('indicator');
      }
    } else if (page) {
      if (page.category) {
        return page.category.level?.name;
      }
      return t('page');
    }
  }

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
        <h6>{ hit.title }</h6>
        {hit.highlight && (
          <HitHighlight dangerouslySetInnerHTML={{__html: hit.highlight}} />
        )}
      </a>
    </HitItem>
  )
}

const ResultList = (props) => {
  const { results, searchTerm } = props;
  const { t } = useTranslation();
  //const plan = usePlan();
  const RESULTS_LIMIT = 4;
  const counts = [
    {
      name: 'Pages',
      count: results.filter((result) => result.page).length,
    },
    {
      name: 'Actions',
      count: results.filter((result) => result.object?.__typename === 'Action').length,
    },
    {
      name: 'Indicators',
      count: results.filter((result) => result.object?.__typename === 'Indicator').length,
    }
  ];

  // FIXME: can we limit the number of results earlier?
  // We could show { counts.map((count) => count.count > 0 ? `${count.name}: ${count.count} ` : '' ) }
  return (
        <>
          <ResultsHeader>
            {t('searching-for', {term: searchTerm})}
            <ResultCount>
              { results.length > 0 ? '' : t('search-no-results')}
            </ResultCount>
          </ResultsHeader>
          <HitList>
            {results.slice(0,RESULTS_LIMIT).map(r => (
              <ResultItem hit={r} />
            ))}
          </HitList>
          <ResultsFooter>
            { results.length > 0 ?
            <Link href={`/search?q=${searchTerm}`}>
              <a>
                { t('see-all-results', {count: results.length})}
                <Icon name="arrow-right" />
              </a>
            </Link>
            :
            <Link href={`/search`}><a>{t('search-advanced')} <Icon name="arrow-right" /></a></Link>}
          </ResultsFooter>
        </>
  );
}

function NavbarSearch(props) {
  const theme = useTheme(null);
  const searchInput = useRef();
  const plan = usePlan();
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const router = useRouter();

  if (!plan.features.enableSearch) {
    return null;
  }

  const connector = new WatchSearchAPIConnector({ plan, apolloClient });
  return (
    <SearchProvider config={{
      apiConnector: connector,
      debug: false,
      hasA11yNotifications: true,
      a11yNotificationMessages: {
        searchResults: ({ start, end, totalResults, searchTerm }) =>
          `Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
      },
    }} >
      <WithSearch
        mapContextToProps={({ isLoading, searchTerm, setSearchTerm, results }) => ({
          isLoading,
          searchTerm,
          setSearchTerm,
          results
        })}
      >
        {(context) => {
          const { isLoading, searchTerm, setSearchTerm, results } = context;
          const [referenceElement, setReferenceElement] = useState(null);
          const [popperElement, setPopperElement] = useState(null);
          const [arrowElement, setArrowElement] = useState(null);
          const [searchOpen, setSearchOpen] = useState(false);
          const searchElement = useRef();

          // Clear search term if the input is hidden
          const closeSearch = () => {
            setSearchOpen(false);
            setSearchTerm("");
          };

          // Close results modal if clicked outside search ui
          useEffect(() => {
            const handlePageClick = (e) => {
              if (!searchElement.current.contains(e.target)) closeSearch();
            };
            searchOpen && document.addEventListener("mousedown", handlePageClick);
            return () => {
              document.removeEventListener("mousedown", handlePageClick);
            };
          }, [searchOpen]);

          // Use popper to place and size search modal
          const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
            modifiers: [
              { name: 'arrow', options: { element: arrowElement } },
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },],
          });

          const handleSubmit = (event) => {
            event.preventDefault();
            if (!searchOpen) {
              searchInput.current.focus();
              setSearchOpen(true);
            } else if (searchInput.current.value) {
              router.push({
                pathname: '/search',
                query: { q: searchTerm },
              });
              closeSearch();
            } else closeSearch();
          };
          return (
            <li ref={searchElement} className="nav-item">
              <SearchControls ref={setReferenceElement}>
              <form role="combobox" autoComplete="off" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="downshift-5-label">
                <InputGroup>
                  <TextInput
                    type="search"
                    id="q"
                    name="q"
                    autocomplete="off"
                    aria-autocomplete="list"
                    aria-labelledby="downshift-5-label"
                    placeholder={t('search')}
                    aria-label={t('search')}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value, {
                      autocompleteResults: true,
                      autocompleteMinimumCharacters: 2,
                      debounce: 200,
                    })}
                    ref={searchInput}
                    isOpen={searchOpen.toString()}
                  />
                  <SearchButton
                    isActive={searchOpen.toString()}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon
                      name="search"
                      width="1.25rem"
                      height="1.25rem"
                    />
                  </SearchButton>
                </InputGroup>
              </form>
              </SearchControls>
              {/* TODO: is there a way to control results visibility better? */}
              {/* TODO: display loading state but currently isLoading does not update itself */}
              { searchTerm.length > 1 && searchOpen &&
                <ResultsBox ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                  <Arrow ref={setArrowElement} style={styles.arrow} />
                  <ResultList results={results} searchTerm={searchTerm} anchor={referenceElement}/>
                </ResultsBox>
              }

            </li>
          )
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default NavbarSearch;
