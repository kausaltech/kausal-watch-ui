import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import styled from 'styled-components';
import { readableColor } from 'polished';
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  FormGroup,
  Alert,
} from 'reactstrap';
import { Link } from 'common/links';
import { getActionTermContext } from 'common/i18n';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import PlanChip from 'components/plans/PlanChip';
import { usePlan } from 'context/plan';
import ContentLoader from './ContentLoader';
import { useTranslations } from 'next-intl';
import { trackSearch } from '../MatomoAnalytics';

const SEARCH_QUERY = gql`
  query SearchQuery(
    $plan: ID!
    $query: String!
    $onlyOtherPlans: Boolean
    $clientUrl: String
  ) {
    search(
      plan: $plan
      query: $query
      includeRelatedPlans: true
      onlyOtherPlans: $onlyOtherPlans
    ) {
      hits {
        title
        url(clientUrl: $clientUrl)
        highlight
        plan {
          identifier
          image {
            rendition(size: "128x128", crop: true) {
              src
            }
          }
          name
          shortName
          organization {
            name
          }
        }
        object {
          __typename
          ... on Action {
            identifier
            primaryOrg {
              name
              logo {
                rendition(size: "128x128", crop: true) {
                  src
                }
              }
            }
          }
          ... on Indicator {
            id
          }
        }
        page {
          title
          ... on CategoryPage {
            category {
              level {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const SearchSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
  color: ${(props) =>
    readableColor(
      props.theme.neutralLight,
      props.theme.themeColors.black,
      props.theme.themeColors.white
    )};
`;

const SearchHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};
    color: ${(props) =>
      readableColor(
        props.theme.neutralLight,
        props.theme.headingsColor,
        props.theme.themeColors.white
      )};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

const ResultsHeader = styled.h2`
  margin: ${(props) => props.theme.spaces.s300} 0
    ${(props) => props.theme.spaces.s300} 0;
  font-size: ${(props) => props.theme.fontSizeBase};
`;

const HitType = styled.div`
  margin-bottom: ${(props) => props.theme.spaces.s050};
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};
  text-transform: uppercase;
  letter-spacing: 0.25px;
`;

const SearchResultMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spaces.s150};
`;

const SearchResultList = styled.ul`
  list-style: none;
  margin: 0 0 ${(props) => props.theme.spaces.s600} 0;
  padding: 0;
`;

const StyledSearchResultItem = styled.li`
  margin: 0;
  padding: ${(props) => props.theme.spaces.s100} 0
    ${(props) => props.theme.spaces.s150} 0;
  border-top: 1px solid ${(props) => props.theme.themeColors.dark};

  h3 {
    margin: 0 0 ${(props) => props.theme.spaces.s050};
    font-size: ${(props) => props.theme.fontSizeBase};
    font-family: ${(props) => props.theme.fontFamily};
    text-decoration: underline;

    &:hover {
      color: ${(props) => props.theme.linkHoverColor};
      text-decoration: none !important;
    }
  }

  a:hover {
    color: inherit !important;
    text-decoration: none !important;
  }
