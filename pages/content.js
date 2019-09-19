import React from 'react';
import { withRouter } from 'next/router';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../components/layout';
import PlanContext from '../context/plan';

import { Accordion } from '../components/Common/Accordion';
import ContentLoader from '../components/Common/ContentLoader';

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
query ActionDetails($plan: ID!) {
  plan(id: $plan) {
    staticPages {
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
  }
}`;

class Page extends React.Component {
  static contextType = PlanContext;

  render() {
    const plan = this.context;

    return (
      <Query query={GET_CONTENT} variables={{ plan: plan.identifier }}>
        {({ loading, error, data }) => {
          if (loading) return <ContentLoader />;
          if (error) return <div>{error.message}</div>;
          console.log(data.plan);
          return (
            <Layout>
              <Content page={data.plan.staticPages[0]} />
            </Layout>
          );
          /* ActionContent action={data.action} theme={ theme } /> */
        }}
      </Query>
    );
  }
}

const Content = (props) => {
  const { page } = props;
  const { title, tagline, imageUrl, content, questions } = page;

  return (
    <article>
      { imageUrl && <HeaderImage image={imageUrl} /> }
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
                <Col lg={{ size:8, offset: 2 }} md={{ size: 10, offset: 1 }}>
                  <h2>Usein kysytyt kysymykset</h2>
                  <Accordion>
                    { questions.map(faq => (
                      <Accordion.Item key={faq.id}>
                        <Accordion.Header>
                          {faq.title}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div dangerouslySetInnerHTML={{ __html: faq.answer }}/>
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
  )
}

export default withRouter(Page)
