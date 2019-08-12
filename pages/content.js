import { withRouter } from 'next/router';
import Layout from '../components/layout';
import { Container, Row, Col } from 'reactstrap';
import styled, { withTheme } from 'styled-components';
// TODO: get page content from API
import mockData from '../pages/mock-content-data.json'; 

const HeaderBg = styled.div`
  background-color: ${props => props.theme.brandDark};
  color: #fff;
  position: relative;
`;

const ContentHeader = styled.header`
  padding: 3em 0;
  h1 {
    margin-bottom: .5em;
  }
`;

const ContentMarkup = styled.div`
  padding: 3em 0;
`;

class Page extends React.Component {
  render() {
  const { router } = this.props;
  const pageData = mockData.data.find(item => item.attributes.slug == router.query.title);
  var pageContent;
  if (pageData) {
    const pageMarkup = {__html: pageData.attributes.content};
    pageContent = ( <article>
            <HeaderBg>
              <Container>
                <Row>
                  <Col lg={{ size: 8, offset: 2 }}  md={{ size: 10, offset: 1 }}>
                    <ContentHeader>
                      <h1>{pageData.attributes.title}</h1>
                      <p className="lead">{pageData.attributes.tagline}</p>
                    </ContentHeader>
                  </Col>
                </Row>
              </Container>
            </HeaderBg>
            <div className="content-area">
              <Container className="mb-5">
                <Row>
                  <Col lg={{ size: 8, offset: 2 }}  md={{ size: 10, offset: 1 }}>
                  <ContentMarkup dangerouslySetInnerHTML={pageMarkup} />
                  </Col>
                </Row>
              </Container>
            </div>
          </article> )
  }
  else pageContent = (
      <h1>NOT FOUND</h1>
    )
    return(
      <Layout>   
          {pageContent}
      </Layout>
    )
  }
}

export default withRouter(Page)