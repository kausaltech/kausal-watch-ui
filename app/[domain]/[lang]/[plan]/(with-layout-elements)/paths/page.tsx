'use client';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import styled from 'styled-components';

import GET_PAGE from '@/queries/get-paths-page';
import { getHttpHeaders } from '@/utils/paths.utils';
import { useSuspenseQuery } from '@apollo/client';

const ErrorBackground = styled.div`
  background-color: ${(props) => props.theme.brandDark};
  min-height: 800px;
`;

const StyledCard = styled(Card)`
  margin-top: 5rem;
  text-align: center;
  width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  border-width: ${(props) => props.theme.cardBorderWidth};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};

  h2 {
    margin-bottom: 2rem;
  }

  svg {
    width: 4rem;
    margin-bottom: 2rem;
    fill: ${(props) => props.theme.brandDark};
  }
`;

const PathsData = () => {
  const path = '';
  const { data } = useSuspenseQuery(GET_PAGE, {
    variables: { path, goal: null },
    context: {
      uri: '/api/graphql-paths',
      headers: getHttpHeaders({ instanceIdentifier: 'sunnydale' }),
    },
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log('data', data);
  return (
    <div>
      <h2>Fetched {data.page.title}</h2>
      <h4>{data.page.__typename}</h4>
    </div>
  );
};
export default function AdminPage() {
  return (
    <ErrorBackground className="mb-5">
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
            <StyledCard>
              <CardBody>
                <PathsData />
              </CardBody>
            </StyledCard>
          </Col>
        </Row>
      </Container>
    </ErrorBackground>
  );
}
