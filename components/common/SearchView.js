import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import {
  Container, Row, Col,
} from 'reactstrap';
import { Link } from 'routes';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';
import PlanTag from 'components/plans/PlanTag';

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
function SearchResults(props) {
  const {
    results,
    search,
    onSearchChange,
  } = props;
  const { t } = useTranslation('common');
  const [userSearch, setUserSearch] = useState(search);

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

  const searchActive = typeof search.q !== 'undefined';

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
        { searchActive ? (
          <Row>
            <Col sm="12" md={{ offset: 3, size: 6 }}>
              <ResultsHeader>
                {results.length}
                {' '}
                results for &apos;
                { search.q }
                &apos;
              </ResultsHeader>
              <SearchResultList>
                { results.map((result) => (
                  <SearchResultItem key={result.id}>
                    <PlanTag
                      planImage={result.plan.planImage}
                      planShortName={result.plan.planShortName}
                      organization={result.organization.organizationShortName}
                    />
                    <Link href="sdfsdfsdsd" passHref>
                      <a href>
                        <h5>{result.title}</h5>
                      </a>
                    </Link>
                    <ResultExcerpt dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                  </SearchResultItem>
                ))}
              </SearchResultList>
            </Col>
          </Row>
        ) : (
          <h2>
            -
          </h2>
        )}
      </Container>
    </>
  );
}

SearchResults.getSearchFromQuery = (query) => {
  const {
    q, ...rest
  } = query;
  return {
    q, ...rest,
  };
};

SearchResults.propTypes = {
  search: PropTypes.shape({
    q: PropTypes.string,
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

function SearchView(props) {
  const {
    search,
    onSearchChange,
  } = props;

  const searchQuery = search.q;

  /* Handle loading and populating search results here */
  /* Dummy results */

  const results = searchQuery ? [
    {
      id: '0',
      pageType: 'action',
      plan: {
        planImage: 'https://via.placeholder.com/150x150/FF0000',
        planShortName: 'Ilmasto',
        planLongName: 'Hiilineutraali Tampere 2035',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: 'Tampere',
      },
      title: 'Action title',
      excerpt: `Maybe this is HTML so <strong>${searchQuery}</strong> are highlighted?`,
      resultUrl: '',
    },
    {
      id: '1',
      pageType: 'action',
      plan: {
        planImage: 'https://via.placeholder.com/150x150/FF0000',
        planShortName: 'Ilmasto',
        planLongName: 'Hiilineutraali Tampere 2035',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: 'Tampere',
      },
      title: 'Action title 2',
      excerpt: `Maybe this is HTML so <strong>${searchQuery}</strong> are highlighted?`,
      resultUrl: '',
    },
    {
      id: '2',
      pageType: 'action',
      plan: {
        planImage: 'https://via.placeholder.com/150x150/0000FF',
        planShortName: 'LUMO-ohjelma',
        planLongName: 'Tampereen luonnon monimuotoisuusohjelma',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: 'Tampere',
      },
      title: 'Action title 3',
      excerpt: `Maybe this is HTML so <strong>${searchQuery}</strong> are highlighted?`,
      resultUrl: '',
    },
  ] : undefined;

  return (
    <SearchResults
      search={search}
      onSearchChange={onSearchChange}
      results={results}
    />
  );
}

SearchView.propTypes = {
  search: PropTypes.shape({}).isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
SearchView.getSearchFromQuery = (query) => SearchResults.getSearchFromQuery(query);

export default SearchView;
