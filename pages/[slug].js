import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spring } from 'react-spring/renderprops.cjs';

import Layout from '../components/layout';
import { Meta } from '../components/layout';
import PlanContext from '../context/plan';
import ErrorMessage from '../components/common/ErrorMessage';
import Accordion from '../components/common/Accordion';
import ContentLoader from '../components/common/ContentLoader';

const HeaderImage = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  color: #fff;
  height: 300px;
  background-color: ${(props) => props.theme.brandDark};
  background-blend-mode: multiply;
`;

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: #fff;
  position: relative;
`;

const ContentHeader = styled.header`
  padding: 5em 0 3em;
  h1 {
    margin-bottom: .5em;
  }
`;

const ContentMarkup = styled.div`
  padding: 3em 0;
`;

const FaqSection = styled.section`
  padding: 4em 0;
  background: ${(props) => props.theme.themeColors.light};

  h2 {
    text-align: center;
    margin-bottom: 2em;
  }
`;


const GET_CONTENT = gql`
query GetStaticPage($plan: ID!, $slug: ID!) {
  staticPage(plan: $plan, slug: $slug) {
    id
    slug
    name
    title
    tagline
    content
    modifiedAt
    imageUrl
    questions {
      id
      title
      answer
    }
  }
}`;

class StaticPage extends React.PureComponent {
  static contextType = PlanContext;

  static async getInitialProps({ query }) {
    return {
      slug: query.slug,
      namespacesRequired: ['common'],
    };
  }

  render() {
    const plan = this.context;
    const { slug } = this.props;

    return (
      <Query query={GET_CONTENT} variables={{ plan: plan.identifier, slug: slug }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <ErrorMessage message={error.message} />;

          const { staticPage } = data;
          if (!staticPage) {
            return <ErrorMessage statusCode={404} message="Sivua ei löydy" />
          }

          return (
            <Layout>
              <Content page={data.staticPage} />
            </Layout>
          );
          /* ActionContent action={data.action} theme={ theme } /> */
        }}
      </Query>
    );
  }
}

const Content = ({ page }) => {
  const { title, tagline, imageUrl, content, questions } = page;

  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${tagline}`}
        />
      <HeaderBg>
        { imageUrl && (
          <Spring
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
          >
            {(props) => (
              <HeaderImage image={imageUrl} style={props} />
            )}
          </Spring>
        )}
      </HeaderBg>
      <HeaderBg>
        <Container>
          <Row>
            <Col>
              <ContentHeader>
                <h1>{title}</h1>
                <p className="lead">{tagline}</p>
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area">
        <Container>
          <Row>
            <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
              <ContentMarkup dangerouslySetInnerHTML={{ __html: content }} />
            </Col>
          </Row>
        </Container>
        { questions.length > 0 &&
          (
          <FaqSection>
            <Container>
              <Row>
                <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <h2>Usein kysytyt kysymykset</h2>
                  <Accordion>
                    { questions.map(faq => (
                      <Accordion.Item key={faq.id} id={parseInt(faq.id)}>
                        <Accordion.Header>
                          {faq.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="text-content" dangerouslySetInnerHTML={{ __html: faq.answer }}/>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Col>
              </Row>
            </Container>
          </FaqSection>
          )}
      </div>
    </article>
  );
}

export default StaticPage;