`;

const ResultExcerpt = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
  font-family: ${(props) => props.theme.fontFamilyTiny};

  em {
    font-style: normal;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

function SearchResultItem({ hit }) {
  const t = useTranslations();
  const plan = usePlan();
  const { object, page } = hit;
  const primaryOrg = object?.primaryOrg;
  let hitTypeName;

  if (object) {
    const typename = object.__typename;
    if (typename === 'Action') {
      hitTypeName = t('action', getActionTermContext(plan));
    } else if (typename === 'Indicator') {
      hitTypeName = t('indicator');
    }
  } else if (page) {
    if (page.category) {
      hitTypeName = page.category.level?.name;
    }
    if (!hitTypeName) hitTypeName = t('page');
  }
  const showPlanChip = true;
  const hitImage =
    primaryOrg?.logo?.rendition.src ||
    hit.plan.image?.rendition.src ||
    'https://via.placeholder.com/64/AAAAAA/EEEEEE';
  const hitOrganization = primaryOrg?.name || hit.plan.organization.name;

  return (
    <StyledSearchResultItem>
      <SearchResultMeta>
        {showPlanChip && (
          <PlanChip
            planImage={hitImage}
            planShortName={hit.plan.shortName || hit.plan.name}
            organization={hitOrganization}
            size="md"
          />
        )}
        {hitTypeName && <HitType>{hitTypeName}</HitType>}
      </SearchResultMeta>
      <Link href={hit.url} passHref legacyBehavior>
        <a>
          <h3>{hit.title}</h3>
        </a>
      </Link>
      <ResultExcerpt>
        <span dangerouslySetInnerHTML={{ __html: hit.highlight }} />
        ...
      </ResultExcerpt>
      {/* TODO: Add ellipsis or indication for truncated text */}
    </StyledSearchResultItem>
  );
}

const searchProps = PropTypes.shape({
  q: PropTypes.string,
  onlyOtherPlans: PropTypes.bool,
});

function SearchResults({ search }) {
  const plan = usePlan();
  const t = useTranslations();
  const { error, loading, data } = useQuery(SEARCH_QUERY, {
    variables: {
      plan: plan.identifier,
      query: search.q,
      onlyOtherPlans: search.onlyOtherPlans,
      clientUrl: plan.viewUrl,
    },
  });

  useEffect(() => {
    if (search.q && data?.search?.hits) {
      trackSearch(
        search.q,
        search.onlyOtherPlans,
        data.search.hits.length || 0
      );
    }
  }, [search, data]);

  if (error) {
    return (
      <ResultsHeader>
        <Alert color="warning">
          <h2>{t('error-with-code')}</h2>
          {error.toString()}
        </Alert>
      </ResultsHeader>
    );
  }
  if (loading) {
    return (
      <ResultsHeader>
        <ContentLoader />
      </ResultsHeader>
    );
  }
  const { hits } = data.search;

  return (
    <Row>
      <Col sm="12" md={{ offset: 2, size: 8 }}>
        <div role="alert">
          <ResultsHeader>
            {`${t('number-of-search-results', { count: hits.length })} `}
            &apos;
            {search.q}
            &apos;
          </ResultsHeader>
        </div>
        <SearchResultList>
          {hits.map((hit) => (
            <SearchResultItem key={hit.url} hit={hit} />
          ))}
        </SearchResultList>
      </Col>
    </Row>
  );
}
SearchResults.propTypes = {
  search: searchProps.isRequired,
};

function SearchView(props) {
  const { search, onSearchChange } = props;
  const [userSearch, setUserSearch] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    setUserSearch(search);
  }, [search]);

  const handleValueChange = (event) => {
    const { target } = event;
    const { name } = target;
    let value;
    if (target.type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }
    // We use form- as a prefix to avoid name collisions with other components
    setUserSearch({
      ...userSearch,
      [name.replace('form-', '')]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchChange(userSearch);
  };

  return (
    <>
      <SearchSection id="search-results">
        <SearchHeader>
          <Container>
            <Row>
              <Col sm="12" md={{ offset: 3, size: 6 }}>
                <h1>{t('search')}</h1>
                <form>
                  <TextInput
                    type="search"
                    id="form-q"
                    name="q"
                    placeholder={t('search-from-plans')}
                    value={userSearch?.q}
                    onChange={handleValueChange}
                    aria-label={t('search')}
                    data-testid="search-form"
                  />
                  <FormGroup switch>
                    <Input
                      type="switch"
                      id="other-plans-only"
                      name="onlyOtherPlans"
                      checked={userSearch?.onlyOtherPlans}
                      onChange={handleValueChange}
                    />
                    <Label for="other-plans-only">
                      {t('other-plans-only')}
                    </Label>
                  </FormGroup>
                  <Button
                    type="submit"
                    color="primary"
                    className="mb-3"
                    onClick={handleSubmit}
                    block
                  >
                    {t('search')}
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        </SearchHeader>
      </SearchSection>
      <Container>
        {search.q ? (
          <SearchResults search={search} />
        ) : (
          <Col sm="12" md={{ offset: 2, size: 8 }} className="mt-5">
            <Alert color="primary">
              <ResultsHeader>{t('search-no-results')}</ResultsHeader>
            </Alert>
          </Col>
        )}
      </Container>
    </>
  );
}
SearchView.getSearchFromQuery = (query) => {
  const { q, onlyOtherPlans, ...rest } = query;
  return {
    q,
    onlyOtherPlans: onlyOtherPlans === 'true',
    ...rest,
  };
};

SearchView.propTypes = {
  search: searchProps.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchView;
