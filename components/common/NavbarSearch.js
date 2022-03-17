import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputGroup, Popover, PopoverBody } from 'reactstrap';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { SearchProvider, WithSearch, SearchBox, Results } from '@elastic/react-search-ui';

import { useTheme } from 'common/theme';
import WatchSearchAPIConnector from 'common/search';
import Icon from './Icon';
import PlanTag from 'components/plans/PlanTag';
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
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  padding: 8px ${(props) => props.theme.inputBtnPaddingX};
  background-color: ${(props) => props.isActive === 'true' ? props.theme.themeColors.black : props.theme.brandNavBackground};
  border: 0;
  border-radius: ${(props) => props.theme.btnBorderRadius};
  border-width: ${(props) => props.theme.btnBorderWidth};
  font-weight: ${(props) => props.theme.fontWeightBold};
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

const HitList = styled.ul`
  list-style: none;
`;

const HitItem = styled.li`

`;

const SearchControls = styled.div`

.sui-search-box__text-input {

}

.sui-search-box__submit {
  display: none;
}
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

function ResultItem({ hit }) {
  const itemImage = hit.plan.image?.rendition?.src;
  // FIXME: Group by hit.object.__typename?
  return (
    <HitItem key={hit.id}>
      <a href={hit.url}>
        <PlanTag
          planImage={itemImage}
          planShortName={hit.plan.shortName || hit.plan.name}
        />
        <div>{ hit.title }</div>
        {hit.highlight && (
          <div dangerouslySetInnerHTML={{__html: hit.highlight}} />
        )}
      </a>
    </HitItem>
  )
}

const ResultList = (props) => {
  const { results, searchTerm } = props;
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
  // FIXME: Add 'Search for {searchTerm}' result
  // FIXME: can we limit the number of results earlier?
  return (
        <>
          <span>Searching for '{searchTerm}'</span>
          { counts.map((count) => <span>{count.name}: {count.count} </span>)}
          <HitList>
            {results.slice(0,RESULTS_LIMIT).map(r => (
              <ResultItem hit={r} />
            ))}
          </HitList>
          <div>Total {results.length} results</div>
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

  const connector = new WatchSearchAPIConnector({ plan, apolloClient });
  return (
    <SearchProvider config={{
      apiConnector: connector,
      debug: true,
      hasA11yNotifications: true,
      a11yNotificationMessages: {
        searchResults: ({ start, end, totalResults, searchTerm }) =>
          `Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
      },
    }} >
      <WithSearch
        mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
          searchTerm,
          setSearchTerm,
          results
        })}
      >
        {(context) => {
          const { searchTerm, setSearchTerm, results } = context;
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
            <div ref={searchElement}>
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
                      color={theme.brandNavColor}
                      width="1.25rem"
                      height="1.25rem"
                    />
                  </SearchButton>
                </InputGroup>
              </form>
              </SearchControls>
              {/* TODO: is there a way to control results visibility better? */}
              { searchTerm.length > 1 && searchOpen &&
                <ResultsBox ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                  <Arrow ref={setArrowElement} style={styles.arrow} />
                  <ResultList results={results} searchTerm={searchTerm} anchor={referenceElement}/>
                </ResultsBox>
              }

            </div>
          )
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default NavbarSearch;
