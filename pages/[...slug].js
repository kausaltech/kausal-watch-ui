import React, { useContext } from 'react';

import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { Spring } from 'react-spring/renderprops.cjs';

import { useTranslation } from 'common/i18n';
import Layout, { Meta } from 'components/layout';
import PlanContext from 'context/plan';
import ErrorMessage from 'components/common/ErrorMessage';
import ContentLoader from 'components/common/ContentLoader';
import StreamField from 'components/common/StreamField';


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

const GET_PLAN_PAGE = gql`
query GetPlanPage($plan: ID!, $path: String!) {
  planPage(plan: $plan, path: $path) {
    __typename
    id
    slug
    title
    ... on StaticPage {
      headerImage {
        rendition(size: "1200x800") {
          src
        }
      }
      leadParagraph
      body {
        ...StreamFieldFragment
      }
    }
    lastPublishedAt
  }
}
${StreamField.fragments.streamField}
`;

function StaticPage({ slug }) {
  const { t } = useTranslation();
  const path = '/' + slug.join('/');
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_PLAN_PAGE, {
    variables: {
      plan: plan.identifier,
      path,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planPage } = data;
  if (!planPage) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  console.log(planPage);
  return (
    <Layout>
      <Content page={planPage} />
    </Layout>
  );
}
StaticPage.getInitialProps = async ({ query }) => ({
  slug: query.slug,
  namespacesRequired: ['common'],
});

const Content = ({ page }) => {
  const { title, headerImage } = page;
  const imageUrl = headerImage?.rendition.url;
  const { t } = useTranslation(['common']);

  return (
    <article>
      <Meta
        title={`${title}`}
        shareImageUrl={imageUrl}
        description={`${page.searchDescription || title}`}
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
                {page.leadParagraph && <p className="lead">{page.leadParagraph}</p>}
              </ContentHeader>
            </Col>
          </Row>
        </Container>
      </HeaderBg>
      <div className="content-area">
        {page.body && <StreamField blocks={page.body} />}
      </div>
    </article>
  );
}

export default StaticPage;
