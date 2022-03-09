import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { InputGroup } from 'reactstrap';
import styled from 'styled-components';
import { SearchProvider, WithSearch, SearchBox, Results } from '@elastic/react-search-ui';

import { useTheme } from 'common/theme';
import WatchSearchAPIConnector from 'common/search';
import Button from './Button';
import Icon from './Icon';
import { usePlan } from 'context/plan';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'common/i18n';

const TextInput = styled.input`
  width: ${(props) => (props.isOpen === 'true' ? 'auto' : '0')};
  height: calc(${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} + ${(props) => props.theme.inputPaddingY});
  padding: ${(props) => (props.isOpen === 'true' ? `${props.theme.inputPaddingY} ${props.theme.inputPaddingY}` : '0')};
  color: ${(props) => props.theme.brandNavColor};
  background-color: ${(props) => props.theme.brandNavBackground};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border-width:${(props) => (props.isOpen === 'true' ? props.theme.inputBorderWidth : '0')};
  border-color: ${(props) => props.theme.themeColors.dark};
  transition: all 0.4s ease-in-out;
  &:focus {
    padding: ${(props) => props.theme.inputPaddingY} ${(props) => props.theme.inputPaddingX};
    border-width: ${(props) => props.theme.inputBorderWidth};
  }

`;

function ResultItem({ hit }) {
  const itemImage = hit.plan.image?.rendition?.src;
  // FIXME: Group by hit.object.__typename?
  return (
    <li key={hit.id}>
      <a href={hit.url}>
        {itemImage && (
          <img src={itemImage} />
        )}
        <div>{ hit.plan.shortName || hit.plan.name }</div>
        <div>{ hit.title }</div>
        {hit.highlight && (
          <div dangerouslySetInnerHTML={{__html: hit.highlight}} />
        )}
      </a>
    </li>
  )
}

function ResultList({ results, searchTerm }) {
  const plan = usePlan();
  if (!results) return null;
  // FIXME: Add 'Search for {searchTerm}' result
  return (
    <ul style={{backgroundColor: "#ffffff"}}>
      {results.map(r => (
        <ResultItem hit={r} />
      ))}
    </ul>
  );
}

function NavbarSearch(props) {
  const theme = useTheme(null);
  const searchInput = useRef();
  const plan = usePlan();
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();

  const handleFocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setSearchOpen(false);
    }
  };

  const connector = new WatchSearchAPIConnector({ plan, apolloClient });
  return (
    <SearchProvider config={{ apiConnector: connector }} >
      <WithSearch
        mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
          searchTerm,
          setSearchTerm,
          results
        })}
      >
        {(context) => {
          const { searchTerm, setSearchTerm, results } = context;
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
              setSearchOpen(false);
            } else setSearchOpen(false);
          };
          return (
            <div>
              <form autoComplete="off">
                <InputGroup onBlur={handleFocus}>
                  <TextInput
                    type="search"
                    id="q"
                    name="q"
                    autocomplete="false"
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
                  <Button
                    color={!searchOpen ? 'link' : 'primary'}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <Icon
                      name="search"
                      color={theme.themeColors.white}
                    />
                  </Button>
                </InputGroup>
              </form>
              <ResultList results={results} searchTerm={searchTerm} />
            </div>
          )
        }}
      </WithSearch>
    </SearchProvider>
  );
}

export default NavbarSearch;
