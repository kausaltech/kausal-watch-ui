import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { motion, AnimateSharedLayout } from 'framer-motion';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'common/i18n';
import ActionCard from 'components/actions/ActionCard';
import ActionHighlightCard from 'components/actions/ActionHighlightCard';
import ContentLoader from 'components/common/ContentLoader';
import ErrorMessage from 'components/common/ErrorMessage';
import PlanContext from 'context/plan';

const GET_ACTION_LIST = gql`
query GetActionList($plan: ID!) {
  planActions(plan: $plan) {
    ...ActionCard
    image {
      id
      rendition(size:"600x300") {
        width
        height
        src
        alt
      }
    }
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

const ListRow = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: 0 -.5rem;
  padding: 0;

  .lazyload-wrapper {
    width: 100%;
  }

  .card {
    height: 100%;
  }
`;

const ListColumn = styled(motion.li)`
  flex: 0 0 25%;
  padding: .5rem;
`;

const childIds = (categoryID, cats) => {
  const immediateChildren = cats.filter((cat) => {
    if (categoryID === 0) return cat.parent === null;
    return cat.parent?.id === categoryID;
  });
  return immediateChildren.length > 0 ? immediateChildren.map((child) => child.id) : null;
};

const findAllChildren = (categoryID, cats, children = []) => {
  const immediateChildren = childIds(categoryID, cats);
  let allChildren = immediateChildren ? children.concat(immediateChildren) : children;
  if (immediateChildren?.length > 0) immediateChildren.forEach((element) => {
    allChildren = findAllChildren(element, cats, allChildren);
  });
  return allChildren;
};

const filterByCategory = (actions, catId, categories) => {
  // TODO: match parent categories too
  if (catId === 0) return actions;
  const recursiveCategories = findAllChildren(catId, categories);
  recursiveCategories.push(catId);
  return actions.filter((action) => action.categories.find((cat) => recursiveCategories.indexOf(cat.id) > -1));
};

const CategoryActionList = (props) => {
  const { categoryId, categories } = props;
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

  const filteredActions = filterByCategory(planActions, categoryId, categories);
  const heading = 'Styrmedel och åtaganden';

  // const MotionCard = motion(ActionCard);

  return (
    <ActionListSection>
      <Container>
        { heading && (
        <SectionHeader>
          {filteredActions.length}
          {' '}
          { heading }
        </SectionHeader>
        )}
        <ListRow>
          <AnimateSharedLayout>
            { filteredActions.map((action) => (
              <ListColumn
                key={action.id}
                className="mb-4 d-flex align-items-stretch"
                role="listitem"
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <LazyLoad height={300}>
                  <ActionHighlightCard
                    action={action}
                    imageUrl={action?.image?.rendition?.src || undefined}
                    hideIdentifier={plan.hideActionIdentifiers}
                  />
                </LazyLoad>
              </ListColumn>
            ))}
          </AnimateSharedLayout>
        </ListRow>
      </Container>
    </ActionListSection>
  );
};

CategoryActionList.propTypes = {
  categoryId: PropTypes.string.isRequired,
};

export default CategoryActionList;
