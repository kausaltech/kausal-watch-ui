import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import {
  Container, Row, Col,
} from 'reactstrap';
import { Link } from 'routes';
import { useTranslation } from 'common/i18n';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import PlanTag from 'components/plans/PlanTag';
import { usePlan } from 'context/plan';
import ContentLoader from './ContentLoader';

const SEARCH_QUERY = gql`
query SearchQuery($plan: ID!, $query: String!) {
  search(plan: $plan, query: $query, includeRelatedPlans: true) {
    hits {
      title
      url
      plan {
        identifier
        image {
          rendition(size: "128x128") {
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
        ... on Action {
          identifier
        }
        ... on Indicator {
          id
        }
      }
      page {
        title
      }
    }
  }
}
`;

const SearchSection = styled.div`
  padding-bottom: ${(props) => props.theme.spaces.s050};
  background-color: ${(props) => props.theme.neutralLight};
`;

const SearchHeader = styled.div`
  padding-top: ${(props) => props.theme.spaces.s300};
  margin-bottom: ${(props) => props.theme.spaces.s100};
  background-color: ${(props) => props.theme.neutralLight};

  h1 {
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s150};

    @media (min-width: ${(props) => props.theme.breakpointMd}) {
      font-size: ${(props) => props.theme.fontSizeXxl};
    }
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizeLg};
    margin-bottom: ${(props) => props.theme.spaces.s200};
  }
`;

const ResultsHeader = styled.div`
  margin: ${(props) => props.theme.spaces.s300} 0 ${(props) => props.theme.spaces.s300} 0;
`;

const SearchResultList = styled.ul`
  list-style: none;
  margin: 0 0 ${(props) => props.theme.spaces.s600} 0;
  padding: 0;
`;

const SearchResultItem = styled.li`
  margin: 0 0 ${(props) => props.theme.spaces.s200} 0;
  padding: ${(props) => props.theme.spaces.s100};
  border: 1px solid ${(props) => props.theme.themeColors.light};

  h5 {
    margin-top: ${(props) => props.theme.spaces.s100};
  }

  a {
    text-decoration: underline;
  }
`;

const ResultExcerpt = styled.div`

`;

function SearchResults({ search }) {
  const plan = usePlan();
  const { error, loading, data } = useQuery(SEARCH_QUERY, {
    variables: {
      plan: plan.identifier,
      query: search.q,
    },
  });
  if (error) {
    return <div>{error}</div>;
  }
  if (loading) {
    return <ContentLoader />;
  }
  const { hits } = data.search;
  return (
    <Row>
      <Col sm="12" md={{ offset: 3, size: 6 }}>
        <ResultsHeader>
          {hits.length}
          {' '}
          results for &apos;
          { search.q }
          &apos;
        </ResultsHeader>
        <SearchResultList>
          { hits.map((hit) => (
            <SearchResultItem key={hit.url}>
              <PlanTag
                planImage={hit.plan.image.rendition.src}
                planShortName={hit.plan.shortName || hit.plan.name}
                organization={hit.plan.organization.name}
              />
              <Link href={hit.url} passHref>
                <a href>
                  <h5>{hit.title}</h5>
                </a>
              </Link>
              <ResultExcerpt dangerouslySetInnerHTML={{ __html: hit.highlight }} />
            </SearchResultItem>
          ))}
        </SearchResultList>
      </Col>
    </Row>
  );
}

function SearchView(props) {
  const {
    search,
    onSearchChange,
  } = props;
  const [userSearch, setUserSearch] = useState(search);
  const { t } = useTranslation('common');

  const handleValueChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    setUserSearch({
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchChange(userSearch);
  };

  const query = search.q;

  return (
    <>
      <SearchSection id="search-results">
        <SearchHeader>
          <Container>
            <Row>
              <Col sm="12" md={{ offset: 3, size: 6 }}>
                <h1>Search</h1>
                <form>
                  <TextInput
                    label="Search text"
                    id="q"
                    name="q"
                    placeholder="Type search here"
                    onChange={handleValueChange}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    className="mb-3"
                    onClick={handleSubmit}
                    block
                  >
                    { t('search') }
                  </Button>
                </form>
              </Col>
            </Row>
          </Container>
        </SearchHeader>
      </SearchSection>
      <Container>
        { query ? (
          <SearchResults search={search} />
        ) : (
          <div>No query</div>
        )}
      </Container>
    </>
  );
}
SearchView.getSearchFromQuery = (query) => {
  const {
    q, ...rest
  } = query;
  return {
    q, ...rest,
  };
};

SearchView.propTypes = {
  search: PropTypes.shape({
    q: PropTypes.string,
  }).isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchView;
