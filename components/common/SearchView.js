import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'common/i18n';
import {
  Container, Row, Col,
} from 'reactstrap';
import TextInput from 'components/common/TextInput';
import Button from 'components/common/Button';

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

function SearchView(props) {
  const {
    search,
    onSearchChange,
  } = props;
  const { t } = useTranslation('common');

  /* Handle loading and populating search results here */
  /* Dummy results */

  const results = search.q ? [
    {
      id: '0',
      pageType: 'action',
      plan: {
        planImage: '',
        planShortName: '',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: '',
      },
      title: 'Action title',
      excerpt: 'Maybe this is HTML so <strong>keywords</strong> are highlighted?',
    },
    {
      id: '1',
      pageType: 'action',
      plan: {
        planImage: '',
        planShortName: '',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: '',
      },
      title: 'Action title 2',
      excerpt: 'Maybe this is HTML so <strong>keywords</strong> are highlighted?',
    },
    {
      id: '2',
      pageType: 'action',
      plan: {
        planImage: '',
        planShortName: '',
        planUrl: '',
      },
      organization: {
        organizationImage: '',
        organizationShortName: '',
      },
      title: 'Action title 3',
      excerpt: 'Maybe this is HTML so <strong>keywords</strong> are highlighted?',
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

function SearchResults(props) {
  const {
    results,
    search,
    onSearchChange,
  } = props;
  const { t } = useTranslation('common');
  const [userSearch, setUserSearch] = useState(search);

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    setUserSearch({
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSearchChange(userSearch);
  };

  const searchActive = typeof search.q !== 'undefined';

  return (
    <>
      <SearchSection id="search-results">
        <SearchHeader>
          <Container>
            <Row>
              <Col sm="12">
                <h1>Search</h1>
                <TextInput
                  label="Search text"
                  id="q"
                  name="q"
                  placeholder="Type search here"
                  onChange={handleChange}
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
              </Col>
            </Row>
          </Container>
        </SearchHeader>
      </SearchSection>
      <Container>
        { searchActive ? (
          <div>
            <h4>
              Results for &apos;
              { search.q }
              &apos;
            </h4>
            <ul>
              { results.map((result) => (
                <li key={result.id}>
                  <h5>{result.title}</h5>
                  <p dangerouslySetInnerHTML={{ __html: result.excerpt }} />
                </li>
              ))}
            </ul>
          </div>
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
};
