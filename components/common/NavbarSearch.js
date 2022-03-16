import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { InputGroup, Popover, PopoverBody } from 'reactstrap';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { SearchProvider, WithSearch, SearchBox, Results } from '@elastic/react-search-ui';

import { useTheme } from 'common/theme';
import WatchSearchAPIConnector from 'common/search';
import Button from './Button';
import Icon from './Icon';
import PlanTag from 'components/plans/PlanTag';
import { usePlan } from 'context/plan';
import { useApolloClient } from '@apollo/client';
import { useTranslation } from 'common/i18n';

const TextInput = styled.input`
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

function ResultList({ results, searchTerm }) {
  //const plan = usePlan();
  const [referenceElement, setReferenceElement] = useState(null);
  if (!results) return null;
  // FIXME: Add 'Search for {searchTerm}' result
  return (
        <HitList>
          {results.map(r => (
            <ResultItem hit={r} />
          ))}
        </HitList>
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

          return (
            <div>
              <SearchControls ref={setReferenceElement}>
              <SearchBox
                autocompleteResults={{
                  titleField: "title",
                  urlField: "nps_link"
                }}
                onSubmit={searchTerm => {
                  router.push({
                    pathname: '/search',
                    query: { q: searchTerm },
                  });
                }}
                onSelectAutocomplete={(selection, {}, defaultOnSelectAutocomplete) => {
                  if (selection.suggestion) {
                    router.push({
                      pathname: '/search',
                      query: { q: selection.suggestion },
                    });
                  } else {
                    defaultOnSelectAutocomplete(selection);
                  }
                }}
              />
              </SearchControls>
              { results.length > 0 &&
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
