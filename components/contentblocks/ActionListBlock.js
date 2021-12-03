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

const GET_ACTION_LIST_FOR_BLOCK = gql`
query GetActionListForBlock($plan: ID!, $category: ID) {
  planActions(plan: $plan, category: $category) {
    ...ActionCard
  }
}
${ActionCard.fragments.action}
`;

const ActionListSection = styled.div`
  background-color: ${(props) => props.color};
  padding: ${(props) => props.theme.spaces.s600} 0 ${(props) => props.theme.spaces.s600};
`;

const SectionHeader = styled.h2`
  text-align: center;
  padding: ${(props) => props.theme.spaces.s100};
  border-radius: ${(props) => props.theme.cardBorderRadius};
  background-color: ${(props) => props.theme.themeColors.white};
  color: ${(props) => props.theme.headingsColor};
  margin-bottom: ${(props) => props.theme.spaces.s300};
`;

const ActionListBlock = (props) => {
  const { categoryId, color } = props;
  const { t } = useTranslation();
  const plan = useContext(PlanContext);
  const { loading, error, data } = useQuery(GET_ACTION_LIST_FOR_BLOCK, {
    variables: {
      plan: plan.identifier,
      category: categoryId,
    },
  });
  if (loading) return <ContentLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { planActions } = data;
  if (!planActions) {
    return <ErrorMessage statusCode={404} message={t('page-not-found')} />;
  }
  const actions = planActions.map((act) => ({ ...act, iconUrl: act.categories.find((cat) => cat.iconUrl)?.iconUrl }));
  const heading = t('actions');
  return (
    <ActionListSection color={color}>
      <Container>
        { heading && (<SectionHeader>{ heading }</SectionHeader>)}
        <Row>
          { actions.map((action) => (
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

ActionListBlock.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default ActionListBlock;
