import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { useTranslation } from 'common/i18n';
import ActionCard from 'components/actions/ActionCard';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';

const GET_ACTION_LIST = gql`
query GetActionList($plan: ID!) {
  planActions(plan: $plan) {
    ...ActionCard
  }
}
${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.theme.spaces.s200} 0 ${(props) => props.theme.spaces.s400};
`;

const SectionHeader = styled.h2`
  text-align: center;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const filterByCategory = (actions, catId) =>
  // TODO: match parent categories too
  actions.filter((action) => action.categories.find((cat) => cat.id === catId));

const CategoryActionList = (props) => {
  const { categoryId } = props;
  const { t } = useTranslation();
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_ACTION_LIST, {
    variables: {
      plan: plan.identifier,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }

  const filteredActions = filterByCategory(planActions, categoryId);
  const heading = 'Styrmedel och åtaganden';

  return (
    <ActionListSection>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { filteredActions.map((action) => (
            <Col
              tag="li"
              xs="6"
              sm="4"
              lg="3"
              key={action.id}
              className="mb-4 d-flex align-items-stretch"
              style={{ transition: 'all 0.5s ease' }}
              role="listitem"
            >
              <ActionCard action={action} />
            </Col>
          ))}
        </Row>
      </Container>
    </ActionListSection>
  );
};

CategoryActionList.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default CategoryActionList;
