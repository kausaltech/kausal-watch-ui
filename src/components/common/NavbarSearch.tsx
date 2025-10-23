'use client';

import React, { type MouseEventHandler, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useApolloClient } from '@apollo/client';
import { SearchProvider, WithSearch } from '@elastic/react-search-ui';
import { useTranslations } from 'next-intl';
import { usePopper } from 'react-popper';
import { InputGroup } from 'reactstrap';
import styled from 'styled-components';

import { getActionTermContext } from '@/common/i18n';
import { Link, usePrependPlanAndLocale } from '@/common/links';
import WatchSearchAPIConnector, { type SearchHit } from '@/common/search';
import Icon from '@/components/common/Icon';
import PlanChip from '@/components/plans/PlanChip';
import { usePlan } from '@/context/plan';

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

type TextInputProps = {
  $isOpen: boolean;
};

const TextInput = styled.input<TextInputProps>`
  display: ${(props) => (props.$isOpen ? 'block' : 'hidden')};
  width: ${(props) => (props.$isOpen ? 'auto' : '0')};
  height: calc(
    ${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  padding: ${(props) =>
    props.$isOpen ? `${props.theme.inputPaddingY} ${props.theme.inputPaddingY}` : '0'};
  color: ${(props) => props.theme.themeColors.black};
  background-color: ${(props) => props.theme.themeColors.white};
  border-radius: ${(props) => props.theme.inputBorderRadius};
  border: 0;

  &:focus,
  &:focus-visible {
    outline: 3px solid ${(props) => props.theme.inputBtnFocusColor};
  }
`;

type SearchButtonProps = {
  $isActive: boolean;
};

const SearchButton = styled.button<SearchButtonProps>`
  display: flex;
  align-items: center;
  height: calc(
    ${(props) => props.theme.inputLineHeight}em + ${(props) => props.theme.inputPaddingY} +
      ${(props) => props.theme.inputPaddingY}
  );
  padding: 0 0.5rem;
  background-color: ${(props) =>
    props.$isActive ? props.theme.brandNavColor : props.theme.brandNavBackground};
  border: 0;
  border-bottom: 3px solid;
  border-bottom-color: ${(props) =>
    props.$isActive ? props.theme.brandNavColor : props.theme.brandNavBackground};
  border-radius: 0;

  &:hover {
    border-bottom: 3px solid ${(props) => props.theme.brandNavColor};
  }
  .icon {
    fill: ${(props) =>
      props.$isActive ? props.theme.brandNavBackground : props.theme.brandNavColor} !important;
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
  color: ${(props) => props.theme.textColor.tertiary};
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const ResultCount = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
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
  color: ${(props) => props.theme.textColor.tertiary};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => `${props.theme.fontFamilyTiny}, ${props.theme.fontFamilyFallback}`};
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
type ResultItemProps = {
  hit: SearchHit;
};

function ResultItem(props: ResultItemProps) {
  const t = useTranslations();
  const plan = usePlan();
  const { hit } = props;
  const itemImage = hit.plan.image?.rendition?.src;
  // FIXME: Group by hit.object.__typename?

  const typeName = (hit: SearchHit) => {
    const { object, page } = hit;
    if (object) {
      const typename = object.__typename;
      if (typename === 'Action') {
        return t('action', getActionTermContext(plan));
      } else if (typename === 'Indicator') {
        return t('indicator');
      }
    } else if (page) {
      if (page.__typename === 'CategoryPage' && page.category) {
        return page.category.level?.name;
      }
      return t('page');
    }
  };

  return (
    <HitItem key={hit.id}>
      <a href={hit.url!}>
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

type ResultListProps = {
  results: SearchHit[];
  searchTerm: string;
  loading: boolean;
  wasSearched: boolean;
  closeSearch: () => void;
};

const ResultList = (props: ResultListProps) => {
  const { results, searchTerm, loading, wasSearched, closeSearch } = props;
  const t = useTranslations();
  //const plan = usePlan();
  const _counts = [
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
      {!loading && wasSearched ? (
        <HitList>
          {results.slice(0, RESULTS_LIMIT).map((r, i) => (
            <ResultItem key={i} hit={r} />
          ))}
        </HitList>
      ) : null}
      <ResultsFooter>
        {results.length > 0 ? (
          <Link
            href={`/search?q=${searchTerm}`}
            onClick={closeSearch}
            data-testid="search-advanced"
          >
            {t('see-all-results', { count: results.length })}
            <Icon.ArrowRight />
          </Link>
        ) : (
          <Link
            href={`/search?q=${searchTerm}`}
            onClick={closeSearch}
            data-testid="search-advanced"
          >
            {t('search-advanced')} <Icon.ArrowRight />
          </Link>
        )}
      </ResultsFooter>
    </>
  );
};

type SearchProps = {
  isLoading?: boolean;
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string, options?: { debounce?: number }) => void;
  results?: SearchHit[];
  wasSearched?: boolean;
};

function Search({ isLoading, searchTerm, setSearchTerm, results, wasSearched }: SearchProps) {
  const searchInput = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const router = useRouter();
  const searchPath = usePrependPlanAndLocale('/search?q=');

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchElement = useRef<HTMLLIElement>(null);

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // Close results modal if clicked outside search ui
  useEffect(() => {
    const handlePageClick = (e: MouseEvent) => {
      if (!e.target) return;
      if (!searchElement.current?.contains(e.target)) {
        setSearchOpen(false);
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

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (!searchOpen) {
      searchInput.current?.focus();
      setSearchOpen(true);
    } else if (searchInput.current?.value) {
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
              aria-expanded={searchTerm && searchTerm.length > 1 ? 'true' : 'false'}
              aria-haspopup="listbox"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm?.(e.target.value, {
                  debounce: 400,
                });
              }}
              onFocus={(_e) => setSearchOpen(true)}
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
              <Icon.Search width="1.75rem" height="1.75rem" aria-hidden="true" focusable="false" />
            </SearchButton>
          </StyledInputGroup>
        </form>
      </SearchControls>
      {/* TODO: is there a way to control results visibility better? */}
      {/* TODO: display loading state but currently isLoading does not update itself */}
      {searchTerm && searchTerm.length > 1 && searchOpen ? (
        <ResultsBox ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <Arrow ref={setArrowElement} style={styles.arrow} />
          <ResultList
            aria-busy={isLoading ?? false}
            results={results ?? []}
            searchTerm={searchTerm}
            wasSearched={wasSearched ?? false}
            loading={isLoading ?? false}
            closeSearch={closeSearch}
          />
        </ResultsBox>
      ) : null}
    </NavBarSearchListItem>
  );
}

export default function NavbarSearch() {
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
        trackUrlState: false,
        a11yNotificationMessages: {
          searchResults: ({ totalResults, searchTerm }) =>
            `Searching for "${searchTerm}". Showing first ${RESULTS_LIMIT} results out of ${totalResults}.`,
        },
      }}
    >
      <WithSearch
        mapContextToProps={(context) => {
          const { isLoading, searchTerm, setSearchTerm, results, wasSearched } = context;
          return {
            isLoading,
            searchTerm,
            setSearchTerm,
            results,
            wasSearched,
          };
        }}
      >
        {(context) => {
          return (
            <Search
              isLoading={context.isLoading}
              searchTerm={context.searchTerm}
              setSearchTerm={context.setSearchTerm}
              results={context.results as SearchHit[]}
              wasSearched={context.wasSearched}
            />
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
