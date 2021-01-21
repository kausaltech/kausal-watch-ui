import React, { useContext } from 'react';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Spring } from 'react-spring/renderprops.cjs';

import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import Accordion from 'components/common/Accordion';
import ContentLoader from 'components/common/ContentLoader';

const HeaderImage = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.themeColors.white};
  height: calc(4 * ${(props) => props.theme.spaces.s400});
  background-color: ${(props) => props.theme.brandDark};
  background-blend-mode: multiply;
`;

const HeaderBg = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  color: ${(props) => props.theme.themeColors.white};
  position: relative;
`;

const ContentHeader = styled.header`
  padding: ${(props) => props.theme.spaces.s400} 0 ${(props) => props.theme.spaces.s200};

  h1 {
    margin-bottom: ${(props) => props.theme.spaces.s150};
    font-size: ${(props) => props.theme.fontSizeXxl};
    color: ${(props) => props.theme.themeColors.white} !important;
  }
`;

const ContentMarkup = styled.div`
  padding: ${(props) => props.theme.spaces.s300} 0;
`;

const FaqSection = styled.section`
  padding: ${(props) => props.theme.spaces.s400} 0;
  background: ${(props) => props.theme.themeColors.light};

  h2 {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizeXl};
    margin-bottom: ${(props) => props.theme.spaces.s300};
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
    imageUrl(size: "1800x1200")
    questions {
      id
      title
      answer
    }
  }
}`;

function StaticPage({ slug }) {
  const { t } = useTranslation();

  // We don't support nested static pages yet
  if (slug.length > 1) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  slug = slug[0];

  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_CONTENT, {
    variables: {
      plan: plan.identifier,
      slug,
    },
  });

  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { staticPage } = data;
  if (!staticPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  return (
    <Layout>
      <Content page={data.staticPage} />
    </Layout>
  );
}
StaticPage.getInitialProps = async ({ query }) => ({
  slug: query.slug,
  namespacesRequired: ['common'],
});

const Content = ({ page }) => {
  const { title, tagline, imageUrl, content, questions } = page;
  const { t } = useTranslation(['common']);

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
                  <h2>{ t('frequently-asked-questions') }</h2>
                  <Accordion>
                    { questions.map(faq => (
                      <Accordion.Item key={faq.id} id={faq.id}>
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
