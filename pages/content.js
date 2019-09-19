import { withRouter } from 'next/router';
import Layout from '../components/layout';
import { Container, Row, Col } from 'reactstrap';
import styled, { withTheme } from 'styled-components';
// TODO: get page content from API

import { Accordion } from '../components/Common/Accordion';
import mockData from '../pages/mock-content-data.json';

const HeaderImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 300px;
  background-color: ${props => props.theme.brandDark};
  background-blend-mode: multiply;
`;

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
            <HeaderImage image="https://source.unsplash.com/JE2Oo1SZpps/1600x900">
            </HeaderImage>
            <HeaderBg>
              <Container>
                <Row>
                  <Col>
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
                  <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                    <ContentMarkup dangerouslySetInnerHTML={pageMarkup} />
                  </Col>
                </Row>
                <Row>
                  <Accordion>
                    { pageData.attributes.faqs.map(faq => (
                      <Accordion.Item>
                        <Accordion.Header>
                          {faq.question}
                        </Accordion.Header>
                        <Accordion.Body>
                        <Row>
                          <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                            {faq.answer}
                          </Col>
                        </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
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
