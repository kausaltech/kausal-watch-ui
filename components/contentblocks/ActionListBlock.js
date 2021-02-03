import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { useTranslation } from 'common/i18n';
import Card from 'components/common/Card';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';

const GET_ACTION_LIST = gql`
query GetActionList($plan: ID!, $category: ID) {
  planActions(plan: $plan, category: $category) {
    id
    name
    imageUrl
  }
}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.bg};
  padding: ${(props) => props.theme.spaces.s300};
`;

const SectionHeader = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.themeColors.white};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const CardHeader = styled.h3`
  color: ${(props) => props.theme.themeColors.black};
  line-height: ${(props) => props.theme.lineHeightSm};
`;

const ActionListBlock = ({ categoryFilter }) => {
  const { t } = useTranslation();
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_ACTION_LIST, {
    variables: {
      plan: plan.identifier,
      category: categoryFilter && categoryFilter.id,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  const heading = 'TODO';
  const themeColor = '#29549A';
  return (
    <ActionListSection bg={themeColor}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { planActions.map((action) => (
            <Col lg="3" md="4" sm="6" key={action.id} className="mb-4">
              <Card imageUrl={action.imageUrl}>
                <CardHeader>{ action.name }</CardHeader>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </ActionListSection>
  );
};

export default ActionListBlock;
